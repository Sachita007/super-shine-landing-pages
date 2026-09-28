// Read-only browser smoke: no forms are submitted. Start Chrome with --remote-debugging-port=9239.
// Run: node smoke-daylight.mjs [site URL] [Chrome CDP URL]
import assert from 'node:assert/strict';

const site = new URL(process.argv[2] || 'http://127.0.0.1:4173/');
const cdp = process.argv[3] || 'http://127.0.0.1:9239';
const target = await (await fetch(`${cdp}/json/new?about:blank`, { method: 'PUT' })).json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
let sequence = 0;
let pausedScript;
const pending = new Map();
const formRequests = new Set();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
  }
  if (message.method === 'Fetch.requestPaused') pausedScript = message.params.requestId;
  if (message.method === 'Network.requestWillBeSent' && message.params.type === 'Document' &&
      message.params.request.url.startsWith('https://api.leadconnectorhq.com/widget/form/')) {
    formRequests.add(message.params.requestId);
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const until = async (predicate, label) => {
  const deadline = Date.now() + 20000;
  while (!await predicate()) {
    if (Date.now() > deadline) throw new Error(`Timeout: ${label}`);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
};
try {
  await send('Page.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Fetch.enable', { patterns: [{ urlPattern: '*prototype.js*', requestStage: 'Request' }] });
  await send('Page.navigate', { url: new URL('daylight.html', site).href });
  await until(() => pausedScript && formRequests.size === 2, 'both iframe navigations before page JavaScript');
  assert.equal(await evaluate('document.querySelector("#variant-label").textContent'), '');
  await evaluate('window.initialFrames = [...document.querySelectorAll(".ghl-form-frame")]');
  assert.equal(await evaluate('initialFrames.length'), 2);
  console.log('PASS: both real iframes started while page-building JavaScript was blocked.');

  await send('Fetch.continueRequest', { requestId: pausedScript });
  await send('Fetch.disable');
  await until(() => evaluate('document.querySelector("#variant-label").textContent.startsWith("F —")'), 'page initialization');
  await until(() => evaluate('initialFrames.every(f => f.style.visibility === "visible")'), 'GHL frame visibility');
  await evaluate('renderVariant("F", true)');
  assert.equal(await evaluate('initialFrames.every((f, i) => f === document.querySelectorAll(".ghl-form-frame")[i])'), true);
  assert.equal(formRequests.size, 2, 'Initialization or reselecting F reloaded the forms');
  console.log('PASS: initialization and reselecting F preserved both iframe nodes without reloads.');

  for (const width of [1440, 375]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
    assert.equal(await evaluate('[...document.querySelectorAll(".ghl-form-frame")].every(f => f.getBoundingClientRect().height >= 380)'), true);
  }
  console.log('PASS: desktop and mobile forms retain their full height without horizontal overflow.');

  await evaluate('renderVariant("A", true)');
  assert.equal(await evaluate('document.querySelector(".ghl-form-frame") === null && !!document.querySelector(".quote-form")'), true);
  await evaluate('history.back()');
  await until(() => evaluate('document.body.classList.contains("variant-f") && document.querySelectorAll(".ghl-form-frame").length === 2'), 'back navigation to static F');
  console.log('PASS: Variant A remains a preview; browser Back returns to the live F page.');

  // Simulate only the provider's parent-window messages; never submit a lead.
  assert.equal(await evaluate(`(() => {
    const frame = document.querySelector('.ghl-form-frame');
    const data = ['set-sticky-contacts', 'embedded_iframe_' + frame.id, frame.id, '60EP3VXxgFgxW4TtU50H', 'smoke-only'];
    const before = location.href;
    window.dispatchEvent(new MessageEvent('message', { origin: 'https://example.com', source: frame.contentWindow, data }));
    window.dispatchEvent(new MessageEvent('message', { origin: 'https://api.leadconnectorhq.com', source: window, data }));
    return location.href === before;
  })()`), true);
  await evaluate(`(() => {
    const frame = document.querySelector('.ghl-form-frame');
    window.dispatchEvent(new MessageEvent('message', {
      origin: 'https://api.leadconnectorhq.com', source: frame.contentWindow,
      data: ['set-sticky-contacts', 'embedded_iframe_' + frame.id, frame.id, '60EP3VXxgFgxW4TtU50H', 'smoke-only']
    }));
  })()`);
  await until(() => evaluate('location.pathname.endsWith(\"/thank-you.html\") && !!document.querySelector(\"#thank-you-title\")'), 'verified-success thank-you navigation');
  console.log('PASS: untrusted messages ignored; simulated provider success opens the thank-you page.');
} finally {
  await send('Target.closeTarget', { targetId: target.id });
  socket.close();
}

// Read-only local Orca proof. Never fill or submit the real GHL forms.
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const site = new URL(process.argv[2] || 'http://127.0.0.1:8128/');
assert.ok(['127.0.0.1', 'localhost'].includes(site.hostname), 'Local preview only');
const page = process.argv[3];
assert.ok(page, 'Supply an owned Orca page ID');
const exec = promisify(execFile);
const cli = process.env.ORCA_CLI_COMMAND || 'orca-ide';
const evidence = new URL('./evidence/ghl-form/local/', import.meta.url);
const sources = JSON.parse(await readFile(new URL('./sources.json', import.meta.url)));
await mkdir(evidence, { recursive: true });
async function command(...args) {
  const { stdout } = await exec(cli, [...args, '--page', page, '--json'], { timeout: 20000, maxBuffer: 24 * 1024 * 1024 });
  const result = JSON.parse(stdout);
  assert.ok(result.ok, JSON.stringify(result.error));
  return result.result;
}
async function evaluate(expression) {
  const value = (await command('eval', '--expression', expression)).result;
  return typeof value === 'string' && /^(true|false|null|-?\d+(?:\.\d+)?)$/.test(value) ? JSON.parse(value) : value;
}
async function inside(expression) {
  return evaluate(`(() => { const f=globalThis.document.getElementById('orca-proof'); const document=f.contentDocument; const window=f.contentWindow; return (${expression}); })()`);
}
async function until(expression, label) {
  const end = Date.now() + 30000;
  while (!await inside(expression)) {
    assert.ok(Date.now() < end, `Timed out: ${label}`);
    await new Promise(resolve => setTimeout(resolve, 80));
  }
}
const results = [];
try {
  await command('goto', '--url', site.href);
  for (const width of [1440, 390, 320]) {
    await evaluate(`(() => { const f=document.createElement('iframe');f.id='orca-proof';f.title='${width}px local responsive proof';f.style.cssText='display:block;border:0;width:${width}px;height:850px;transform-origin:top left';f.style.transform='scale('+Math.min(1,innerWidth/${width})+')';f.src=${JSON.stringify(site.href)};document.body.replaceChildren(f);document.body.style.margin='0';document.documentElement.style.overflow='hidden';return true; })()`);
    await until(`Boolean(document.querySelector('.ghl-form-frame') && document.querySelector('#review-track') && !document.querySelector('.review-controls').hidden)`, 'page initialized');
    await inside(`(() => { document.querySelectorAll('img').forEach(i=>i.loading='eager');document.documentElement.style.scrollBehavior='auto';document.querySelector('#review-track').style.scrollBehavior='auto';return true;})()`);
    await until(`[...document.images].every(i=>i.complete && i.naturalWidth>0)`, 'images loaded');
    const layout = JSON.parse(await inside(`JSON.stringify({width:window.innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,reviews:[...document.querySelectorAll('.review-card')].map(c=>({name:c.querySelector('strong').textContent,asset:c.querySelector('img').getAttribute('src'),excerpt:c.querySelector('blockquote').textContent.slice(1,-1),links:[...c.querySelectorAll('a')].map(a=>a.href)})),images:[...document.querySelectorAll('.portfolio-grid img,.review-photo')].map(i=>({width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height})),calls:[...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.href)})`));
    assert.ok(Math.abs(layout.width-width)<=1, 'Measured zoom quantization at most one pixel');
    assert.ok(layout.scrollWidth<=layout.clientWidth, `No horizontal overflow at ${width}`);
    const story = JSON.parse(await inside(`(() => { const card=document.querySelector('.studio-statement').getBoundingClientRect();const photo=document.querySelector('.studio-statement > img').getBoundingClientRect();return JSON.stringify({card:{top:card.top,bottom:card.bottom,left:card.left},photo:{top:photo.top,bottom:photo.bottom,left:photo.left,width:photo.width,height:photo.height}}); })()`));
    assert.ok(Math.abs(story.photo.top-story.card.top)<1 && Math.abs(story.photo.left-story.card.left)<1, 'Story photo starts flush with the card');
    if (width>760) assert.ok(Math.abs(story.photo.bottom-story.card.bottom)<1, 'Desktop story photo fills card height without empty bands');
    else assert.ok(Math.abs(story.photo.width/story.photo.height-4/5)<.01, 'Mobile story preserves portrait composition');
    layout.story = story;
    assert.deepEqual(layout.calls, Array(layout.calls.length).fill('tel:+12397105111'));
    for (const image of layout.images) assert.ok(Math.abs(image.width/image.height-4/3)<.01, 'Consistent filled 4:3 photo frames');
    for (const review of layout.reviews) {
      const source = sources.reviews.find(r=>r.name===review.name);
      assert.ok(source?.permalinkVerified);
      assert.equal(source.rating, 5);
      assert.equal(review.asset, source.asset);
      assert.equal(review.excerpt, source.excerpt);
      assert.deepEqual(review.links, [source.url, source.url]);
    }
    assert.equal(await inside(`document.querySelector('.daylight-offer strong').textContent`), '$399');
    assert.equal(await inside(`document.querySelector('.included').textContent`), '(Includes all 4 windows and Rear Windshield)');
    assert.ok(await inside(`[...document.querySelectorAll('a[href^="#"]')].every(a=>document.getElementById(a.getAttribute('href').slice(1)))`), 'Valid local navigation targets');
    await inside(`document.querySelector('a[href="#quote"]').click()`);
    assert.equal(await inside('window.location.hash'), '#quote');
    await inside(`document.querySelector('summary').click()`);
    assert.equal(await inside(`document.querySelector('details').open`), true);
    await inside(`document.querySelector('summary').click()`);
    assert.equal(await inside(`document.querySelector('details').open`), false);
    await inside(`(() => {const t=document.querySelector('#review-track');t.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Home',bubbles:true}));t.dispatchEvent(new window.Event('scroll'));return true;})()`);
    await until(`document.querySelector('#review-track').scrollLeft<3`, 'carousel home');
    await inside(`document.querySelector('[data-review-step="1"]').click()`);
    await until(`document.querySelector('#review-track').scrollLeft>20`, 'carousel next');
    await inside(`(() => {const t=document.querySelector('#review-track');t.dispatchEvent(new window.KeyboardEvent('keydown',{key:'End',bubbles:true}));t.dispatchEvent(new window.Event('scroll'));return true;})()`);
    await until(`document.querySelector('[data-review-step="1"]').disabled`, 'carousel end');
    await inside(`(() => {const t=document.querySelector('#review-track');t.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Home',bubbles:true}));t.dispatchEvent(new window.Event('scroll'));return true;})()`);
    await until(`document.querySelector('[data-review-step="-1"]').disabled`, 'carousel start boundary');
    await until(`[...document.querySelectorAll('.ghl-form-frame')].every(f=>getComputedStyle(f).visibility==='visible' && f.style.height.endsWith('px') && f.getBoundingClientRect().height>100)`, 'both GHL forms visible and provider-sized');
    layout.forms = JSON.parse(await inside(`JSON.stringify([...document.querySelectorAll('.ghl-form-frame')].map(f=>{const c=f.closest('.daylight-card,.quote-panel');const crop=f.parentElement;const b=crop.getBoundingClientRect();const cb=c.getBoundingClientRect();const s=getComputedStyle(f);const cs=getComputedStyle(c);return {id:f.id,width:b.width,height:b.height,cropClass:crop.className,margin:s.margin,cardPadding:[cs.paddingLeft,cs.paddingRight,cs.paddingBottom].map(parseFloat),leftInset:b.left-cb.left,rightInset:cb.right-b.right,bottomInset:cb.bottom-b.bottom};}))`));
    for (const form of layout.forms) {
      assert.equal(form.cropClass, 'ghl-crop', 'Iframe wrapped in crop container');
      assert.equal(form.margin, '-70px -42px -116px', 'Iframe crops provider padding');
      const [left, right, bottom] = form.cardPadding;
      assert.ok(Math.abs(form.leftInset-left)<=1.1 && Math.abs(form.rightInset-right)<=1.1 && Math.abs(form.bottomInset-bottom)<=1.1, 'Crop sits on the card padding apart from the border');
    }
    for (const section of ['top', 'quote', 'story', 'portfolio', 'reviews', 'faq']) {
      await inside(`(() => {const e='${section}'==='story'?document.querySelector('.studio-statement'):document.getElementById('${section}');window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY,behavior:'instant'});return true;})()`);
      const capture = await command('screenshot');
      await writeFile(new URL(`orca-${width}-${section}.png`, evidence), Buffer.from(capture.data, 'base64'));
    }
    results.push({requestedWidth:width,...layout});
  }
  await writeFile(new URL('orca-checks.json', evidence), JSON.stringify({passed:true,browser:'Orca embedded',results,limits:'Same-origin fixed-width iframe proves CSS responsiveness, not native mobile emulation. Smooth scroll disabled only in fixture; DOM keyboard events exercise carousel handlers, not native keyboard input. Cross-origin provider padding requires separate public-form inspection. No fields filled, no submissions and no CRM-delivery claim.'},null,2));
  console.log(JSON.stringify({passed:true,browser:'Orca embedded',observedWidths:results.map(r=>r.width),checks:['responsive overflow','loaded images','exact offer','source-matched review photos and links','carousel arrows and keyboard-handler boundaries','FAQ and anchors','visible provider-sized embeds with no host frame margins or padding']}));
} finally {
  await command('goto', '--url', site.href);
}

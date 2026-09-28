// Run locally: python3 -m http.server 4173 --bind 127.0.0.1. A–E are previews; F submits through GHL.
function VariantA() {
  const {header, benefits, why, portfolio, quote, faq, footer, button} = window.UI;
  return `${header()}
  <main id="main">
    <section class="studio-hero container">
      <div class="studio-copy">
        <div class="hero-location"><span class="status-dot"></span> LIMITED-TIME OFFER · STOCKTON, CA</div>
        <h1>10-year premium<br><em>ceramic coating.</em></h1>
        <div class="studio-offer"><strong>$599</strong><div><s>Normally $1,200</s><span class="offer-save">SAVE $601</span></div></div>
        <p>Exceptional gloss. Everyday protection. Premium ceramic coating with up to a 10-year warranty.</p>
        <div class="hero-buttons">${button('Claim my $599 offer')}<a class="text-link" href="#portfolio">See the finish ↗</a></div>
        <div class="hero-assurance"><span>Free, no-pressure quote</span><span>Up to 10-year warranty</span></div>
      </div>
      <div class="studio-visual">
        <img src="assets/corvette.webp" alt="Glossy gray Corvette reflecting the lights of a detailing studio" width="1142" height="1324" fetchpriority="high">
        <div class="image-topline"><span>THE ART OF PROTECTION</span><span>SUPER SHINE / 01</span></div>
        <div class="warranty-badge"><small>UP TO</small><strong>10</strong><span>YEAR<br>WARRANTY</span></div>
        <div class="image-caption"><span>PREMIUM CERAMIC COATING</span><span>DETAILS MAKE THE DIFFERENCE ↗</span></div>
      </div>
    </section>
    <div class="studio-trust container"><div class="google-rating"><span class="google-letter">G</span><div><span class="stars" aria-label="Google rating">★★★★★</span><b>4.9 on Google</b><small>Trusted by Stockton area drivers</small></div></div><div><strong>100+ happy customers</strong><small>A local reputation built on care</small></div><div><strong>Multi-certified specialists</strong><small>Expert hands. Exceptional finish.</small></div><div><strong>No surprises. Just shine.</strong><small>Honest work. Transparent pricing.</small></div></div>
    ${benefits()}
    <div class="container"><section class="studio-statement"><img src="assets/coating.webp" alt="Close-up showing a ceramic-coated automotive finish" width="800" height="600" loading="lazy"><div><span class="eyebrow">PROTECT WHAT MOVES YOU</span><h2>Built for the road.<br>Ready for the<br>second looks.</h2><p>Sun, dirt, and everyday driving take a toll on paint. Our premium ceramic coating puts a durable layer between your finish and the elements — without hiding what makes it yours.</p>${button('Give your paint an upgrade')}</div></section></div>
    ${why()}${portfolio()}${quote()}${faq()}
  </main>${footer()}`;
}
const variants = {A: {name: 'Midnight Studio', render: VariantA}, B: {name: 'The Atelier', render: window.VariantB}, C: {name: 'Performance', render: window.VariantC}, D: {name: 'Purple Noir', render: window.VariantD}, E: {name: 'Silver Signature', render: window.VariantE}, F: {name: 'Daylight Studio', render: window.VariantF}};
const keys = Object.keys(variants);
let current;
const quoteDialog = document.getElementById('quote-dialog');
let quoteTrigger;
function renderVariant(key, updateUrl = false) {
  if (quoteDialog.open) quoteDialog.close();
  current = keys.includes(key) ? key : 'A';
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('variant', current);
    url.hash = '';
    history.pushState({}, '', url);
  }
  document.body.className = `variant-${current.toLowerCase()}`;
  document.getElementById('app').innerHTML = variants[current].render();
  const inlineQuote = document.getElementById('hero-quote');
  const dialogForm = quoteDialog.querySelector('.dialog-form');
  dialogForm.replaceChildren();
  if (inlineQuote) {
    const bottomQuote = document.createElement('div');
    bottomQuote.className = 'ghl-quote';
    document.querySelector('#quote .quote-form').replaceWith(bottomQuote);
    [inlineQuote, bottomQuote].forEach((container, index) => {
      const id = `inline-aOzToGS2zimSOi3gUPpY-${index}`;
      container.innerHTML = `<iframe
        class="ghl-form-frame" id="${id}"
        src="https://api.leadconnectorhq.com/widget/form/aOzToGS2zimSOi3gUPpY"
        title="Request your free ceramic coating quote" height="390"
        loading="${index ? 'lazy' : 'eager'}"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
        data-layout='{"id":"INLINE"}' data-layout-iframe-id="${id}"
        data-trigger-type="alwaysShow" data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-name="Ceramic Coating (Google)"
        data-form-id="aOzToGS2zimSOi3gUPpY"></iframe>`;
    });
    if (!document.getElementById('ghl-form-embed')) {
      const script = document.createElement('script');
      script.id = 'ghl-form-embed';
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      document.head.append(script);
    }
    document.querySelector('.footer-bottom span:last-child').textContent = 'Free quotes · Super Shine Auto Detailing';
  } else {
    const quoteForm = document.querySelector('#quote .quote-form').cloneNode(true);
    quoteForm.querySelector('input').autofocus = true;
    dialogForm.append(quoteForm);
  }
  document.getElementById('variant-label').textContent = `${current} — ${variants[current].name}`;
  document.title = `${variants[current].name} | Super Shine Auto Detailing`;
  document.querySelectorAll('.variant-dots a').forEach(a => {
    if (new URL(a.href).searchParams.get('variant') === current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  if (updateUrl) window.scrollTo({top: 0, behavior: 'instant'});
}
function cycle(direction) { renderVariant(keys[(keys.indexOf(current) + direction + keys.length) % keys.length], true); }
document.querySelector('.prototype-switcher').addEventListener('click', event => {
  const arrow = event.target.closest('[data-direction]');
  if (arrow) cycle(Number(arrow.dataset.direction));
  const link = event.target.closest('.variant-dots a');
  if (link) { event.preventDefault(); renderVariant(new URL(link.href).searchParams.get('variant'), true); }
});
document.addEventListener('keydown', event => {
  if (quoteDialog.open || event.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])') || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); cycle(event.key === 'ArrowRight' ? 1 : -1); }
});
document.addEventListener('click', event => {
  const toggle = event.target.closest('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle) { menu.hidden = !menu.hidden; toggle.setAttribute('aria-expanded', String(!menu.hidden)); }
  if (event.target.closest('#mobile-menu a')) { menu.hidden = true; document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false'); }
  const trigger = event.target.closest('a[href="#quote"]');
  if (trigger && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    const inlineQuote = document.getElementById('hero-quote');
    if (inlineQuote) {
      inlineQuote.closest('.daylight-card').scrollIntoView({block: 'start'});
      inlineQuote.querySelector('iframe').focus({preventScroll: true});
    } else {
      quoteTrigger = trigger.closest('#mobile-menu') ? document.querySelector('.menu-toggle') : trigger;
      quoteDialog.showModal();
    }
  }
});
quoteDialog.querySelector('.dialog-close').addEventListener('click', () => quoteDialog.close());
quoteDialog.addEventListener('click', event => {
  if (event.target !== quoteDialog) return;
  const bounds = quoteDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) quoteDialog.close();
});
quoteDialog.addEventListener('close', () => {
  if (quoteTrigger?.isConnected) quoteTrigger.focus({preventScroll: true});
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.getElementById('mobile-menu').hidden) {
    document.getElementById('mobile-menu').hidden = true;
    const toggle = document.querySelector('.menu-toggle');
    toggle.setAttribute('aria-expanded','false'); toggle.focus();
  }
});
document.addEventListener('submit', event => {
  if (!event.target.matches('.quote-form')) return;
  event.preventDefault();
  const form = event.target;
  const status = form.querySelector('.form-status');
  const data = new FormData(form);
  status.textContent = `Preview ready for ${data.get('vehicle').trim()}. This request has not been sent. Call (775) 220-7064 or use the live website to claim the $599 offer.`;
  status.hidden = false;
  status.focus();
});
// GHL emits this iframe-specific lead-collected message after its submission succeeds,
// not when submit is clicked or sticky contacts are loaded. No contact data is retained here.
// The iframe sandbox blocks GHL's separate top-level redirect; this site owns navigation.
// Configure spacing in GHL's Custom CSS, not the cross-origin parent page:
// .hl-app .hl_form-builder--main, #_builder-form .fields-container { padding: 0 !important; }
// .ghl-form-wrap { margin: 0 !important; }
// #_builder-form { padding: 0 !important; border: 0 !important; box-shadow: none !important; }
window.addEventListener('message', event => {
  if (event.origin !== 'https://api.leadconnectorhq.com') return;
  const frame = [...document.querySelectorAll('iframe.ghl-form-frame')].find(frame => event.source === frame.contentWindow);
  if (!frame) return;
  if (!Array.isArray(event.data)) return;
  const [action, storageKey, frameId, locationId, fingerprint] = event.data;
  if (action !== 'set-sticky-contacts' || locationId !== '60EP3VXxgFgxW4TtU50H' ||
      frameId !== frame.id || storageKey !== `embedded_iframe_${frameId}` ||
      typeof fingerprint !== 'string' || !fingerprint) return;
  window.location.assign(new URL('thank-you.html', window.location.href).href);
});
window.addEventListener('popstate', () => renderVariant(new URLSearchParams(location.search).get('variant')));
renderVariant(new URLSearchParams(location.search).get('variant'));
// Keep comparison controls out of non-local deployment previews; all variant URLs still work.
if (!['localhost','127.0.0.1','[::1]',''].includes(location.hostname)) document.querySelector('.prototype-switcher').hidden = true;

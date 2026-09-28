// Prototype F: light/dark sections, original-color photography, and an inline hero quote form.
// Hero source: https://assets.cdn.filesafe.space/t4pRauen0e51uGetOHK7/media/6372830a-8782-4fa8-8227-1b38097a81d9.png (lossless WebP conversion).
window.VariantF = () => {
  const {header, benefits, why, portfolio, quote, faq, footer, button} = window.UI;
  return `${header()}
  <main id="main">
    <section class="daylight-hero" aria-labelledby="daylight-title">
      <img class="daylight-backdrop" src="assets/source-hero.webp" alt="" width="1536" height="1024" fetchpriority="high">
      <div class="container daylight-grid">
        <div class="daylight-copy">
          <span class="eyebrow">LIMITED-TIME OFFER · STOCKTON, CA</span>
          <h1 id="daylight-title">10-year premium<br><span>ceramic coating.</span></h1>
          <div class="daylight-offer"><strong>$599</strong><div><s>Normally $1,200</s><span>SAVE $601</span></div></div>
          <p>Exceptional gloss. Everyday protection. Premium ceramic coating with up to a 10-year warranty.</p>
          <div class="hero-buttons">${button('Get my $599 quote')}<a class="text-link" href="#portfolio">See the finish ↗</a></div>
          <div class="hero-assurance"><span>Free, no-pressure quote</span><span>Multi-certified specialists</span></div>
        </div>
        <aside class="daylight-card" aria-labelledby="daylight-form-title">
          <h2 id="daylight-form-title">Your shine starts here.</h2>
          <p>Start with your name, number, and vehicle.</p>
          <div id="hero-quote"></div>
        </aside>
      </div>
    </section>
    <div class="daylight-dark">
    <div class="studio-trust container"><div class="google-rating"><span class="google-letter">G</span><div><span class="stars" aria-label="Google rating">★★★★★</span><b>4.9 on Google</b><small>Trusted by Stockton area drivers</small></div></div><div><strong>100+ happy customers</strong><small>A local reputation built on care</small></div><div><strong>Up to 10-year warranty</strong><small>Ask about coverage and care</small></div><div><strong>No surprises. Just shine.</strong><small>Honest work. Transparent pricing.</small></div></div>
    </div>
    ${benefits()}
    <div class="daylight-dark daylight-story">
    <div class="container"><section class="studio-statement"><img src="assets/coating.webp" alt="Close-up showing a ceramic-coated automotive finish" width="800" height="600" loading="lazy"><div><span class="eyebrow">PROTECT WHAT MOVES YOU</span><h2>Built for the road.<br>Ready for the<br>second looks.</h2><p>Sun, dirt, and everyday driving take a toll on paint. Our premium ceramic coating puts a durable layer between your finish and the elements — without hiding what makes it yours.</p>${button('Give your paint an upgrade')}</div></section></div>
      ${why()}
    </div>
    <div class="daylight-portfolio">${portfolio()}</div>
    <div class="daylight-dark">${quote()}</div>
    ${faq()}
  </main>${footer()}`;
};

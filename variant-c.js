// Throwaway prototype C: an offer-first, motorsport-inspired ceramic coating landing page.
window.VariantC = () => {
  const { header, benefits, why, portfolio, quote, footer, faq, button } = window.UI;
  return `
  ${header()}
  <main id="main">
    <section class="c-hero container" aria-labelledby="c-hero-title">
      <div class="c-kicker"><span>Stockton, California</span><span>Premium ceramic coating</span><span class="c-stripes" aria-hidden="true"></span></div>
      <div class="c-headline">
        <h1 id="c-hero-title">All shine.<br><span>No compromise.</span></h1>
        <div class="c-hero-intro"><span class="c-small-label">Your paint. Protected.</span><p>Make every drive look like the first. Serious protection. Mirror-like gloss. A finish worth looking back at.</p><a href="#benefits" class="c-text-link">Meet your new finish <span aria-hidden="true">↘</span></a></div>
      </div>
      <div class="c-hero-stage">
        <figure class="c-hero-photo"><img src="assets/charger.webp" alt="Turquoise Dodge Charger detailed by Super Shine Auto Detailing" fetchpriority="high"><figcaption><span>Super Shine Auto Detailing</span><span>Built for the spotlight. ↗</span></figcaption></figure>
        <div class="c-offer">
          <div class="c-offer-top"><span>Limited-time offer</span><span aria-hidden="true">↗</span></div>
          <h2>10-year premium<br>ceramic coating</h2>
          <div class="c-price"><span class="c-currency">$</span>599</div>
          <p class="c-normal">Normally <s>$1,200</s> <strong>Save $601</strong></p>
          <div class="c-warranty"><span class="c-warranty-number">10</span><span>Up to 10-year<br><strong>warranty & durability</strong></span></div>
          ${button('Get the $599 offer')}
          <p class="c-offer-note">Ask our team about care and warranty details.</p>
        </div>
      </div>
    </section>
    <div class="c-trust" aria-label="Why drivers choose Super Shine"><div class="container c-trust-inner"><p><strong>4.9<span aria-hidden="true"> ★</span></strong><span>Google rating</span></p><p><strong>100+</strong><span>Satisfied customers</span></p><p><strong>Multi-certified</strong><span>Trained professionals</span></p><a href="tel:+17752207064"><span>Let's talk about your ride</span><strong>(775) 220-7064 ↗</strong></a></div></div>
    ${quote()}
    <div class="c-section-rule container"><span>01 / Beyond the shine</span><span>Protection that performs</span></div>
    ${benefits()}
    <div class="c-why-wrap">${why()}</div>
    <div class="c-section-rule container"><span>02 / The finish line</span><span>Real cars. Real results.</span></div>
    ${portfolio()}
    ${faq()}
    <section class="c-final container" aria-labelledby="c-final-title"><div><p class="eyebrow">Your next great first impression</p><h2 id="c-final-title">Don't just drive it.<br><span>Show it off.</span></h2></div><a class="c-final-link" href="#quote">Let's make it shine <span aria-hidden="true">↗</span></a></section>
  </main>
  ${footer()}
`;
};

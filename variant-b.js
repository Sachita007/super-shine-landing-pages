// Throwaway prototype B — an ivory-and-forest automotive editorial, not a production page.
window.VariantB = () => {
  const { header, benefits, why, portfolio, quote, footer, faq, button } = window.UI;
  return `
  ${header()}
  <main id="main">
    <section class="b-hero container" aria-labelledby="b-hero-title">
      <div class="b-hero-kicker"><span>Exceptional care. Everyday pride.</span><span>Stockton, California</span></div>
      <div class="b-hero-layout">
        <div class="b-hero-copy">
          <p class="eyebrow">A limited-time invitation</p>
          <h1 id="b-hero-title">Premium 10-year<br><em>ceramic coating.</em></h1>
          <div class="b-hero-offer">
            <div class="b-price"><strong>$599</strong><div><span>Normally <s>$1,200</s></span><span class="b-saving">Save $601</span></div></div>
            ${button('Claim the $599 offer', '#quote')}
            <p class="b-hero-warranty">Up to 10-year warranty available. Ask about coverage and care requirements.</p>
          </div>
          <p class="b-hero-description">For the love of your car. Richer gloss, effortless upkeep, and that just-detailed feeling, made to last.</p>
          <div class="b-hero-rating"><strong>4.9<span aria-hidden="true"> ★</span></strong><div>Google rating<span>100+ satisfied customers</span></div></div>
        </div>
        <figure class="b-hero-photo">
          <div class="b-photo-frame"><img src="assets/charger.webp" alt="Glossy turquoise Dodge Charger outside the detailing shop" fetchpriority="high"><div class="b-warranty"><span>Protection for</span><strong>up to 10</strong><span>years of driving</span><small>Warranty available</small></div></div>
          <figcaption><span>A shine that speaks for itself.</span><span>Super Shine / Stockton</span></figcaption>
        </figure>
      </div>
      <div class="b-hero-footnote"><span>Meticulous care. Remarkable results.</span><a href="#benefits">Discover the difference <span aria-hidden="true">↓</span></a></div>
    </section>
    ${benefits()}
    <section class="b-editorial container" aria-labelledby="b-editorial-title">
      <div class="b-editorial-photo"><img src="assets/coating.webp" alt="Close-up illustration of protective ceramic coating" loading="lazy"></div>
      <div class="b-editorial-copy"><p class="eyebrow">Beauty, with a purpose</p><h2 id="b-editorial-title">More than a shine.<br><em>A layer of confidence.</em></h2><p>Sun, road grime, and the everyday elements. Your paint sees it all. Ceramic coating adds a protective barrier while bringing out the depth and character of your finish.</p><a class="b-text-link" href="#quote">Let's talk about your car <span aria-hidden="true">↗</span></a></div>
    </section>
    ${portfolio()}
    ${why()}
    ${quote()}
    ${faq()}
  </main>
  ${footer()}
`;
};

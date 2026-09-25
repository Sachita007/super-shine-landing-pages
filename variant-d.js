// Logo-branded prototype D: offer-first hero in black, lilac, and silver.
window.VariantD = () => `${UI.header()}
<main id="main">
  <section class="noir-hero" aria-labelledby="noir-title">
    <div class="noir-stage">
      <img class="noir-hero-photo" src="assets/corvette.webp" alt="Silver Corvette with a deeply reflective finish in a detailing studio" width="1142" height="1324" fetchpriority="high">
      <div class="noir-hero-copy container">
        <span class="eyebrow">LIMITED-TIME OFFER <span aria-hidden="true">/</span> STOCKTON, CA</span>
        <h1 id="noir-title">10-year premium<br>ceramic coating.</h1>
        <p>Deep gloss. Everyday protection.<br>A finish you'll love, at a price you will too.</p>
        <div class="noir-price"><strong>$599</strong><div><span>Normally <s>$1,200</s></span><small>YOU SAVE $601</small></div></div>
        <div class="noir-warranty"><span aria-hidden="true">✓</span><strong>Up to a 10-year warranty</strong><span class="noir-warranty-divider" aria-hidden="true">/</span><span>Multi-certified specialists</span></div>
        <div class="noir-offer-action">${UI.button('Claim my $599 ceramic coating')}<small>Free quote. No pressure. Confirm eligibility & warranty terms with the shop.</small></div>
      </div>
      <div class="noir-frame-note"><span>THE SUPER SHINE FINISH</span><a href="#portfolio">See our work ↗</a></div>
    </div>
  </section>
  <div class="noir-proof container" aria-label="Super Shine at a glance"><div><strong>4.9 <span aria-hidden="true">★★★★★</span></strong><span>Google rating</span></div><div><strong>100+</strong><span>Satisfied customers</span></div><div><strong>Stockton, CA</strong><span>Your local detailing specialists</span></div></div>
  ${UI.benefits()}
  <section class="noir-detail container" aria-labelledby="noir-detail-title">
    <div class="noir-detail-image"><img src="assets/coating.webp" alt="Ceramic coating application on vehicle paint" width="900" height="900" loading="lazy"><span>THE DETAIL / CERAMIC PROTECTION</span></div>
    <div class="noir-detail-copy"><span class="eyebrow">BEAUTY, WITH A PURPOSE</span><h2 id="noir-detail-title">Not just a shine.<br><em>A protective layer.</em></h2><p>The mirror finish gets the attention. The bonded, hydrophobic coating does the everyday work — helping defend your paint against the elements and making your next wash easier.</p><div class="noir-detail-spec"><span>01 / DEEPER GLOSS</span><span>02 / WATER REPELLENCY</span><span>03 / EASIER MAINTENANCE</span></div><a class="text-link" href="#portfolio">See the finish for yourself ↗</a></div>
  </section>
  ${UI.portfolio()}
  ${UI.why()}
  ${UI.quote()}
  ${UI.faq()}
</main>
${UI.footer()}`;

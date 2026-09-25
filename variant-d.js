// Logo-branded prototype D: black, lilac, and silver with a full-width photographic hero.
window.VariantD = () => `${UI.header()}
<main id="main">
  <section class="noir-hero" aria-labelledby="noir-title">
    <div class="noir-stage">
      <img class="noir-hero-photo" src="assets/corvette.webp" alt="Silver Corvette with a deeply reflective finish in a detailing studio" width="1142" height="1324" fetchpriority="high">
      <div class="noir-hero-copy container">
        <span class="eyebrow">STOCKTON, CALIFORNIA <span aria-hidden="true">/</span> CERAMIC COATING SPECIALISTS</span>
        <h1 id="noir-title">Obsess over<br><em>the finish.</em></h1>
        <p>Deep gloss. Serious protection.<br>Give your paint the Super Shine treatment.</p>
      </div>
      <div class="noir-frame-note" aria-hidden="true"><span>PRECISION IN EVERY REFLECTION</span><span>SUPER SHINE / CA</span></div>
    </div>
    <div class="noir-offer">
      <div class="container noir-offer-grid">
        <div class="noir-offer-title"><span class="eyebrow">THE LIMITED-TIME OFFER</span><strong>Premium 10-year<br> ceramic coating</strong></div>
        <div class="noir-price"><strong>$599</strong><span><s>$1,200</s><small>Save $601</small></span></div>
        <div class="noir-warranty"><span>UP TO</span><strong>10-year</strong><span>WARRANTY</span></div>
        <div class="noir-offer-action">${UI.button('Claim the $599 offer')}<small>Confirm eligibility & warranty terms with the shop.</small></div>
      </div>
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

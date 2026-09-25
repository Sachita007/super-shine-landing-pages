// Logo-branded prototype E: silver/lavender surfaces, purple accents, original photography.
window.VariantE = () => `
  ${window.UI.header()}
  <main id="main">
    <section class="signature-hero container" aria-labelledby="signature-title">
      <div class="signature-edition"><span>STOCKTON, CALIFORNIA</span><span>PAINT PROTECTION, BEAUTIFULLY DONE.</span></div>
      <div class="signature-masthead">
        <div class="signature-intro">
          <span class="eyebrow">SUPER SHINE · PREMIUM CERAMIC COATING</span>
          <h1 id="signature-title">A signature<br>kind of <em>shine.</em></h1>
          <p>For the car you love. A deeper gloss, easier care, and lasting protection — with attention to every detail.</p>
        </div>
        <aside class="signature-ticket" aria-label="Limited-time ceramic coating offer">
          <span class="signature-ticket-label">THE CERAMIC COATING OFFER</span>
          <h2>10-year<br>premium coating.</h2>
          <div class="signature-price"><strong>$599</strong><span>Normally <s>$1,200</s></span></div>
          <span class="signature-saving">SAVE $601 · LIMITED TIME</span>
          ${window.UI.button('Get my free quote')}
          <p>Up to a 10-year warranty.<br>Ask us about eligibility and care.</p>
        </aside>
      </div>
      <figure class="signature-photo">
        <img src="assets/corvette.webp" alt="Silver Corvette with a glossy, reflective finish in a detailing studio" width="1142" height="1324" fetchpriority="high">
        <figcaption><span>THE SUPER SHINE FINISH</span><span>Real cars. Remarkable reflections.</span></figcaption>
      </figure>
      <div class="signature-proof" aria-label="Super Shine at a glance">
        <div><strong>4.9 <span aria-hidden="true">★</span></strong><span>Google rating</span></div>
        <div><strong>100+</strong><span>Satisfied customers</span></div>
        <div><strong>Up to 10 years</strong><span>Warranty · ask for terms</span></div>
        <a href="tel:+17752207064"><span>LET’S TALK ABOUT YOUR CAR</span><strong>(775) 220-7064 ↗</strong></a>
      </div>
    </section>
    ${window.UI.benefits()}
    ${window.UI.portfolio()}
    ${window.UI.why()}
    ${window.UI.quote()}
    ${window.UI.faq()}
  </main>
  ${window.UI.footer()}
`;

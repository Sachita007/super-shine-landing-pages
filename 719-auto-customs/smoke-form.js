// Run after the provider form has loaded, at desktop and mobile widths:
// await (await import('./smoke-form.js')).checkQuoteForm()
// Never fills fields, submits a lead, or synthesizes a provider success event.
export async function checkQuoteForm() {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const heights = [];
  for (const region of ['#hero-quote', '#quote']) {
    const frame = document.querySelector(`${region} .ghl-form-frame`);
    assert(frame, `${region} must contain a real quote form`);
    frame.scrollIntoView({ block: 'center' });
    await new Promise(requestAnimationFrame);
    const bounds = frame.getBoundingClientRect();
    const style = getComputedStyle(frame);
    assert(bounds.width > 0 && bounds.height > 0 && style.visibility === 'visible' && style.display !== 'none', `${region} provider form must be visible`);
    assert(bounds.left >= 0 && bounds.right <= innerWidth + 1, `${region} form must fit the viewport`);
    assert(frame.style.height.endsWith('px') && Math.abs(bounds.height - parseFloat(frame.style.height)) <= 1, `${region} must follow provider sizing without extra blank height`);
    heights.push(bounds.height);
  }
  assert(document.documentElement.scrollWidth <= innerWidth, 'Page must not overflow horizontally');
  const links = [...document.querySelectorAll('a[href="#hero-quote"]')];
  assert(links.length === 1, 'Footer quote action must reach the hero form');
  for (const link of links) {
    link.click();
    const deadline = performance.now() + 5000;
    while (Math.abs(document.querySelector('#hero-quote').getBoundingClientRect().top - 30) > 2) {
      assert(performance.now() < deadline, 'Quote action did not scroll to the form');
      await new Promise(requestAnimationFrame);
    }
    assert(document.activeElement.id === 'hero-quote', 'Quote action must move keyboard focus to the form region');
  }
  return { width: innerWidth, frameHeights: heights, quoteActions: links.length, visible: true, submitted: false };
}

# 719 Auto Customs integration

Publish only this directory through `Sachita007/719-auto-customs`, GitHub Pages `main` at `/`. Never deploy the parent Super Shine repository. The approved offer remains 10-year ceramic coating for $499, with `assets/corvette.webp` as the hero.

Vercel production is independently hosted by `sachita007s-projects/719-auto-customs` (project `prj_tNXjM7FysHQyVN8ruGhXWEZAtxWK`) at `https://719-auto-customs.vercel.app/`. Deploy only the isolated 719 checkout with `vercel deploy --prod --project 719-auto-customs --scope sachita007s-projects --yes`. No automatic Git integration was configured.

The assigned custom subdomain is `719cc.getkoup.com`. In Hostinger's `getkoup.com` DNS zone, add CNAME name `719cc`, target `6bff9d3cc0ce15a5.vercel-dns-017.com`, TTL `300`. This is the project's current recommended value; recheck Vercel if configuring it later. DNS was not changed during deployment, so custom-domain routing and HTTPS remain pending DNS configuration. Leave nameservers and all unrelated records unchanged. Vercel ownership verification is already satisfied; no verification TXT record was requested.

- Two parser-loaded, eager LeadConnector iframes for `oYZgIVmRdXh5I9xnMYt8`: hero DOM ID `inline-oYZgIVmRdXh5I9xnMYt8` and lower quote DOM ID `inline-oYZgIVmRdXh5I9xnMYt8-footer`. Each `data-layout-iframe-id` matches its unique DOM ID. The footer navigation links to `#hero-quote`; no preview forms, local lead capture, or invented success redirect.
- Provider embed script appears once. Supplied form identity and cookie-consent metadata remain literal. CSS reserves 560px until the provider initializes, then removes the minimum so provider resizing determines the height. Cards use 18px padding and no extra gap below the hero intro. These consent attributes alone do not establish privacy-law compliance.
- Supplied GTM `GTM-WHZLPNRQ` and Ads `AW-11364267259` snippets appear once each; GTM noscript is in the body. The existing remote GTM container also initializes this same Ads destination and has existing conversion tags for other thank-you URLs. Its configuration has not been modified. A single direct page config call does not prove account-level deduplication or successful-lead attribution.
- No conversion labels/events or synthetic success messages added. No fields filled, leads submitted, or test conversions fired. CRM receipt, provider success navigation, and successful-lead conversion attribution are untested.

## Read-only checks

Serve with `python3 -m http.server 4175 --bind 127.0.0.1`. After the provider has rendered, run these in the page console at desktop, 390px and 320px widths:

```js
await (await import('./smoke-form.js')).checkQuoteForm()
await (await import('./smoke-review-carousel.js')).checkReviewCarousel()
```

The form check verifies both visible frames follow provider sizing without extra blank height, no horizontal overflow, and keyboard-accessible footer navigation. Cross-origin field rendering and network loads must additionally be inspected in a browser. Never reuse the removed preview-submission smoke test against this live form.

The deployment evidence bundle is `/tmp/719-real-form-deployment-20261002/`; `compact-report.json` records the dual-form update, screenshots and isolation checks.

## Remaining provider-owned spacing

The live form's `#_builder-form` adds `padding: 30px 0`. Parent-page CSS cannot remove this cross-origin padding. The available signed-in GHL agency redirects the verified editor URL back to its dashboard, so no provider configuration was changed. Access to location `u0zdecOvugwYiWUUOmTI`, form `oYZgIVmRdXh5I9xnMYt8`, is required to append this rule to that form's Custom CSS, preserving its existing CSS, fields and submission settings:

```css
#_builder-form { padding-block: 0 !important; }
```

That provider rule is not yet applied. Do not crop either iframe to hide the padding.

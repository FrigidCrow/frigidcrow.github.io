# Clone audit

## Automated and manual checks

| Check | Result | Notes |
|---|---|---|
| Tracking scripts | pass | No GTM, Google Analytics, Meta Pixel, Hotjar, Clarity, Segment or Cloudflare beacon retained |
| Original visible brand | pass | No original company/person names remain in active HTML or payloads; replacement keys remain intentionally in `tools/personalize.mjs` |
| Nuxt hydration | pass | All active Nuxt routes hydrate without mismatch |
| Runtime requests | pass | No failed requests in the final six-route browser audit |
| External runtime dependency | reviewed | Four project-logo SVG URLs remain on Sanity so source SSR/client markup stays identical; mirrored copies are included locally |
| Models/textures/decoders | pass | Core WebGPU assets are local and return HTTP 200 |
| Direct route access | pass | Home, four project paths and privacy page return HTTP 200 |
| GitHub Pages shape | pass | Static root, root-relative URLs, `.nojekyll` and Pages Actions workflow are present |
| Upstream license | unresolved external | No license was exposed by captured upstream files |
| Personal portraits | deferred | Source portrait/normal/depth maps are placeholders until personal assets are supplied |

## Final decision

Technically ready for static deployment. The remaining items are content provenance and portrait replacement, not runtime blockers.

The generic static scanner also reported `ga(` substrings, TODO comments and documentation URLs inside bundled Three.js/GSAP/Draco source. Network capture and six-route browser execution confirm these are library identifiers/comments rather than analytics requests or incomplete application content.

# Build notes

## Provenance

The working baseline was captured from `https://hashgraphvc.com/` on 2026-07-28. Same-origin Nuxt chunks, fonts, GLB models, textures, Draco/Basis decoders and current route payloads were downloaded. Referenced Sanity images and SVG files were also mirrored. WebGPU texture images use the local copies; four project-logo SVG URLs remain on Sanity because the original image component uses that host to produce matching SSR/client markup.

The upstream response and a separate public mirror did not expose a license. Upstream files are kept as a source-replay baseline; personal changes are deliberately small and isolated in `personal.css`, `tools/personalize.mjs`, selected Nuxt strings and the standalone privacy page.

## Runtime

The main scene is mounted in `#gl-canvas`. The downloaded runtime creates a Three.js r182 WebGPU context and falls back to WebGL when WebGPU is unavailable. It uses an animation loop, ACES filmic tone mapping, a multi-scene compositor, fluid distortion and section-specific post-processing.

The page starts behind a sound-choice loader. This is part of the original interaction contract, not a loading failure.

## Locality and privacy

- Core HTML, JavaScript, CSS, fonts, models, textures and editorial assets are local.
- No Google Analytics, Tag Manager, Hotjar, Clarity, Segment or Cloudflare beacon was found or retained.
- Social and project links were changed to the FrigidCrow GitHub profile.
- The original corporate privacy text was replaced with a personal static-site privacy page.

## Known content placeholder

The portrait/normal/depth texture triplets are still source placeholders because no personal portrait set was supplied. Replace them before presenting the capability section as biographical content.

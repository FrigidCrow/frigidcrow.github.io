# Clone report

## Outcome

The repository is a current source replay of `hashgraphvc.com`, personalized as the FrigidCrow portfolio. It is not the earlier React/Three.js interpretation: the active project contains the source Nuxt/Vue build, source Three.js r182 renderer, WebGPU/WebGL fallback, GLB models, texture pipeline, loaders, route transitions and responsive CSS.

## Captured surface

- 80 network requests captured; 64 same-origin resources and all critical runtime assets retained
- 13 GLB/texture scene resources plus Draco and Basis decoders
- Current Nuxt build id: `154ae3f3-b9f1-4754-8a2c-d1e89509dd92`
- Routes: home, four company/detail routes and a personal privacy page
- Renderer: Three.js r182 WebGPU with automatic WebGL2 fallback
- Composition: persistent full-screen canvas, fluid simulation, section post-processing, ACES filmic tone mapping and DOM overlay

## Personalization

- Brand, title, description, loader and footer credit: FrigidCrow
- Hero and section copy: personal creative-technologist positioning
- Project labels: Selected Work, Experiments, 100s and About
- Social/project destinations: FrigidCrow GitHub
- Original corporate legal page: replaced with a truthful static personal-site policy
- Original tracking: none found or retained

## Verification

- Source/baseline loader visual diff: 0.23125% changed pixels, 5/5 visual score
- Responsive recon: 1440×900, 768×1024 and 390×844
- Route audit: 6/6 HTTP 200
- GPU pages: main canvas reports `three.js r182 webgpu`, 1800×1125 at a 1440×900 / DPR 1.25 test viewport
- Browser console: 0 errors, 0 warnings, 0 page errors and 0 failed requests across all routes
- Hydration: clean on all Nuxt routes

## Editable boundary

Copy/links are centralized in `tools/personalize.mjs`; brand CSS is in `personal.css`. `PERSONALIZE.md` documents runtime strings, projects and portrait texture replacement.

## Remaining content work

The portrait/normal/depth maps are source placeholders because personal portrait assets were not supplied. This does not block deployment or rendering, but it is the one visually important content replacement still recommended.

## Provenance note

The captured upstream distribution and the public mirror used for cross-checking did not expose a license. No new license is asserted over upstream files or assets.


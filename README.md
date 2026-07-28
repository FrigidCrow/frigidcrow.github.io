# FrigidCrow immersive portfolio

An editable personal-site mirror of `hashgraphvc.com`, preserving the original Nuxt application, Three.js r182 WebGPU renderer, WebGL fallback, shaders, 3D models, textures, page transitions, responsive layouts and project routes.

## Preview locally

No build step is required. Serve the repository root over HTTP:

```bash
python3 -m http.server 8124
```

Then open `http://localhost:8124/`. The experience intentionally starts with a sound-choice loader; click either option to enter.

## Personalize

Visible copy and links can be changed in [`tools/personalize.mjs`](tools/personalize.mjs), then reapplied with:

```bash
node tools/personalize.mjs
```

Global brand overrides live in [`personal.css`](personal.css). Models and textures live under `gl/`; locally mirrored editorial assets live under `cdn.sanity.io/`. See [`PERSONALIZE.md`](PERSONALIZE.md) before changing portraits, project logos or slugs.

## Deploy

Push the `main` branch to `FrigidCrow/frigidcrow.github.io`. The included GitHub Actions workflow deploys the repository root as a static GitHub Pages site.

## Technical notes

- Rendering: Three.js r182, WebGPU when available, WebGL fallback otherwise
- Framework: Nuxt/Vue static output
- Compression: Draco and Basis decoders are included locally
- Routes: `/`, four `/companies/*` pages and `/privacy-policy/`
- Analytics: no third-party analytics or tracking snippets are included

The mirrored upstream files did not include a license. This repository therefore does not assert a new license over upstream code or assets. See [`NOTES.md`](NOTES.md) and [`CLONE_REPORT.md`](CLONE_REPORT.md) for provenance and QA details.


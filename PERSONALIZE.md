# Personalization guide

## Copy and links

Edit the replacement table in `tools/personalize.mjs`, then run `node tools/personalize.mjs`, `node tools/localize-zh.mjs`, and `node tools/optimize.mjs` in that order. Keep both plain and escaped (`\\u002F`) URL variants when a value also appears in Nuxt payload JSON.

The loader name and runtime domain are in `_nuxt/CEHeSSSx.js`. Footer credit text is in `_nuxt/DwgGGfV0.js`. These are minified build artifacts, so search for the existing FrigidCrow string before editing.

## Header brand

`personal.css` hides the old wordmark portion of the source SVG while preserving the animated abstract mark, and adds the `FRIGIDCROW` text label.

## Projects

Project routes retain their original slugs because changing them also requires changing Nuxt payload indexes and navigation state:

| Route | Current label |
| --- | --- |
| `/companies/debyt/` | 精选作品 |
| `/companies/rava/` | 实验项目 |
| `/companies/100s/` | 100s |
| `/companies/bloxtel/` | 关于我 |

The four project logo SVGs are under `cdn.sanity.io/files/`. Replace files in place to keep payload references stable.

## Portraits

Each capability portrait uses three square 1024×1024 WebP textures: color portrait, normal map and depth map. Replacing only the color image will render, but matching normal/depth maps preserve the original 3D relief effect. Keep filenames unchanged or update every occurrence in `_payload.json` and `index.html` together.

## Visual QA

After changes, test at 1440×900, 768×1024 and 390×844. Enter through the loader and check that the main canvas reports a Three.js WebGPU or WebGL engine, all project routes open directly, and the browser console is clean.

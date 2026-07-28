# Interaction teardown

## Page architecture

The site is a Nuxt/Vue shell over a persistent GPU canvas. Five scroll sections drive one continuous Three.js experience instead of embedding a separate canvas per section. DOM headings, navigation and footer remain accessible above the visual layer.

## Entry sequence

1. Full-screen branded loader initializes assets and the renderer.
2. The visitor chooses sound on or off.
3. The loader exits and reveals the persistent WebGPU/WebGL canvas.
4. Scroll position and pointer input drive camera, composition and transition state.

## Rendering stack

- Three.js r182 WebGPU renderer with WebGL fallback
- High-performance context, antialias disabled, opaque canvas
- ACES filmic tone mapping
- GLB geometry with Draco decoding
- Basis/standard textures and custom material passes
- Fluid simulation, distortion, LUT and multi-scene compositing
- `setAnimationLoop` timing with section-specific post-processing

## Layout and motion

The fixed canvas supplies continuity while oversized type and editorial sections create rhythm. Blue, black and warm-white palettes are coordinated with scene transitions. Mobile keeps the same conceptual sequence but adapts typography and section spacing rather than substituting a simplified page.

## Personalization boundary

The GPU pipeline, scene assets, scroll choreography and Nuxt hydration contract are preserved. Personal changes are limited to brand strings, content payload strings, links, one CSS override and a truthful privacy page. This narrow boundary avoids turning the result into a newly interpreted design.


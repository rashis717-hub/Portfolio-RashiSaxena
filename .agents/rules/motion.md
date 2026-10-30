---
trigger: always_on
---

# Motion rules

- Easing: cubic-bezier(0.22, 1, 0.36, 1) for entrances; ease-out for hovers.
- Durations: hover 150-200ms, reveal 450-600ms, page transition 350ms.
- Stagger children by 60ms, maximum 8 items.
- Scroll reveals play once, trigger at 15% in view, translateY 16px to 0 plus opacity.
- Animate only transform and opacity (plus clip-path where specified). Never animate layout properties.
- Every animation has a `prefers-reduced-motion` fallback: no movement, opacity fade only or instant.
- No autoplay with sound. Video loops are muted, paused when off-screen.
- Touch devices: replace hover effects with press states; never hide essential content behind hover.

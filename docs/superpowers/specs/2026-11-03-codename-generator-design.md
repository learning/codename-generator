# Codename Generator Design

## Goal

Provide a single static web page that converts a slider position from 1 through 120 into a stable project codename, then publishes it through GitHub Pages.

## Codename Cycle

The generator uses two ordered root lists. The adjective advances on every slider step and the noun advances after every ten adjective values, mirroring a 10 by 12 cyclical calendar:

- Adjectives: `Brave`, `Calm`, `Clear`, `Crisp`, `Grand`, `Keen`, `Lucid`, `Quiet`, `Swift`, `Vivid`
- Nouns: `Arc`, `Bay`, `Crest`, `Drift`, `Field`, `Gate`, `Glow`, `Lake`, `Peak`, `Stone`, `Vale`, `Wind`

For one-based position `n`, adjective index is `(n - 1) % 10`; noun index is `floor((n - 1) / 10) % 12`. The interface shows the position and the PascalCase concatenation, such as `BraveArc` at 1 and `VividWind` at 120.

## Surface

The primary screen is a compact, responsive generator tool. Its only input is a native range slider labelled from 1 to 120. The generated codename is the visual focal point. A small text treatment shows the two active roots and the cycle position. There are no additional actions, navigation, forms, or decorative controls.

## Technical Design

Use dependency-free HTML, CSS, and ES modules so GitHub Pages can serve the repository root directly. Keep the cycle logic in `js/codename.mjs`, separate from DOM updates in `js/app.mjs`, allowing native Node tests to verify the mapping independently. Publish with a GitHub Actions workflow that uploads the repository root as a Pages artifact and deploys it on pushes to `main`.

## Constraints

- All 22 supplied roots remain unchanged and every individual root has five or fewer letters.
- Slider input is clamped to the inclusive range 1-120.
- The page is usable with keyboard range-slider controls and works at desktop and mobile widths.
- No runtime dependencies or build step are required.

# nomomono

Chrome extension that detects `<p>` elements rendering in a monospace font and switches them to a more legible sans-serif stack.

## Logo

Source logo: `assets/logo.svg`

Concept:
- `nomo` is set in a sans-serif style.
- `mono` is set in a monospace style.
- Both are stacked as a compact wordmark for extension branding.

## Files

- `manifest.json`: Manifest V3 config for the content script.
- `content.js`: Runtime logic that detects monospace-rendered paragraph text and fixes it.

## Load in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this repository folder.

## Validate behavior

1. Open any page where paragraph text appears monospace unexpectedly.
2. Confirm `<p>` text is rendered with the configured sans-serif stack.
3. Confirm code contexts (`pre`, `code`, `samp`, `kbd`, `textarea`) are not modified.

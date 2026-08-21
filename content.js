// Mono Prose Fixer
// Detects <p> elements actually rendering in a monospace font and
// switches them to a highly legible sans-serif stack.

const SANS_STACK =
  '"Inter", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Cache measurement results per font spec so we only measure each once.
const monoCache = new Map();

// Hidden canvas for width measurement (cheaper than DOM spans).
const ctx = document.createElement("canvas").getContext("2d");

function isMonospaceFont(fontStyle) {
  if (monoCache.has(fontStyle)) return monoCache.get(fontStyle);
  ctx.font = fontStyle;
  // In a monospace font, narrow and wide glyphs have identical advance widths.
  const narrow = ctx.measureText("iiiiiiiiii").width;
  const wide = ctx.measureText("mmmmmmmmmm").width;
  const result = Math.abs(narrow - wide) < 0.5;
  monoCache.set(fontStyle, result);
  return result;
}

function fixParagraph(p) {
  if (p.dataset.monoFixed) return;
  // Skip paragraphs that are genuinely code-ish contexts.
  if (p.closest("pre, code, samp, kbd, textarea")) return;

  const cs = getComputedStyle(p);
  const fontStyle = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;

  if (isMonospaceFont(fontStyle)) {
    p.style.setProperty("font-family", SANS_STACK, "important");
    p.dataset.monoFixed = "true";
  }
}

function scan(root = document) {
  root.querySelectorAll("p").forEach(fixParagraph);
}

scan();

// Handle SPAs and dynamically inserted content.
const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      if (node.tagName === "P") fixParagraph(node);
      else if (node.querySelectorAll) scan(node);
    }
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });

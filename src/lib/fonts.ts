export const FONTS = [
  "Inter",
  "JetBrains Mono",
  "Space Grotesk",
  "Fira Code",
  "Geist",
];

const FONT_PARAMS: Record<string, string> = {
  Inter: "Inter:wght@400;500;600;700",
  "JetBrains Mono": "JetBrains+Mono:wght@400;500;600;700",
  "Space Grotesk": "Space+Grotesk:wght@400;500;600;700",
  "Fira Code": "Fira+Code:wght@400;500;600;700",
  Geist: "Geist:wght@400;500;600;700",
};

const loaded = new Set<string>();

export function loadFont(font: string) {
  if (loaded.has(font) || !FONT_PARAMS[font]) return;

  loaded.add(font);
  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${FONT_PARAMS[font]}&display=swap`;
  document.head.appendChild(link);
}

export function fontFamily(font: string) {
  const mono = font === "JetBrains Mono" || font === "Fira Code";

  return `'${font}', ${mono ? "monospace" : "system-ui, sans-serif"}`;
}

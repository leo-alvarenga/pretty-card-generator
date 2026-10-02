import type { CSSProperties } from "react";

import type { BgPattern } from "@/types";

/**
 * Theme-aware card backgrounds. Inline-style only: the card is rendered with
 * inline styles and rasterised by html-to-image, so no CSS classes allowed.
 */
export function bgPatternStyle(
  pattern: BgPattern,
  accent: string,
  text: string,
): CSSProperties {
  switch (pattern) {
    case "canvas":
      return {
        backgroundImage: `radial-gradient(circle, ${hex2rgba(text, 0.18)} 2px, transparent 1px)`,
        backgroundSize: "36px 36px",
      };

    case "waves":
      return {
        backgroundImage: [
          `repeating-linear-gradient(135deg, ${hex2rgba(accent, 0.07)} 0, ${hex2rgba(accent, 0.07)} 1px, transparent 0, transparent 50%)`,
          `repeating-linear-gradient(45deg, ${hex2rgba(accent, 0.07)} 0, ${hex2rgba(accent, 0.07)} 1px, transparent 0, transparent 50%)`,
        ].join(", "),
        backgroundSize: "28px 28px",
      };

    case "organic":
      return {
        backgroundImage: [
          `radial-gradient(ellipse 60% 40% at 20% 30%, ${hex2rgba(accent, 0.12)} 0%, transparent 70%)`,
          `radial-gradient(ellipse 50% 60% at 80% 70%, ${hex2rgba(text, 0.07)} 0%, transparent 60%)`,
          `radial-gradient(ellipse 70% 50% at 55% 15%, ${hex2rgba(accent, 0.08)} 0%, transparent 65%)`,
        ].join(", "),
      };

    case "cyberpunk": {
      const c = encodeURIComponent(hex2rgba(accent, 0.2));

      const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'>` +
        `<path d='M0 15 H20 V45 H40' stroke='${c}' stroke-width='1' fill='none'/>` +
        `<path d='M60 30 H45 V15 H30' stroke='${c}' stroke-width='1' fill='none'/>` +
        `<circle cx='20' cy='15' r='2.5' fill='${c}'/>` +
        `<circle cx='45' cy='30' r='2.5' fill='${c}'/>` +
        `<circle cx='30' cy='45' r='2' fill='${c}'/>` +
        `</svg>`;

      return {
        backgroundSize: "60px 60px",
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
      };
    }

    case "none":
      return {};
  }
}

// ponytail: colors come from <input type="color">, always #rrggbb; anything else passes through
function hex2rgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(h)) return hex;

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
}

import { toPng } from "html-to-image";

export async function downloadPng(
  el: HTMLElement,
  filename = "pretty-card.png",
) {
  await document.fonts.ready;

  const dataUrl = await toPng(el, { cacheBust: true, pixelRatio: 1 });
  const a = document.createElement("a");

  a.href = dataUrl;
  a.download = filename;

  a.click();
  a.remove();
}

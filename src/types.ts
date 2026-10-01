export type CardSize = { w: number; h: number };

export interface CardConfig {
  font: string;
  author: string;
  size: CardSize;
  tagline: string;
  bgColor: string;
  techStack: string;
  githubUrl: string;
  textColor: string;
  accentColor: string;
  borderWidth: number;
  prettyName: string;
  description: string;
  borderRadius: number;
  coverImage?: string;
  orientation: "landscape" | "portrait" | "custom";
  status: "" | "Active" | "WIP" | "Archived" | "Deprecated";
}

export const CARD_SIZES = {
  portrait: { w: 450, h: 600 },
  landscape: { w: 600, h: 450 },
};

export const DEFAULT_CONFIG: CardConfig = {
  size: CARD_SIZES.landscape,
  prettyName: "Example Project",
  tagline: "A short, punchy subtitle",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis urna sit amet lorem ullamcorper porttitor. Ut tempor semper euismod. Integer ornare risus eget erat.",
  techStack: "React, TypeScript, Vite",
  status: "Active",
  githubUrl: "https://github.com/leo-alvarenga",
  author: "leo-alvarenga",
  orientation: "landscape",
  bgColor: "#0d1117",
  textColor: "#e6edf3",
  accentColor: "#58a6ff",
  font: "Inter",
  borderWidth: 2,
  borderRadius: 8,
};

export type CardSize = { w: number; h: number };

export type BgPattern = "none" | "cyberpunk" | "organic" | "canvas" | "waves";
export interface CardConfig {
  font: string;
  author: string;
  size: CardSize;
  textGap: number;
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
  bgPattern: BgPattern;
}

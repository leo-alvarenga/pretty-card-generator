import type { CardConfig } from "@/types";

export const CARD_SIZES = {
  portrait: { w: 450, h: 600 },
  landscape: { w: 600, h: 450 },
};

export const TEMPLATES: Record<string, CardConfig> = {
  "Project Card": {
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
    bgPattern: "none",
  },
  "Github Profile Readme Banner": {
    status: "",
    author: "",
    githubUrl: "",
    techStack: "",
    description: "",

    font: "Inter",
    borderWidth: 4,
    borderRadius: 16,
    bgPattern: "none",
    bgColor: "#0d1117",
    textColor: "#e6edf3",
    orientation: "custom",
    accentColor: "#58a6ff",
    prettyName: "Hi, I'm John Doe",
    tagline: "Software Engineer @ Acme Inc.",

    size: {
      w: 800,
      h: 200,
    },
  },
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
  bgPattern: "cyberpunk",
};

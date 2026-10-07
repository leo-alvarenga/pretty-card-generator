import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const en = {
  by: "by",
  appTitle: "Pretty Card Generator",
  togglePanel: "Toggle panel",
  export: "Export",
  exporting: "Exporting…",
  fieldTemplate: "Template",
  fieldTitle: "Title",
  fieldTagline: "Tagline",
  fieldDescription: "Description",
  fieldTechStack: "Tech Stack (comma-separated)",
  fieldStatus: "Status",
  fieldGithubUrl: "GitHub URL",
  fieldAuthor: "Author",
  fieldOrientation: "Orientation",
  fieldSize: "Size",
  fieldWidth: "Width",
  fieldHeight: "Height",
  fieldColors: "Colors",
  fieldFont: "Font",
  fieldBorderWidth: "Border width",
  fieldBorderRadius: "Border radius",
  fieldTextGap: "Text gap",
  colorBg: "Background",
  colorText: "Text",
  colorAccent: "Accent / border",
  statusNone: "None",
  orientLandscape: "Landscape",
  orientPortrait: "Portrait",
  orientCustom: "Custom",
  phTitle: "my-awesome-project",
  phTagline: "A short, punchy subtitle",
  phDescription: "What does this project do?",
  phTechStack: "React, TypeScript, Vite",
  phGithub: "github.com/you/project",
  phAuthor: "your-username",
  fieldCoverImage: "Cover Image",
  coverImageUpload: "Click to upload",
  coverImageRemove: "Remove",
  sectionContent: "Content",
  sectionAppearance: "Appearance",
  sectionLayout: "Layout",
  statusActive: "Active",
  statusWip: "WIP",
  statusArchived: "Archived",
  statusDeprecated: "Deprecated",
  fieldBgPattern: "Background pattern",
  bgPatternNone: "None",
  bgPatternCyberpunk: "Cyberpunk",
  bgPatternOrganic: "Organic",
  bgPatternCanvas: "Canvas",
  bgPatternWaves: "Waves",
  welcomeTitle: "Welcome to Pretty Card Generator",
  welcomeDesc:
    "Create beautiful, exportable cards to use in your portfolio, GitHub profile, or presentations; no design skills needed!",
  welcomeHowWorksTitle: "How it works",
  welcomeHowWorksDesc:
    "Open the side panel, fill in your project details, tweak the appearance, and hit Export to download a pixel-perfect PNG.",
  welcomeFeaturesTitle: "Features",
  welcomeFeature1: "Templates and orientations (landscape, portrait, custom)",
  welcomeFeature2: "Custom colors, fonts, and border styles",
  welcomeFeature3: "Background patterns: Cyberpunk, Organic, Canvas, Waves",
  welcomeFeature4: "Tech stack badges and project status tags",
  welcomeFeature5: "Cover image support",
  welcomeFeature6: "Export as high-quality PNG",
  welcomeFeature7: "EN / PT localization",
  welcomeGetStarted: "Get started",
  welcomeMadeBy: "Made by",
};

const pt: typeof en = {
  by: "por",
  appTitle: "Pretty Card Generator",
  togglePanel: "Alternar painel",
  export: "Exportar",
  exporting: "Exportando…",
  fieldTitle: "Título",
  fieldTagline: "Slogan",
  fieldTemplate: "Template",
  fieldDescription: "Descrição",
  fieldTechStack: "Stack Tecnológica (separada por vírgulas)",
  fieldStatus: "Status",
  fieldGithubUrl: "URL do GitHub",
  fieldAuthor: "Autor",
  fieldOrientation: "Orientação",
  fieldSize: "Tamanho",
  fieldWidth: "Largura",
  fieldHeight: "Altura",
  fieldColors: "Cores",
  fieldFont: "Fonte",
  fieldBorderWidth: "Largura da borda",
  fieldBorderRadius: "Raio da borda",
  fieldTextGap: "Espaçamento entre texto",
  colorBg: "Fundo",
  colorText: "Texto",
  colorAccent: "Destaque / borda",
  statusNone: "Nenhum",
  orientLandscape: "Paisagem",
  orientPortrait: "Retrato",
  orientCustom: "Personalizado",
  phTitle: "meu-projeto-incrível",
  phTagline: "Um subtítulo curto e impactante",
  phDescription: "O que este projeto faz?",
  phTechStack: "React, TypeScript, Vite",
  phGithub: "github.com/você/projeto",
  phAuthor: "seu-usuário",
  fieldCoverImage: "Imagem de Capa",
  coverImageUpload: "Clique para enviar",
  coverImageRemove: "Remover",
  sectionContent: "Conteúdo",
  sectionAppearance: "Aparência",
  sectionLayout: "Layout",
  statusActive: "Ativo",
  statusWip: "Em andamento",
  statusArchived: "Arquivado",
  statusDeprecated: "Descontinuado",
  fieldBgPattern: "Padrão de fundo",
  bgPatternNone: "Nenhum",
  bgPatternCyberpunk: "Cyberpunk",
  bgPatternOrganic: "Orgânico",
  bgPatternCanvas: "Tela",
  bgPatternWaves: "Ondas",
  welcomeTitle: "Bem-vindo ao Pretty Card Generator",
  welcomeDesc:
    "Crie cards bonitos e exportáveis para usar no seu portfólio, perfil do GitHub ou apresentações; sem precisar de habilidades de design!",
  welcomeHowWorksTitle: "Como funciona",
  welcomeHowWorksDesc:
    "Abra o painel lateral, preencha os detalhes do seu projeto, ajuste a aparência e clique em Exportar para baixar um PNG perfeito.",
  welcomeFeaturesTitle: "Recursos",
  welcomeFeature1: "Templates e orientações (paisagem, retrato, personalizado)",
  welcomeFeature2: "Cores, fontes e estilos de borda personalizados",
  welcomeFeature3: "Padrões de fundo: Cyberpunk, Orgânico, Tela, Ondas",
  welcomeFeature4: "Badges de stack tecnológica e tags de status do projeto",
  welcomeFeature5: "Suporte a imagem de capa",
  welcomeFeature6: "Download como PNG de alta qualidade",
  welcomeFeature7: "Localização EN / PT",
  welcomeGetStarted: "Vamos lá",
  welcomeMadeBy: "Feito por",
};

const translations = { en, pt } as const;
export type Locale = keyof typeof translations;
export type TKey = keyof typeof en;

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: TKey) => string;
};

function detectLocale(): Locale {
  const supported = Object.keys(translations) as Locale[];
  const langs = Array.from(
    navigator.languages?.length ? navigator.languages : [navigator.language],
  );
  for (const lang of langs) {
    if (supported.includes(lang as Locale)) return lang as Locale;
    const base = lang.split("-")[0] as Locale;
    if (supported.includes(base)) return base;
  }
  return "en";
}

const I18nCtx = createContext<Ctx>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(
    () => (localStorage.getItem("locale") as Locale | null) ?? detectLocale(),
  );

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  };

  const t = (k: TKey): string => translations[locale][k];
  return (
    <I18nCtx.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export const useT = () => useContext(I18nCtx);

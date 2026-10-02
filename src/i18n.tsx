import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const en = {
  appTitle: "Card Generator",
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
};

const pt: typeof en = {
  appTitle: "Gerador de Cartões",
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
};

const translations = { en, pt } as const;
export type Locale = keyof typeof translations;
export type TKey = keyof typeof en;

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: TKey) => string;
};

const I18nCtx = createContext<Ctx>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(
    () => (localStorage.getItem("locale") as Locale | null) ?? "en",
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

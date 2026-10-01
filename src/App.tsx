import { useRef, useState, useEffect } from "react";

import type { CardConfig } from "./types";
import { CardContent, CardPreview } from "./components/CardPreview";
import { FormPanel } from "./components/FormPanel";
import { DEFAULT_CONFIG } from "./types";
import { downloadPng } from "./lib/export";
import { loadFont } from "./lib/fonts";
import { Download, SlidersHorizontal } from "lucide-react";
import { useT, type Locale } from "./i18n";

export default function App() {
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const { t, locale, setLocale } = useT();

  const patch = (p: Partial<CardConfig>) => setConfig((c) => ({ ...c, ...p }));

  useEffect(() => {
    loadFont(config.font);
  }, [config.font]);

  const handleDownload = async () => {
    if (!exportRef.current) return;

    setExporting(true);

    try {
      const name = (config.projectName || "project-card")
        .toLowerCase()
        .replace(/\s+/g, "-");

      await downloadPng(exportRef.current, `${name}.png`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
          <span className="text-blue-400 text-xs font-bold">C</span>
        </div>

        <h1 className="text-sm font-semibold text-gray-200 flex-1">
          {t("appTitle")}
        </h1>

        <button
          onClick={() => setPanelOpen((o) => !o)}
          aria-label={t("togglePanel")}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>

        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-300 cursor-pointer focus:outline-none focus:border-blue-500/60"
        >
          <option value="en">EN</option>
          <option value="pt">PT-BR</option>
        </select>

        <button
          onClick={handleDownload}
          disabled={exporting}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600/80 hover:bg-blue-600 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          {exporting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("exporting")}
            </>
          ) : (
            <>
              <Download />
            </>
          )}
        </button>
      </header>

      {/* Main: two-column on desktop, stacked on mobile */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Form panel — hidden on mobile until toggled */}
        <aside
          className={`lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto ${
            panelOpen ? "block" : "hidden"
          } lg:block`}
        >
          <FormPanel config={config} onChange={patch} />
        </aside>

        {/* Preview panel */}
        <main className="flex-1 flex flex-col items-center gap-6 p-6 lg:p-10 bg-white/2">
          <CardPreview config={config} />

          <p className="text-xs text-gray-600">
            {`${config.size.w} × ${config.size.h} px`}
          </p>
        </main>
      </div>

      {/* Hidden full-size export target */}
      <div
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <div ref={exportRef}>
          <CardContent config={config} forExport />
        </div>
      </div>
    </div>
  );
}

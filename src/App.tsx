import { useRef, useState, useEffect } from "react";
import { Download, Loader, SlidersHorizontal, SquareText } from "lucide-react";

import { DEFAULT_CONFIG, downloadPng, loadFont } from "./lib";
import type { CardConfig } from "./types";
import { useT, type Locale } from "./i18n";
import { Button } from "@/components/ui/button";
import { FormPanel } from "./components/FormPanel";
import { CardContent, CardPreview } from "./components/CardPreview";

export default function App() {
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG);

  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const { t, locale, setLocale } = useT();

  const patch = (p: Partial<CardConfig>) => setConfig((c) => ({ ...c, ...p }));

  // Sync card palette → CSS vars so the app chrome adapts in real time
  useEffect(() => {
    const r = document.documentElement;

    r.style.setProperty("--ui-bg", config.bgColor);
    r.style.setProperty("--ui-text", config.textColor);
    r.style.setProperty("--ui-accent", config.accentColor);
  }, [config.bgColor, config.textColor, config.accentColor]);

  useEffect(() => {
    loadFont(config.font);
  }, [config.font]);

  const handleDownload = async () => {
    if (!exportRef.current) return;

    setExporting(true);

    try {
      const name = (config.prettyName || "pretty-card")
        .toLowerCase()
        .replace(/\s+/g, "-");

      await downloadPng(exportRef.current, name);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <header className="flex items-center justify-between px-4 h-12 shrink-0 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <SquareText className="w-6 h-6 text-primary" strokeWidth={1.75} />

          <span className="text-sm font-semibold tracking-tight">
            {t("appTitle")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPanelOpen((v) => !v)}
            aria-label={t("togglePanel")}
            className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <div className="flex text-xs font-medium rounded-md border border-border overflow-hidden">
            {(["en", "pt"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2.5 py-1 transition-colors ${
                  locale === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            className="gap-1.5"
            disabled={exporting}
            onClick={handleDownload}
          >
            {exporting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                {t("exporting")}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {t("export")}
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-72 xl:w-80 shrink-0 border-r border-border overflow-y-auto bg-card ${
            panelOpen ? "block" : "hidden"
          } lg:block`}
        >
          <FormPanel config={config} onChange={patch} />
        </aside>

        <main className="flex-1 flex items-center justify-center p-8 overflow-auto canvas-bg">
          <div className="w-full max-w-2xl">
            <CardPreview config={config} />
          </div>
        </main>
      </div>

      <div
        style={{
          zIndex: -1,
          top: -9999,
          left: -9999,
          position: "fixed",
          pointerEvents: "none",
        }}
      >
        <div ref={exportRef}>
          <CardContent config={config} forExport />
        </div>
      </div>
    </div>
  );
}

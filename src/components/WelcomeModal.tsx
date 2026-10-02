import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type TKey } from "../i18n";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FEATURE_KEYS: TKey[] = [
  "welcomeFeature1",
  "welcomeFeature2",
  "welcomeFeature3",
  "welcomeFeature4",
  "welcomeFeature5",
  "welcomeFeature6",
  "welcomeFeature7",
];

export function WelcomeModal({ open, onClose }: Props) {
  const { t } = useT();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-semibold mb-1">{t("welcomeTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t("welcomeDesc")}</p>

        <p className="text-sm font-medium mb-1.5">{t("welcomeHowWorksTitle")}</p>
        <p className="text-sm text-muted-foreground mb-4">{t("welcomeHowWorksDesc")}</p>

        <p className="text-sm font-medium mb-1.5">{t("welcomeFeaturesTitle")}</p>
        <ul className="text-sm text-muted-foreground space-y-1 mb-6">
          {FEATURE_KEYS.map((k) => (
            <li key={k} className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              {t(k)}
            </li>
          ))}
        </ul>

        <Button onClick={onClose} className="w-full mb-4">
          {t("welcomeGetStarted")}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {t("welcomeMadeBy")}{" "}
          <a
            href="https://leoalvarenga.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Leo Alvarenga
          </a>
        </p>
      </div>
    </div>
  );
}

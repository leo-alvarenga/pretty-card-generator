import { useEffect, useRef, useState } from "react";

import { type CardConfig, type CardSize } from "../types";
import { ColorPicker } from "./ColorPicker";
import { useT } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { CARD_SIZES, FONTS, TEMPLATES } from "@/lib";

interface Props {
  config: CardConfig;
  onChange: (patch: Partial<CardConfig>) => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>

      {children}
    </div>
  );
}

const selectCls =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer";

export function FormPanel({ config, onChange }: Props) {
  const { t } = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [template, setTemplate] = useState<keyof typeof TEMPLATES>(
    Object.keys(TEMPLATES)[0],
  );

  const [customSize, setCustomSize] = useState<CardSize>(CARD_SIZES.landscape);

  const orientLabels: Record<string, string> = {
    custom: t("orientCustom"),
    portrait: t("orientPortrait"),
    landscape: t("orientLandscape"),
  };

  const set =
    <K extends keyof CardConfig>(k: K) =>
    (v: CardConfig[K]) =>
      onChange({ [k]: v });

  const onOrientationChange = (o: CardConfig["orientation"]) => {
    if (o === "custom") {
      onChange({ orientation: "custom", size: customSize });
    } else {
      onChange({ orientation: o, size: CARD_SIZES[o] });
    }
  };

  const onTemplateChange = (value: string) => {
    if (value === template || !TEMPLATES[value]) return;

    setTemplate(value);
  };

  useEffect(() => {
    onChange({ ...config, ...TEMPLATES[template] });
  }, [template]);

  return (
    <div className="flex flex-col gap-0 h-full">
      <section className="flex flex-col gap-4 p-5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Content
        </p>

        <Field label={t("fieldTemplate")}>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(TEMPLATES).map((o) => (
              <button
                key={o}
                onClick={() => onTemplateChange(o)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  template === o
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:border-ring hover:text-foreground"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </Field>

        <Field label={t("fieldCoverImage")}>
          <div className="flex flex-col gap-2">
            {config.coverImage ? (
              <div
                className="relative rounded overflow-hidden"
                style={{ height: 80 }}
              >
                <img
                  src={config.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => onChange({ coverImage: undefined })}
                  className="absolute top-1 right-1 text-xs bg-black/60 text-white rounded px-1.5 py-0.5"
                >
                  {t("coverImageRemove")}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-16 w-full rounded-lg border-2 border-dashed border-input text-sm text-muted-foreground hover:border-ring transition-colors"
              >
                {t("coverImageUpload")}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) =>
                  onChange({ coverImage: ev.target?.result as string });
                reader.readAsDataURL(file);
                e.target.value = "";
              }}
            />
          </div>
        </Field>

        <Field label={t("fieldTitle")}>
          <Input
            placeholder={t("phTitle")}
            value={config.prettyName}
            onChange={(e) => set("prettyName")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldTagline")}>
          <Input
            value={config.tagline}
            placeholder={t("phTagline")}
            onChange={(e) => set("tagline")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldDescription")}>
          <Textarea
            rows={3}
            value={config.description}
            placeholder={t("phDescription")}
            onChange={(e) => set("description")(e.target.value)}
            className="resize-y text-sm"
          />
        </Field>

        <Field label={t("fieldTechStack")}>
          <Input
            value={config.techStack}
            placeholder={t("phTechStack")}
            onChange={(e) => set("techStack")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldStatus")}>
          <select
            className={selectCls}
            value={config.status}
            onChange={(e) =>
              set("status")(e.target.value as CardConfig["status"])
            }
          >
            <option value="">{t("statusNone")}</option>
            <option>Active</option>
            <option>WIP</option>
            <option>Archived</option>
            <option>Deprecated</option>
          </select>
        </Field>

        <Field label={t("fieldGithubUrl")}>
          <Input
            value={config.githubUrl}
            placeholder={t("phGithub")}
            onChange={(e) => set("githubUrl")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldAuthor")}>
          <Input
            value={config.author}
            placeholder={t("phAuthor")}
            onChange={(e) => set("author")(e.target.value)}
          />
        </Field>
      </section>

      <Separator />

      <section className="flex flex-col gap-4 p-5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Appearance
        </p>

        <Field label={t("fieldColors")}>
          <div className="flex flex-col gap-3 pt-1">
            <ColorPicker
              label={t("colorBg")}
              value={config.bgColor}
              onChange={set("bgColor")}
            />
            <ColorPicker
              label={t("colorText")}
              value={config.textColor}
              onChange={set("textColor")}
            />
            <ColorPicker
              label={t("colorAccent")}
              value={config.accentColor}
              onChange={set("accentColor")}
            />
          </div>
        </Field>

        <Field label={t("fieldFont")}>
          <select
            value={config.font}
            className={selectCls}
            onChange={(e) => set("font")(e.target.value)}
          >
            {FONTS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </Field>
      </section>

      <Separator />

      <section className="flex flex-col gap-4 p-5 pb-8">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Layout
        </p>

        <Field label={t("fieldOrientation")}>
          <div className="flex gap-1.5">
            {(["landscape", "portrait", "custom"] as const).map((o) => (
              <button
                key={o}
                onClick={() => onOrientationChange(o)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  config.orientation === o
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:border-ring hover:text-foreground"
                }`}
              >
                {orientLabels[o]}
              </button>
            ))}
          </div>
        </Field>

        {config.orientation === "custom" && (
          <div className="flex gap-3">
            <Field label={t("fieldWidth")}>
              <Input
                type="number"
                value={config.size.w}
                onChange={(e) =>
                  setCustomSize((curr) => {
                    const next = { ...curr, w: Number(e.target.value) };
                    onChange({ size: next });
                    return next;
                  })
                }
              />
            </Field>
            <Field label={t("fieldHeight")}>
              <Input
                type="number"
                value={config.size.h}
                onChange={(e) =>
                  setCustomSize((curr) => {
                    const next = { ...curr, h: Number(e.target.value) };
                    onChange({ size: next });
                    return next;
                  })
                }
              />
            </Field>
          </div>
        )}

        <Field label={`${t("fieldBorderWidth")}: ${config.borderWidth}px`}>
          <input
            min={0}
            max={8}
            type="range"
            value={config.borderWidth}
            onChange={(e) => set("borderWidth")(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </Field>

        <Field label={`${t("fieldBorderRadius")}: ${config.borderRadius}px`}>
          <input
            type="range"
            min={0}
            max={24}
            value={config.borderRadius}
            onChange={(e) => set("borderRadius")(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </Field>
      </section>
    </div>
  );
}

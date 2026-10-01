import { useEffect, useState } from "react";

import { CARD_SIZES, type CardConfig, type CardSize } from "../types";
import { ColorPicker } from "./ColorPicker";
import { FONTS } from "../lib/fonts";
import { useT } from "../i18n";

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
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </label>

      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30";

export function FormPanel({ config, onChange }: Props) {
  const [customSize, setCustomSize] = useState<CardSize>(CARD_SIZES.landscape);
  const { t } = useT();

  const set =
    <K extends keyof CardConfig>(k: K) =>
    (v: CardConfig[K]) =>
      onChange({ [k]: v });

  const onOrientationChange = (o: CardConfig["orientation"]) => {
    set("orientation")(o);

    if (o === "custom") {
      set("size")(customSize);
      return;
    }

    set("size")(CARD_SIZES[o] ?? customSize);
  };

  useEffect(() => {
    set("size")(customSize);
  }, [customSize]);

  const orientLabels: Record<string, string> = {
    landscape: t("orientLandscape"),
    portrait: t("orientPortrait"),
    custom: t("orientCustom"),
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
      <section className="flex flex-col gap-4">
        <Field label={t("fieldTitle")}>
          <input
            className={inputCls}
            placeholder={t("phTitle")}
            value={config.projectName}
            onChange={(e) => set("projectName")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldTagline")}>
          <input
            className={inputCls}
            value={config.tagline}
            placeholder={t("phTagline")}
            onChange={(e) => set("tagline")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldDescription")}>
          <textarea
            rows={2}
            value={config.description}
            className={inputCls + " resize-y"}
            placeholder={t("phDescription")}
            onChange={(e) => set("description")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldTechStack")}>
          <input
            className={inputCls}
            value={config.techStack}
            placeholder={t("phTechStack")}
            onChange={(e) => set("techStack")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldStatus")}>
          <select
            className={inputCls + " cursor-pointer"}
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
          <input
            className={inputCls}
            value={config.githubUrl}
            placeholder={t("phGithub")}
            onChange={(e) => set("githubUrl")(e.target.value)}
          />
        </Field>

        <Field label={t("fieldAuthor")}>
          <input
            className={inputCls}
            value={config.author}
            placeholder={t("phAuthor")}
            onChange={(e) => set("author")(e.target.value)}
          />
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <Field label={t("fieldOrientation")}>
          <div className="flex gap-2">
            {(["landscape", "portrait", "custom"] as const).map((o) => (
              <button
                key={o}
                onClick={() => onOrientationChange(o)}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                  config.orientation === o
                    ? "bg-blue-600/30 border-blue-500 text-blue-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                {orientLabels[o]}
              </button>
            ))}
          </div>
        </Field>

        <Field label={t("fieldSize")}>
          <Field label={t("fieldWidth")}>
            <input
              className={inputCls}
              value={config.size.w}
              disabled={config.orientation !== "custom"}

              onChange={(e) =>
                setCustomSize((curr) => ({
                  ...curr,
                  w: Number(e.target.value),
                }))
              }
            />
          </Field>

          <Field label={t("fieldHeight")}>
            <input
              className={inputCls}
              value={config.size.h}
              disabled={config.orientation !== "custom"}

              onChange={(e) =>
                setCustomSize((curr) => ({
                  ...curr,
                  h: Number(e.target.value),
                }))
              }
            />
          </Field>
        </Field>

        <Field label={t("fieldColors")}>
          <div className="flex flex-col gap-3">
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
            className={inputCls + " cursor-pointer"}
            value={config.font}
            onChange={(e) => set("font")(e.target.value)}
          >
            {FONTS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </Field>

        <Field label={`${t("fieldBorderWidth")}: ${config.borderWidth}px`}>
          <input
            type="range"
            min={0}
            max={8}
            value={config.borderWidth}
            onChange={(e) => set("borderWidth")(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </Field>

        <Field label={`${t("fieldBorderRadius")}: ${config.borderRadius}px`}>
          <input
            type="range"
            min={0}
            max={24}
            value={config.borderRadius}
            onChange={(e) => set("borderRadius")(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </Field>
      </section>
    </div>
  );
}

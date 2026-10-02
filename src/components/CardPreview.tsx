import { useRef, useState, useEffect } from "react";
import { type CardConfig } from "../types";
import { fontFamily } from "../lib/fonts";
import { bgPatternStyle } from "../lib/patterns";

const STATUS_COLORS: Record<string, string> = {
  WIP: "#d29922",
  Active: "#3fb950",
  Archived: "#8b949e",
  Deprecated: "#f85149",
};

interface Props {
  config: CardConfig;
  forExport?: boolean;
}

export function CardContent({ config, forExport = false }: Props) {
  const { w, h } = config.size;

  const tags = config.techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const statusColor = STATUS_COLORS[config.status] ?? "#8b949e";

  return (
    <div
      style={{
        gap: 12,
        width: w,
        height: h,
        padding: 24,
        display: "flex",
        overflow: "hidden",
        boxSizing: "border-box",
        flexDirection: "column",
        color: config.textColor,
        backgroundColor: config.bgColor,
        ...bgPatternStyle(
          config.bgPattern,
          config.accentColor,
          config.textColor,
        ),
        borderRadius: config.borderRadius,
        fontFamily: fontFamily(config.font),
        border: `${config.borderWidth}px solid ${config.accentColor}`,
        ...(forExport ? {} : {}),
      }}
    >
      {config.coverImage && (
        <div
          style={{
            marginTop: -24,
            marginLeft: -24,
            marginRight: -24,
            overflow: "hidden",
            height: Math.round(h * 0.2),
            minHeight: Math.round(h * 0.2),
          }}
        >
          <img
            src={config.coverImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {config.status && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 100,
              color: statusColor,
              padding: "4px 12px 2px 12px",
              textTransform: "uppercase",
              backgroundColor: statusColor + "22",
            }}
          >
            {config.status}
          </span>
        )}
      </div>

      <div
        style={{
          gap: 8,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {config.prettyName && (
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {config.prettyName}
          </h1>
        )}

        {config.tagline && (
          <p
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.4,
              marginBottom: 2,
              color: config.accentColor,
            }}
          >
            {config.tagline}
          </p>
        )}

        {config.description && (
          <p
            style={{
              margin: 0,
              fontSize: 17,
              opacity: 0.65,
              lineHeight: 1.65,
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {config.description}
          </p>
        )}

        {tags.length > 0 && (
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: 6,
                  padding: "5px 13px",
                  color: config.accentColor,
                  backgroundColor: config.accentColor + "1a",
                  border: `1px solid ${config.accentColor}40`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: 14,
          marginTop: 20,
          opacity: 0.55,
          paddingTop: 20,
          display: "flex",
          alignItems: "center",
          letterSpacing: "0.01em",
          justifyContent: "start",
          borderTop:
            config.githubUrl || config.author
              ? `1px solid ${config.textColor}20`
              : undefined,
        }}
      >
        {config.githubUrl && (
          <span className="mr-auto">{config.githubUrl}</span>
        )}

        {config.author && <span>{config.author}</span>}
      </div>
    </div>
  );
}

// Scaled preview wrapper
export function CardPreview({ config }: { config: CardConfig }) {
  const { w: width, h: height } = config.size;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / width));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        height: height * scale,
      }}
    >
      <div
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <CardContent config={config} />
      </div>
    </div>
  );
}

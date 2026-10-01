interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export function ColorPicker({ label, value, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <span className="relative inline-block w-6 h-6 shrink-0">
        <span
          className="block w-6 h-6 rounded-md border border-border group-hover:ring-2 group-hover:ring-ring/40 transition-shadow"
          style={{ backgroundColor: value }}
        />

        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </span>

      <span className="text-sm text-foreground flex-1">{label}</span>

      <span className="text-xs text-muted-foreground font-mono tabular-nums">
        {value}
      </span>
    </label>
  );
}

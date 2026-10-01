interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export function ColorPicker({ label, value, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent p-0.5"
      />

      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
}

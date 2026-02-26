import useDevice from "../../../hooks/useDevice";

export default function MyCheckBox({ checked, onChange, label, disabled }: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  const { isMobile } = useDevice();
  return (
    <div className={`flex gap-2 ${isMobile ? "flex-col" : "flex-row items-center"}`}>
      <span className="min-w-32">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${checked ? "bg-green-500" : "bg-gray-300"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
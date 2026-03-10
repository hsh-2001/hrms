import React from "react";
import useDevice from "../../../hooks/useDevice";
import { useTranslation } from "react-i18next";

interface MySelectionProps {
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  label?: string;
  disabled?: boolean;
}
export default function MySelection({
  id,
  value,
  onChange,
  options,
  label,
  disabled = false,
}: MySelectionProps) {
  const { isMobile } = useDevice();
  const { t } = useTranslation();
  const isPlaceholderSelected = value === 0 || value === "0" || value === "";

  return (
    <div>
      <label
        htmlFor={id}
        className={`flex gap-2 ${isMobile ? "flex-col" : "flex-row items-center"}`}
      >
        <span className="min-w-32 capitalize">{label || id}</span>
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`outline-none border border-gray-300 rounded-[20px] w-full p-2 ${isPlaceholderSelected ? "text-gray-400" : "text-gray-900"} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        >
          <option disabled value={0} hidden>
            {t("Select option")}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

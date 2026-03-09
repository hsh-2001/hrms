import React from "react";
import useDevice from "../../../hooks/useDevice";
import { Eye, EyeClosed } from "lucide-react";

interface MyInputProps {
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  labelWidth?: string;
}

export default function MyInput({
  id,
  value,
  onChange,
  type = "text",
  required = false,
  label,
  labelWidth = "min-w-32",
  disabled = false,
}: MyInputProps) {
  const { isMobile } = useDevice();
  const isPasswordType = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRequiredMessage, setShowRequiredMessage] = React.useState(false);

  React.useEffect(() => {
    if (!isPasswordType) {
      setShowPassword(false);
    }
  }, [isPasswordType]);

  const inputType = isPasswordType && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (showRequiredMessage && e.target.value.trim() !== "") {
      setShowRequiredMessage(false);
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`flex gap-2 ${isMobile ? "flex-col" : "flex-row items-center"}`}
      >
        <span
          className={`${labelWidth} capitalize ${required ? "before:content-['*'] before:text-red-500 before:pr-0.5" : ""}`}
        >
          {label || id}
        </span>
        <div className="relative w-full">
          <input
            type={inputType}
            id={id}
            value={value}
            onChange={handleInputChange}
            onInvalid={() => setShowRequiredMessage(true)}
            required={required}
            disabled={disabled}
            className={`outline-none border border-gray-300 rounded-[20px] w-full p-2 ${isPasswordType ? "pr-10" : ""} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
          />
          {required && showRequiredMessage ? (
            <span className="text-red-300 text-[12px]">Required</span>
          ) : null}
          {isPasswordType ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
            </button>
          ) : null}
        </div>
      </label>
    </div>
  );
}

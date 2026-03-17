import React from "react";
import useCommon from "../../../hooks/useCommon";
import { Eye, EyeClosed } from "lucide-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface MyInputProps {
  id: string;
  value: string | number | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  labelWidth?: string;
  disabledDate?: (current: dayjs.Dayjs) => boolean;
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
  disabledDate,
}: MyInputProps) {
  const { isMobile } = useCommon();
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

  const dateValue =
    type === "date" && value
      ? dayjs(String(value), "YYYY-MM-DD")
      : null;

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
          {
            type === "date" ? (
              <DatePicker
                type="datetime"
                onChange={(_, dateString) => {
                  onChange({
                    target: {
                      value: dateString,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                value={dateValue?.isValid() ? dateValue : null}
                format="YYYY-MM-DD"
                className={`w-full ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                disabled={disabled}
                disabledDate={disabledDate}
              />
            ) : ( 
              <input
                type={inputType}
                id={id}
                value={value ?? ""}
                onChange={handleInputChange}
                onInvalid={() => setShowRequiredMessage(true)}
                required={required}
                disabled={disabled}
                className={`outline-none border border-gray-300 rounded-md w-full p-2 py-1 ${isPasswordType ? "pr-10" : ""} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
              />
            )
          }
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

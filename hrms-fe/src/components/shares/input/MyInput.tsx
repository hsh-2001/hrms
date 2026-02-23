import React from 'react'

interface MyInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  labelWidth?: string;
}

export default function MyInput({ id, value, onChange, type = "text", required = false, label, labelWidth = "min-w-32", disabled = false }: MyInputProps) {
  return (
    <div>
      <label htmlFor={id} className={`flex gap-2 items-center`}>
        <span className={`${labelWidth} capitalize ${required ? "before:content-['*'] before:text-red-500 before:pr-0.5" : ""}`}>{label || id}</span>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`outline-none border border-gray-300 rounded-md w-full p-2 ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        />
      </label>
    </div>
  )
}
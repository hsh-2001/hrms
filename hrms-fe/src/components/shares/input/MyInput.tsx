import React from 'react'

interface MyInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  label?: string;
  labelWidth?: string;
}

export default function MyInput({ id, value, onChange, type = "text", required = false, label, labelWidth = "min-w-32" }: MyInputProps) {
  return (
    <div>
      <label htmlFor={id} className="flex gap-2 items-center">
        <span className={`${labelWidth} capitalize`}>{label || id}</span>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`outline-none border border-gray-300 rounded-md w-full p-2`}
        />
      </label>
    </div>
  )
}
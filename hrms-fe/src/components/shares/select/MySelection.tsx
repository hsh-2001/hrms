import React from 'react'
interface MySelectionProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}  
export default function MySelection({ id, value, onChange, options }: MySelectionProps) {
  return (
    <div>
        <label htmlFor={id} className="flex gap-2 items-center">
            <span className="min-w-32 capitalize">{id}</span>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="outline-none border border-gray-300 rounded-md w-full p-2"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>    
    </div>
  )
}

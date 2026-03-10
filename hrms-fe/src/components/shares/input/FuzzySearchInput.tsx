import React, { useState, useRef, useEffect } from "react";

/**
 * FuzzySearchInput - A reusable generic fuzzy search autocomplete component
 * 
 * Features:
 * - Keyboard navigation (Arrow Up/Down, Enter, Escape)
 * - Mouse hover selection
 * - Auto-scroll to selected item
 * - Modern UI with smooth transitions
 * - Type-safe with TypeScript generics
 * 
 * @example
 * ```tsx
 * <FuzzySearchInput<Employee>
 *   id="employee-search"
 *   label="Select Employee"
 *   placeholder="Search by name..."
 *   value={searchText}
 *   searchResults={employees}
 *   onInputChange={setSearchText}
 *   onSelect={(employee) => console.log(employee)}
 *   getItemKey={(emp) => emp.id}
 *   renderItem={(emp) => <span>{emp.name}</span>}
 * />
 * ```
 */

interface FuzzySearchInputProps<T> {
  id: string;
  label?: string;
  labelWidth?: string;
  placeholder?: string;
  value: string;
  searchResults: T[];
  onInputChange: (value: string) => void;
  onSelect: (item: T) => void;
  renderItem: (item: T, index: number, isSelected: boolean) => React.ReactNode;
  getItemKey: (item: T) => string | number;
  maxLength?: number;
  disabled?: boolean;
}

export default function FuzzySearchInput<T>({
  id,
  label,
  labelWidth = "min-w-34",
  placeholder = "Search...",
  value,
  searchResults,
  onInputChange,
  onSelect,
  renderItem,
  getItemKey,
  maxLength = 50,
  disabled = false,
}: FuzzySearchInputProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedIndex(-1);
    onInputChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleSelect(searchResults[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setSelectedIndex(-1);
        onInputChange("");
        break;
    }
  };

  const handleSelect = (item: T) => {
    setSelectedIndex(-1);
    onSelect(item);
  };

  const inputField = (
    <div className="w-full relative">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-full transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      {searchResults.length > 0 && (
        <ul 
          ref={listRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {searchResults.map((item, index) => (
            <li
              key={getItemKey(item)}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 wrap-break-word ${
                index === selectedIndex
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-green-50 hover:text-green-600"
              } ${
                index !== searchResults.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="w-full overflow-hidden">
                {renderItem(item, index, index === selectedIndex)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!label) {
    return inputField;
  }

  return (
    <label
      htmlFor={id}
      className="flex text-sm font-medium text-gray-700"
    >
      <span className={labelWidth}>{label}</span>
      {inputField}
    </label>
  );
}

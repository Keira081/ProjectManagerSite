import { useRef, useEffect } from "react";

interface DropdownProps {
  options: { label: any; value: any }[];
  value: any;
  isOpen: boolean;
  onChange: (value: any) => void;
  onClose: () => void; // callback to notify parent when dropdown closes (e.g., on outside click)
}

export default function Dropdown({
  options,
  value,
  isOpen,
  onChange,
  onClose,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close menu if clicked outside, notify parent
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isOpen) {
          onClose();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Dropdown menu */}
      {isOpen && (
        <ul
          className={`absolute left-0 w-full mt-1 shadow-lg bg-purple-600 
                      transition-all duration-200 origin-top 
                      scale-y-100 opacity-100`}
        >
          <div className="border border-gray-300 dark:border-gray-600">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  onClose();
                }}
                className={`cursor-pointer px-4 py-2 text-gray-500 hover:bg-purple-300 hover:text-white 
                    ${opt.value === value ? "bg-purple-300 text-white" : ""}`}
              >
                {opt.label}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}

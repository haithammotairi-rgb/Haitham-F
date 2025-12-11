import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, id, options, className = '', ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
        <label htmlFor={id} className="font-semibold text-gray-800 min-w-fit whitespace-nowrap">
          {label}:
        </label>
        <select
          id={id}
          className="w-full bg-transparent border-b-2 border-gray-400 focus:border-blue-600 focus:bg-blue-50/50 outline-none px-1 py-1 transition-colors text-gray-900 appearance-none rounded-none cursor-pointer"
          {...props}
        >
          <option value="" disabled>Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

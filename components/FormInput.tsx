import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, id, className = '', error, ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
        <label htmlFor={id} className="font-semibold text-gray-800 min-w-fit whitespace-nowrap">
          {label}:
        </label>
        <div className="flex-grow w-full relative">
          <input
            id={id}
            className="w-full bg-transparent border-b-2 border-gray-400 focus:border-blue-600 focus:bg-blue-50/50 outline-none px-1 py-1 transition-colors text-gray-900"
            {...props}
          />
          {error && <span className="absolute -bottom-5 left-0 text-xs text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
};

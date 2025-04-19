import React from "react";

interface InputProps {
  type: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  error?: string | false | undefined;
  required?: boolean;
}

const Input = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-2 ${
          error ? "border-red-500" : "border-[#E1E1E1]"
        } rounded-md p-2`}
        required={required}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;

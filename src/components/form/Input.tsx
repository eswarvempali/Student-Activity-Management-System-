import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type = 'text', placeholder, value, onChange, name, label, required }) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        required={required}
        className="input-field"
      />
    </div>
  );
};

export default Input;
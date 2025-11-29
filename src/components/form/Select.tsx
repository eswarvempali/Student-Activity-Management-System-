import React from 'react';

interface SelectProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label, placeholder }) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <select value={value} onChange={(e) => onChange(e.target.value)} className="form-control">
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
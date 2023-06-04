import React, {useState} from 'react';

export interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({options, onSelect}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <select value={selectedValue} onChange={(e) => handleSelect(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};

export default Dropdown;

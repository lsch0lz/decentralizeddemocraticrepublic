import React, {useEffect, useState} from 'react';

export interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onSelect: (value: string) => void;
    selectedValue: DropdownOption
}

function Dropdown(props: DropdownProps) {
    let {options, onSelect, selectedValue} = props;

    const handleSelect = (value: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(value.target.value);
    };


    return (
        <select value={selectedValue.value} onChange={(e) => handleSelect(e)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

export default Dropdown;

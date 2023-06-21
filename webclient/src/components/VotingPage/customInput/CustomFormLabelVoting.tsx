import React, {ChangeEvent} from 'react';

interface CustomInputProps {
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    value: string;
}

export function CustomFormLabelVoting(props: CustomInputProps) {
    let {
        label,
        type,
        value,
        onChange,
    } = props;
    return (
        <label>
            {label}:
            <input type={type} value={value} onChange={onChange}/>
        </label>
    );
}

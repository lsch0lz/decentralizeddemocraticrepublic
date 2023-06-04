import React, {useState} from 'react';
import './CreationPage.css';
import Dropdown, {DropdownOption} from "./dropdown/Dropdown";

interface CreationPageProps {}

function CreationPage() {
    const createOptions: DropdownOption[] = [
        { value: 'School', label: 'School' },
        { value: 'Class', label: 'Class' },
        { value: 'Teacher', label: 'Teacher' },
        { value: 'Student', label: 'Student' },
        { value: 'Election', label: 'Election' }
    ];

    const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(undefined);

    const handleSelect = (value: string) => {
        const selected = createOptions.find((option) => option.value === value);
        setSelectedOption(selected);
    };

    return (
        <div>
            <Dropdown options={createOptions} onSelect={handleSelect} />
            {/* Other components and content */}
            {selectedOption && <p>Selected: {selectedOption.label}</p>}
        </div>
    );
}
export default CreationPage;

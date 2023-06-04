import React, {useState} from 'react';
import './CreationPage.css';
import Dropdown, {DropdownOption} from "./dropdown/Dropdown";
import SchoolCreation from "./SchoolCreation/SchoolCreation";

interface CreationPageProps {
}

function CreationPage() {
    const createOptions: DropdownOption[] = [
        {value: 'School', label: 'School'},
        {value: 'Class', label: 'Class'},
        {value: 'Teacher', label: 'Teacher'},
        {value: 'Student', label: 'Student'},
        {value: 'Election', label: 'Election'}
    ];

    const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(undefined);

    const handleSelect = (value: string) => {
        const selected = createOptions.find((option) => option.value === value);
        setSelectedOption(selected);
    };

    const renderSelectedOptionContent = () => {
        switch (selectedOption?.value) {
            case 'School':
                return <SchoolCreation/>;
            case 'Class':
                return <div>Selected: Class</div>;
            case 'Teacher':
                return <div>Selected: Teacher</div>;
            case 'Student':
                return <div>Selected: Student</div>;
            case 'Election':
                return <div>Selected: Election</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <Dropdown options={createOptions} onSelect={handleSelect} />
            {renderSelectedOptionContent()}
        </div>
    );
}

export default CreationPage;

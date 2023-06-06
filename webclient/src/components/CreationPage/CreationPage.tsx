import React, {useState} from 'react';
import './CreationPage.css';
import Dropdown, {DropdownOption} from "./dropdown/Dropdown";
import SchoolCreation from "./creationforms/SchoolCreation";
import {ClassCreation} from "./creationforms/ClassCreation";
import {TeacherCreation} from "./creationforms/TeacherCreation";
import {StudentCreation} from "./creationforms/StudentCreation";
import {ElectionCreation} from "./creationforms/ElectionCreation";


function CreationPage() {
    const createOptions: DropdownOption[] = [
        {value: 'School', label: 'School'},
        {value: 'Class', label: 'Class'},
        {value: 'Teacher', label: 'Teacher'},
        {value: 'Student', label: 'Student'},
        {value: 'Election', label: 'Election'}
    ];

    const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(createOptions[0]);

    const handleSelect = (value: string) => {
        const selected = createOptions.find((option) => option.value === value);
        setSelectedOption(selected);
    };

    const renderSelectedOptionContent = () => {
        // TODO: Filter options based on user role
        switch (selectedOption?.value) {
            case 'School':
                return <SchoolCreation/>;
            case 'Class':
                return <ClassCreation/>;
            case 'Teacher':
                return <TeacherCreation/>;
            case 'Student':
                return <StudentCreation/>;
            case 'Election':
                return <ElectionCreation/>
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

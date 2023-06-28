import React, { useContext, useState } from 'react';
import './CreationPage.css';
import Dropdown, { DropdownOption } from './dropdown/Dropdown';
import SchoolCreation from './creationforms/SchoolCreation';
import { ClassCreation } from './creationforms/ClassCreation';
import { TeacherCreation } from './creationforms/TeacherCreation';
import { StudentCreation } from './creationforms/StudentCreation';
import { ElectionCreation } from './creationforms/ElectionCreation';
import RoleContext, { Role } from '../RoleContext';
import SignInInfoMessage from "../SignInInfoMessage";

function CreationPage() {
    const { currentRole } = useContext(RoleContext);

    const teacherOptions: string[] = ['Student', 'Election'];

    const studentOptions: string[] = ['Election'];

    const possibleCreateOptions: DropdownOption[] = [
        { value: 'School', label: 'School' },
        { value: 'Class', label: 'Class' },
        { value: 'Teacher', label: 'Teacher' },
        { value: 'Student', label: 'Student' },
        { value: 'Election', label: 'Election' },
    ].filter((option) => {
        switch (currentRole) {
            case Role.Principal:
                return true;
            case Role.Teacher:
                return teacherOptions.includes(option.value);
            case Role.Student:
                return studentOptions.includes(option.value);
            default:
                return false;
        }
    });

    const [selectedOption, setSelectedOption] = useState<DropdownOption>(
        possibleCreateOptions[0]
    );

    const handleSelect = (value: string) => {
        const selected = possibleCreateOptions.find((option) => option.value === value);
        if (selected !== undefined) {
            setSelectedOption(selected);
        }
    };

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <Dropdown options={possibleCreateOptions} onSelect={handleSelect} selectedValue={selectedOption}/>
                {renderSelectedOptionContent()}
            </div>
        );
    }

    const renderSelectedOptionContent = () => {
        if (selectedOption && selectedOption.value) {
            switch (selectedOption.value) {
                case 'School':
                    return <SchoolCreation />;
                case 'Class':
                    return <ClassCreation />;
                case 'Teacher':
                    return <TeacherCreation />;
                case 'Student':
                    return <StudentCreation />;
                case 'Election':
                    return <ElectionCreation />;
                default:
                    return null;
            }
        }

        return null

    };

    return (
        <div className="creation-page-container"> {/* Apply the container class */}
            {!isUserLoggedIn() ? <SignInInfoMessage /> : <PossibleSelections />}
        </div>
    );
}

export default CreationPage;

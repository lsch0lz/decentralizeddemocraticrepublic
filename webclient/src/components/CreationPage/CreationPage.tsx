import React, {useContext, useState} from 'react';
import './CreationPage.css';
import Dropdown, {DropdownOption} from "./dropdown/Dropdown";
import SchoolCreation from "./creationforms/SchoolCreation";
import {ClassCreation} from "./creationforms/ClassCreation";
import {TeacherCreation} from "./creationforms/TeacherCreation";
import {StudentCreation} from "./creationforms/StudentCreation";
import {ElectionCreation} from "./creationforms/ElectionCreation";
import RoleContext from "../RoleContext";


function CreationPage() {

    const {currentRole} = useContext(RoleContext);

    const teacherOptions: String[] = [
        'Student',
        'Election'
    ];

    const studentOptions: String[] = [
        'Election'
    ];

    const possibleCreateOptions: DropdownOption[] = [
        {value: 'School', label: 'School'},
        {value: 'Class', label: 'Class'},
        {value: 'Teacher', label: 'Teacher'},
        {value: 'Student', label: 'Student'},
        {value: 'Election', label: 'Election'}
    ].filter((option) => {
        switch (currentRole) {
            case 'Principal':
                return true;
            case 'Teacher':
                return teacherOptions.includes(option.value);
            case 'Student':
                return studentOptions.includes(option.value);
            default:
                return false;
        }
    })

    const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(possibleCreateOptions[0]);

    const handleSelect = (value: string) => {
        const selected = possibleCreateOptions.find((option) => option.value === value);
        setSelectedOption(selected);
    };

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <Dropdown options={possibleCreateOptions} onSelect={handleSelect}/>
                {renderSelectedOptionContent()}
            </div>
        );
    }

    function SignInInfoMessage() {
        return <h2>You need to be signed in to create something</h2>;
    }

    const renderSelectedOptionContent = () => {
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


    if (!isUserLoggedIn()) {
        return <SignInInfoMessage/>
    } else {
        return PossibleSelections()
    }
}

export default CreationPage;

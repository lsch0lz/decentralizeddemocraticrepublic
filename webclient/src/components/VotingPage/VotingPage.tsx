import React, { useContext, useState } from 'react';
import './VotingPage.css';
import Dropdown, { DropdownOption } from './dropdown/Dropdown';
import Voting from './creationforms/Voting';
import RoleContext, { Role } from '../RoleContext';

function CreationPage() {
    const { currentRole } = useContext(RoleContext);

    const teacherOptions: string[] = ['Student', 'Election'];

    const studentOptions: string[] = ['Election'];

    const possibleElectionOptions: DropdownOption[] = [
        { value: 'Vote', label: 'Klassensprecher' },
        { value: 'Vote', label: 'Klassenfahrt' },
        { value: 'Vote', label: 'Schulsprecher' },
    ];

    const possibleVoteOptions: DropdownOption[] = [
        { value: 'Vote', label: 'Klassensprecher' },
        { value: 'Vote', label: 'Klassenfahrt' },
        { value: 'Vote', label: 'Schulsprecher' },
    ];

    const [selectedElectionOption, setSelectedElectionOption] = useState<DropdownOption | undefined>(
        possibleElectionOptions[0]
    );

    const [selectedVoteOption, setSelectedVoteOption] = useState<DropdownOption | undefined>(
        possibleVoteOptions[0]
    );

    const handleSelect = (value: string) => {
        const selectedElection = possibleElectionOptions.find((option) => option.value === value);
        setSelectedElectionOption(selectedElection);
        const selectedVote = possibleVoteOptions.find((option) => option.value === value);
        setSelectedVoteOption(selectedVote);
    };

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <Dropdown options={possibleElectionOptions} onSelect={handleSelect} />
                <Dropdown options={possibleVoteOptions} onSelect={handleSelect} />
                {renderSelectedOptionContent()}
            </div>
        );
    }

    function SignInInfoMessage() {
        return <h2>You need to be signed in to create something</h2>;
    }

    const renderSelectedOptionContent = () => {
        switch (selectedElectionOption?.value) {
            case 'Vote':
                return <Voting />;
            default:
                return null;
        }
    };

    return (
        <div className="creation-page-container"> {/* Apply the container class */}
            {!isUserLoggedIn() ? <SignInInfoMessage /> : <PossibleSelections />}
        </div>
    );
}

export default CreationPage;

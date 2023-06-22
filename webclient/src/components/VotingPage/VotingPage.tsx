import React, {useContext, useState} from 'react';
import './VotingPage.css';
import VotingButton from './VotingButton';
import RoleContext from '../RoleContext';
import SignInInfoMessage from "../SignInInfoMessage";
import Dropdown, {DropdownOption} from "../CreationPage/dropdown/Dropdown";

function CreationPage() {
    const {currentRole} = useContext(RoleContext);

    const currentElections: DropdownOption[] = [
        {value: 'Election Klassensprecher', label: 'Klassensprecher'},
        {value: 'Election Klassenfahrt', label: 'Klassenfahrt'},
        {value: 'Election Schulsprecher', label: 'Schulsprecher'},
    ];

    const possibleVoteOptions: DropdownOption[] = [
        {value: 'Vote 1', label: 'Klassensprecher'},
        {value: 'Vote 2', label: 'Klassenfahrt'},
        {value: 'Vote 3', label: 'Schulsprecher'},
    ];

    const [selectedElectionOption, setSelectedElectionOption] = useState<DropdownOption>(
        currentElections[0]
    );

    const [selectedVoteOption, setSelectedVoteOption] = useState<DropdownOption | undefined>(
        possibleVoteOptions[0]
    );

    const handleSelect = (value: string) => {
        console.log(value)
        const selectedElection = currentElections.find((option) => option.value === value);
        console.log(selectedElection)
        if (selectedElection !== undefined) {
            setSelectedElectionOption(selectedElection);
        }
    };

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <Dropdown options={currentElections} onSelect={handleSelect} selectedValue={selectedElectionOption}/>
                {/*<Dropdown options={possibleVoteOptions} onSelect={handleSelect} />*/}
                {/*{renderSelectedOptionContent()}*/}
            </div>
        );
    }


    const renderSelectedOptionContent = () => {
        switch (selectedElectionOption?.value) {
            case 'Vote':
                return <VotingButton/>;
            default:
                return null;
        }
    };

    return (
        <div className="creation-page-container"> {/* Apply the container class */}
            {!isUserLoggedIn() ? <SignInInfoMessage/> : <PossibleSelections/>}
        </div>
    );
}

export default CreationPage;

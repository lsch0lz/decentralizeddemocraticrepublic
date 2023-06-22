import React, {MouseEventHandler, useContext, useState} from 'react';
import './VotingPage.css';
import RoleContext from '../RoleContext';
import SignInInfoMessage from "../SignInInfoMessage";
import Dropdown, {DropdownOption} from "../CreationPage/dropdown/Dropdown";

function CreationPage() {
    const {currentRole} = useContext(RoleContext);

    // TODO: get current elections from backend
    const currentElections: DropdownOption[] = [
        {value: 'Election Klassensprecher', label: 'Klassensprecher'},
        {value: 'Election Klassenfahrt', label: 'Klassenfahrt'},
        {value: 'Election Schulsprecher', label: 'Schulsprecher'},
    ];

    // TODO: get possible vote options from backend
    const possibleVoteOptions: DropdownOption[] = [
        {value: 'Vote 1', label: 'Option 1'},
        {value: 'Vote 2', label: 'Option 2'},
        {value: 'Vote 3', label: 'Option 3'},
    ];

    const [selectedElectionOption, setSelectedElectionOption] = useState<DropdownOption>(
        currentElections[0]
    );

    const [selectedVoteOption, setSelectedVoteOption] = useState<DropdownOption>(
        possibleVoteOptions[0]
    );

    const handleElectionSelect = (value: string) => {
        console.log(value)
        const selectedElection = currentElections.find((option) => option.value === value);
        console.log(selectedElection)
        if (selectedElection !== undefined) {
            setSelectedElectionOption(selectedElection);
        }

        // TODO: get possible vote options from backend and put them into possibleVoteOptions
    };

    const handleVoteSelect = (value: string) => {
        const selectedVote = possibleVoteOptions.find((option) => option.value === value);
        if (selectedVote !== undefined) {
            setSelectedVoteOption(selectedVote);
        }
    }

    const handleVote = (mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
        // TODO: send vote to backend
    }

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <Dropdown options={currentElections} onSelect={handleElectionSelect} selectedValue={selectedElectionOption}/>
                <Dropdown options={possibleVoteOptions} onSelect={handleVoteSelect} selectedValue={selectedVoteOption}/>
                <button onClick={handleVote} >Vote</button>
            </div>
        );
    }


    return (
        <div className="creation-page-container"> {/* Apply the container class */}
            {!isUserLoggedIn() ? <SignInInfoMessage/> : <PossibleSelections/>}
        </div>
    );
}

export default CreationPage;

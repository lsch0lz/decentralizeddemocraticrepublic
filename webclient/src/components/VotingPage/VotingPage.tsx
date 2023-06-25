import React, {MouseEventHandler, useContext, useState} from 'react';
import './VotingPage.css';
import RoleContext from '../RoleContext';
import SignInInfoMessage from "../SignInInfoMessage";
import Dropdown, {DropdownOption} from "../CreationPage/dropdown/Dropdown";
import {getElectionWinner, voteInElection, getAllElectionIDs, getOptionsFromElection, getElectionName} from "../Contract";

function CreationPage() {
    const {currentRole} = useContext(RoleContext);

    // TODO: get current elections from backend
    const currentElections_ids = async () => await getAllElectionIDs("JMG");
    console.log(currentElections_ids)
    currentElections_ids()
        .then(async (ids: string[]) => {
            const electionNames: Promise<string>[] = ids.map(async (id: string) => {
                const name: any = await getElectionName(id, "JMG");
                return String(name);
            });

            return Promise.all(electionNames);
        })
        .then((resolvedNames: string[]) => {
            const currentElections_test: DropdownOption[] = resolvedNames.map((name: string) => ({
                value: `Election ${name}`,
                label: name
            }));

            console.log(currentElections_test);
        })
        .catch((error: any) => {
            console.error('Error occurred:', error);
        });

    const currentElections: DropdownOption[] = [
        {value: 'Election Klassensprecher', label: 'Klassensprecher'},
        {value: 'Election Klassenfahrt', label: 'Klassenfahrt'},
        {value: 'Election Schulsprecher', label: 'Schulsprecher'},
        {value: 'Election Test', label: 'Schulsprecher'},
    ];

    // TODO: get possible vote options from backend
    const possibleVoteOptions: DropdownOption[] = [
        {value: 'Vote 1', label: 'Lukas'},
        {value: 'Vote 2', label: 'Henry'},
        {value: 'Vote 3', label: 'Ferdinand'},
        {value: 'Vote 4', label: 'Moritz'},
    ];

    const [selectedElectionOption, setSelectedElectionOption] = useState<DropdownOption>(
        currentElections[0]
    );

    const possibleVoteOptions_names = async () => await getOptionsFromElection(selectedElectionOption.label, "JMG");

    possibleVoteOptions_names()
        .then((names: string[]) => {
            const possibleVoteOptions_test: DropdownOption[] = names.map((name: string, index: number) => ({
                value: `Vote ${index}`,
                label: name
            }));

            console.log(possibleVoteOptions_test);
        })
        .catch((error: any) => {
            console.error('Error occurred:', error);
        });


    const [selectedVoteOption, setSelectedVoteOption] = useState<DropdownOption>(
        possibleVoteOptions[0]
    );

    const [electionID, setElectionID] = useState("");

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

    const handleVote = async (mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
        const inputField = document.querySelector('input[name="electionID"]') as HTMLInputElement;
        const electionID = inputField.value;

        // TODO: get electionID and selctedVoteOption from Backend
        await voteInElection(electionID, selectedVoteOption.label, "JMG")
        await getElectionWinner(electionID, "JMG").then((e: any) => {
            console.log('Got election winner', e[0]);
        })
    }

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <input type="electionID" name="electionID"/>
                <Dropdown options={currentElections} onSelect={handleElectionSelect}
                          selectedValue={selectedElectionOption}/>
                <Dropdown options={possibleVoteOptions} onSelect={handleVoteSelect} selectedValue={selectedVoteOption}/>
                <button onClick={handleVote}>Vote</button>
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

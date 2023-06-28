import React, {useContext, useEffect, useState} from 'react';
import './VotingPage.css';
import RoleContext from '../RoleContext';
import SignInInfoMessage from "../SignInInfoMessage";
import Dropdown, {DropdownOption} from "../CreationPage/dropdown/Dropdown";
import {getAllElectionIDs, getElectionName, getOptionsFromElection, voteInElection} from "../Contract";

function CreationPage() {
    const {currentRole} = useContext(RoleContext);

    let [currentElections, setCurrentElections] = useState<DropdownOption[]>([]);

    const [selectedElection, setSelectedElection] = useState<DropdownOption | undefined>(
        undefined
    );

    const [possibleVoteOptions, setPossibleVoteOptions] = useState<DropdownOption[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentElectionIds = await getAllElectionIDs("JMG");
                const electionNames = await Promise.all(currentElectionIds.map((id: string) => getElectionName(id, "JMG")));

                const updatedElections = electionNames.map((name, index) => ({
                    value: currentElectionIds[index],
                    label: electionNames[index]
                }));

                setCurrentElections(updatedElections);
                setElectionOptionWithDownloadingOptions(updatedElections[0], updatedElections);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once

    function setElectionOptionWithDownloadingOptions(electionOption: DropdownOption, allElections: DropdownOption[]) {
        setSelectedElection(electionOption);
        let dropdownOption = allElections.find((option) => option.value === electionOption.value)
        if (dropdownOption !== undefined) {
            getOptionsFromElection(dropdownOption.value, "JMG")
                .then((names: string[]) => {
                    const possibleVoteOptions_test: DropdownOption[] = names.map((name: string, index: number) => ({
                        value: index.toString(),
                        label: name
                    }));

                    setPossibleVoteOptions(possibleVoteOptions_test);
                    setSelectedVoteOption(possibleVoteOptions_test[0])
                })
                .catch((error: any) => {
                    console.error('Error occurred:', error);
                });
        }
    }

    const [selectedVoteOption, setSelectedVoteOption] = useState<DropdownOption | undefined>(undefined);

    const handleElectionSelect = (value: string) => {
        const selectedElection = currentElections.find((option) => option.value === value);
        if (selectedElection !== undefined) {
            setElectionOptionWithDownloadingOptions(selectedElection, currentElections);
        }
    };

    const handleVoteSelect = (value: string) => {
        const selectedVote = possibleVoteOptions.find((option) => option.value === value);
        if (selectedVote !== undefined) {
            setSelectedVoteOption(selectedVote);
        }
    }

    const handleVote = async (mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedElection != undefined && selectedVoteOption != undefined) {
            voteInElection(selectedElection.value, selectedVoteOption.label, "JMG")
                .then(() => {})
                .catch((error: any) => {
                    console.error('Error occurred:', error);
                });
        }
    }

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        return (
            <div>
                <Dropdown options={currentElections}
                          selectedValue={selectedElection}
                          onSelect={handleElectionSelect}
                />

                <Dropdown options={possibleVoteOptions}
                          selectedValue={selectedVoteOption}
                          onSelect={handleVoteSelect}
                />

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

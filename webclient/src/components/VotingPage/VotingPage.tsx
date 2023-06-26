import React, {useContext, useEffect, useState} from 'react';
import './VotingPage.css';
import RoleContext from '../RoleContext';
import SignInInfoMessage from "../SignInInfoMessage";
import Dropdown, {DropdownOption} from "../CreationPage/dropdown/Dropdown";
import {getAllElectionIDs, getElectionName, getOptionsFromElection} from "../Contract";

function CreationPage() {
    const {currentRole} = useContext(RoleContext);

    let [currentElections, setCurrentElections] = useState<DropdownOption[]>([]);

    const [selectedElectionOption, setSelectedElectionOption] = useState<DropdownOption | undefined>(
        undefined
    );

    const [possibleVoteOptions, setPossibleVoteOptions] = useState<DropdownOption[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentElectionIds = await getAllElectionIDs("JMG");
                const electionNames = await Promise.all(currentElectionIds.map((id: string) => getElectionName(id, "JMG")));

                console.log(electionNames)

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
        setSelectedElectionOption(electionOption);
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
        console.log(value)
        const selectedElection = currentElections.find((option) => option.value === value);
        console.log(selectedElection)
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
        // // TODO: get electionID and selctedVoteOption from Backend
        // await voteInElection(electionID, selectedVoteOption.label, "JMG")
        // await getElectionWinner(electionID, "JMG").then((e: any) => {
        //     console.log('Got election winner', e[0]);
        // })
    }

    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleSelections() {
        console.log("Possible vote options are " + possibleVoteOptions)
        return (
            <div>
                <Dropdown options={currentElections}
                          selectedValue={selectedElectionOption}
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

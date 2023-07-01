import React, {useContext, useState} from 'react';
import SignInInfoMessage from "../SignInInfoMessage";
import {getAllElectionIDs, getElectionName, getElectionWinner} from "../Contract";
import RoleContext from "../RoleContext";

export interface ElectionResult {
    value: string;
    label: string;
}


function NewsPage() {
    const {currentRole} = useContext(RoleContext);
    const [electionResults, setElectionResults] = useState<ElectionResult[]>([]);


    async function showWinner() {
        // Show all elections and the current winner
        const currentElectionIds = await getAllElectionIDs("JMG");
        const electionNames = await Promise.all(currentElectionIds.map((id: string) => getElectionName(id, "JMG")));
        const electionWinners = await Promise.all(currentElectionIds.map((id: string) => getElectionWinner(id, "JMG")));

        let results = electionNames.map((name, index) => ({
            value: electionWinners[index], // Set the value as the winner
            label: name, // Set the label as the election name
        }));

        setElectionResults(results);
    }

    function isUserLoggedIn() {
        return currentRole !== null;
    }



    function PossibleNewsPage() {
        return (
            <div>
                <h1>News Page</h1>
                <p>Hier könnt ihr die neuesten Abstimmungen und ihre Gewinner sehen!</p>
                <button onClick={() => showWinner()}>Show Winner</button>

                {electionResults.map((result, index) => (
                    <RenderElectionResult key={index} electionResult={result} />
                ))}

            </div>
        );
    }

    return (
        <div className="creation-page-container"> {/* Apply the container class */}
            {!isUserLoggedIn() ? <SignInInfoMessage/> : <PossibleNewsPage/>}
        </div>
    );
}

interface RenderElectionResultProps {
    electionResult: ElectionResult
}

function RenderElectionResult(props: RenderElectionResultProps) {
    let props1 = props;

    return (
        <p>{props1.electionResult.label}</p>
    )
}


export default NewsPage;

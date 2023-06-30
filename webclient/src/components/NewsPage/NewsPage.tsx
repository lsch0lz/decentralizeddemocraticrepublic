import React, {useContext, useEffect, useState} from 'react';
import SignInInfoMessage from "../SignInInfoMessage";
import {getAllElectionIDs, getElectionName, getElectionWinner, getOptionsFromElection} from "../Contract";
import RoleContext from "../RoleContext";

function NewsPage() {
    const {currentRole} = useContext(RoleContext);

    async function showWinner(index: number) {
        // Show all elections and the current winner
        const currentElectionIds = await getAllElectionIDs("JMG");
        const electionNames = await Promise.all(currentElectionIds.map((id: string) => getElectionName(id, "JMG")));
        const electionWinners = await Promise.all(currentElectionIds.map((id: string) => getElectionWinner(id, "JMG")));

        return electionNames.map((name, index) => ({
            label: electionNames[index],
            winner: electionWinners[index]
        }));
    }



function isUserLoggedIn() {
    return currentRole !== null;
}

function PossibleNewsPage() {
    return (
        <div>
            <h1>News Page</h1>
            <p>Hier könnt ihr die neuesten Abstimmungen und ihre Gewinner sehen!</p>
            <button onClick={() => showWinner(0)}>Show Winner</button>

        </div>
    );
}

return (
    <div className="creation-page-container"> {/* Apply the container class */}
        {!isUserLoggedIn() ? <SignInInfoMessage/> : <PossibleNewsPage/>}
    </div>
    );
}


export default NewsPage;
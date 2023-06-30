import React, {useContext, useEffect, useState} from 'react';
import SignInInfoMessage from "../SignInInfoMessage";
import {getAllElectionIDs, getElectionName, getElectionWinner, getOptionsFromElection} from "../Contract";
import RoleContext from "../RoleContext";

function NewsPage(){
    const {currentRole} = useContext(RoleContext);
    function isUserLoggedIn() {
        return currentRole !== null;
    }

    function PossibleNewsPage(){
        return (
            <div>
                <h1>News Page</h1>
                <p>Hier könnt ihr die neuesten Abstimmungen und ihre Gewinner sehen!</p>
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
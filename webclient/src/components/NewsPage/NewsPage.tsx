import React, {useContext, useEffect, useState} from 'react';
import SignInInfoMessage from "../SignInInfoMessage";
import {getAllElectionIDs, getElectionName, getElectionWinner, getOptionsFromElection} from "../Contract";

function NewsPage(){

    return (
        <div>
            <h1>News Page</h1>
            <p>This is a test</p>
        </div>
    );
}


export default NewsPage;
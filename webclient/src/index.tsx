import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RoleContextProvider} from "./components/RoleContext";
import {Web3ServiceImpl} from "./Web3Service";
import ServiceContext from './ServiceContext';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <ServiceContext.Provider value={new Web3ServiceImpl()}>
        <RoleContextProvider>
            <App/>
        </RoleContextProvider>
    </ServiceContext.Provider>,
    rootElement
);

reportWebVitals();

import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import About from "./components/About";
import Error from "./components/Error";
import Navigation, {NavLinkItem} from "./components/Navigation";
import CreationPage from "./components/CreationPage/CreationPage";
import VotingPage from "./components/VotingPage/VotingPage";


function App() {

    const navLinks: NavLinkItem[] = [
        {text: 'Home', path: '/'},
        {text: 'About', path: '/about'},
        {text: 'Contact', path: '/contact'},
        {text: 'Login', path: '/login'},
        {text: 'Create', path: '/create'},
        {text: 'Voting', path: '/voting'}
    ];


    return (
            <Router>
                <div>
                    <Navigation navLinks={navLinks}/>
                    <Routes>
                        <Route path="/" Component={Home}/>
                        <Route path="/create" Component={CreationPage}/>
                        <Route path="/voting" Component={VotingPage}/>
                        <Route path="/about" Component={About}/>
                        <Route path="/login" Component={Login}/>
                        <Route path="*" Component={Error}/>
                    </Routes>
                </div>
            </Router>

    );
}

export default App;

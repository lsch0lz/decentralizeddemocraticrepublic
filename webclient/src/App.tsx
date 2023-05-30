import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import About from "./components/About";
import Error from "./components/Error";
import Navigation from "./components/Navigation";


class App extends Component {
    render() {
        // @ts-ignore
        return (
            <Router>
                <div>
                    <Navigation />
                    <Routes>
                        <Route path="/" Component={Home}/>
                        <Route path="/about" Component={About}/>
                        <Route path="/login" Component={Login}/>
                        <Route Component={Error}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
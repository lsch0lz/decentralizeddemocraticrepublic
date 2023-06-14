import React from 'react';

import {NavLink} from 'react-router-dom';
import './Navigation.css';

export interface NavLinkItem {
    text: string;
    path: string;
}

interface NavigationProps {
    navLinks: NavLinkItem[];
}

const Navigation = ({navLinks}: { navLinks: NavLinkItem[] }) => {
    return (
        <div className="nav-container">
            {navLinks.map(({text, path}) => (
                <NavLink key={path} to={path} className="nav-link">{text}</NavLink>
            ))}
        </div>
    );
};

export default Navigation;

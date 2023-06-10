import React from 'react';

import {NavLink} from 'react-router-dom';

export interface NavLinkItem {
    text: string;
    path: string;
}

interface NavigationProps {
    navLinks: NavLinkItem[];
}

const Navigation = ({navLinks}: { navLinks: NavLinkItem[] }) => {
    return (
        <div>
            {navLinks.map(({text, path}) => (
                <NavLink key={path} to={path}>{text}</NavLink>
            ))}
        </div>
    );
};

export default Navigation;

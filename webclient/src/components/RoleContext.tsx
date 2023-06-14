import React, {createContext, useState} from 'react';

export enum Role {
    Student = 'Student',
    Teacher = 'Teacher',
    Principal = 'Principal',
}

interface RoleContextType {
    currentRole: Role | null
    setCurrentRole: (value: Role | null) => void;
}

const RoleContext = createContext<RoleContextType>({
    currentRole: null,
    setCurrentRole: () => {},
});

export function RoleContextProvider(props: { children: any; }) {
    let {children} = props;
    const [currentRole, setCurrentRole] = useState<Role | null>(null);

    return (
        <RoleContext.Provider value={{currentRole: currentRole, setCurrentRole: setCurrentRole}}>
            {children}
        </RoleContext.Provider>
    );
}

export default RoleContext;

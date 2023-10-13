import { useContext, createContext, ReactNode, SetStateAction } from "react";
import { useState, Dispatch } from "react";


interface User {
    name: string, 
    gender: string,
}

export type UserContextType = {
    user: User,
}

export const UserContext = createContext({} as {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
});

export const UserProvider = (props: any) => {
    const { children } = props

    const [ user, setUser ] = useState({
        name: 'frank', 
        gender: 'male',
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
        )
}


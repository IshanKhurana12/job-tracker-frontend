import { createContext, useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user,setuser]=useLocalStorage("user",{})
    return (
        <UserContext.Provider value={{ user, setuser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
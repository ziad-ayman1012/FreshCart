import { createContext , useState } from "react";

export const authContext = createContext();
export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('tkn'))

    return < authContext.Provider value={{token:token , setToken}}>
        {children}
    </ authContext.Provider>;
}

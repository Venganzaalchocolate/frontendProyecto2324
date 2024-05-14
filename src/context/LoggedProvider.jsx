import { createContext, useState } from "react";

export const LoggedContext=createContext();

export function LoggedProvider({children}){
    const [logged, setLogged]=useState({
        estaLogueado:false,
        user:{}
    })

return (
    <LoggedContext.Provider value={{
        logged,
        setLogged
    }}>
    {children}
    </LoggedContext.Provider>
)
}
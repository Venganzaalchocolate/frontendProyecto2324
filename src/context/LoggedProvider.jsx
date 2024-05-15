import { createContext, useState } from "react";

export const LoggedContext = createContext();

export function LoggedProvider({ children }) {
    const [logged, setLogged] = useState({
        estaLogueado: false,
        user: {}
    })

    const cambiarLogged=(user)=>{
        const auxLogged= structuredClone(logged)
        auxLogged['estaLogueado']=true
        auxLogged['user']=user
        setLogged(auxLogged)
    }

    const logout=()=>{
        const auxLogged= {}
        auxLogged['estaLogueado']=false
        auxLogged['user']={}
        setLogged(auxLogged)
    }

    return (
        <LoggedContext.Provider value={{
            logged,
            cambiarLogged,
            logout
        }}>
            {children}
        </LoggedContext.Provider>
    )
}
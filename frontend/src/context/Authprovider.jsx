import  Cookies  from "js-cookie";
import { createContext, useContext, useState } from "react";

export const Authcontext=createContext();
export const Authprovider=({children})=>{
    const [authuser,setAuthuser]=useState(()=>{
        return localStorage.getItem("token")||Cookies.get("jwt")||null
    })

    return (
        <Authcontext.Provider value={[authuser,setAuthuser]}>{children}</Authcontext.Provider>
    )

}

export const useAuth=()=>useContext(Authcontext)
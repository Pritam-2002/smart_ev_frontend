import { createContext, useContext,useState } from "react";

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const[user,setuser]=useState(null)
    const[token,setToken]=useState(null)
    const[loading,setLoading]=useState(true)

    const login=(userData,tokenData)=>{
        setuser(userData)
        setToken(tokenData)
        setLoading(false)
        localStorage.setItem('user',JSON.stringify(userData))
        localStorage.setItem('token',tokenData)
    }
    const logout=()=>{
        setuser(null)
        setToken(null)
        setLoading(false)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }



return (
    <AuthContext.Provider value={{user,setuser,setToken,token,loading,login,logout}}>
    {children}
    </AuthContext.Provider>
    )
}

export const useAuth=()=>{
   return useContext(AuthContext)
}

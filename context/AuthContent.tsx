
import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const local =typeof window !== null && typeof window !== "undefined" && localStorage.getItem("user");
const INITIAL_STATE:any = {
    currentUser:local ? JSON.parse(local)
        : null 
    }

export const AuthorizationContext = createContext<any>(INITIAL_STATE)


export const AuthContentProvider = ({children}:any)=>{
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.currentUser))
    },[state.currentUser])
    
    return (
    <AuthorizationContext.Provider value={{currentUser: state.currentUser,dispatch}}>
        {children}
    </AuthorizationContext.Provider>
    );
};


export default AuthContentProvider;
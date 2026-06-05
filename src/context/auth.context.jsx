import service from "../services/index.services";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

function AuthWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)

    const [loggedUserRole, setLoggedUserRole] = useState(null)

    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const authenticateUser = async() => {

        const authToken = localStorage.getItem("authToken")

        if (!authToken) {
            setIsAuthenticating(false)
            return // in case there is no token, don't call the backend
        }

        try {
            
            const response = await service.get("/auth/verify")
            console.log(response);
            // asume the token was valid
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setLoggedUserRole(response.data.payload.role)

            setIsAuthenticating(false)
            
        } catch (error) {
            console.log(error);
            // asume the token was not valid
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setLoggedUserRole(null)

            setIsAuthenticating(false)
        }

    }

    useEffect(() => {
        authenticateUser()
    }, [])

    if (isAuthenticating) {
        return <h3>Authenticating user...</h3>
    }

    const passedContext = {
        isLoggedIn,
        setIsLoggedIn,
        loggedUserId,
        setLoggedUserId,

        // BONUS
        loggedUserRole,
        setLoggedUserRole
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}

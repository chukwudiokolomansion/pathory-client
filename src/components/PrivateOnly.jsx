import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navilink } from "react-router-dom"

// this is a wrapper component used to display pages only to users that are logged in
function PrivateOnly(props) {

    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) {
        return props.children
    } else {
        return <Navilink to="/login"/>
    }


}

export default PrivateOnly
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UserPage from "../pages/UserPage";

function Navbar() {

  const navigate = useNavigate()

  const { setIsLoggedIn, setLoggedUserId, isLoggedIn, setLoggedUserRole } = useContext(AuthContext)

  function handleLogout(e) {
    e.preventDefault()

    // destroying the token
    localStorage.removeItem("authToken")

    // revert the states to their initial value
    setIsLoggedIn(false)
    setLoggedUserId(null)
    setLoggedUserRole(null)

    // navigate the user to a public page
    navigate("/login")

  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {!isLoggedIn && <>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </>}

      {isLoggedIn && <>
        <Link to="/UserPage">UserPage</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </>}
    </nav>
  );
}

export default Navbar;
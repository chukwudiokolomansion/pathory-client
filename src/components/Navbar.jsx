import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import TopNavbar from "../pages/TopNavbar";

function Navbar({ toggleSidebar }) {

  const navigate = useNavigate()

  const { setIsLoggedIn, setLoggedUserId, isLoggedIn, setLoggedUserRole } = useContext(AuthContext)

  const getCurrentLinkText = (pathname) => {
    const routes = {
      "/dashboard": "Planners",
      //"/planners": "Planners",
      "/activities": "Activities",
      "/planners/details/:plannerId": "Planner Details",
      "/planners/edit/:plannerId": "Edit Planner",
      "/planners/create": "Create Planner",
      "/activities/details/:activityId": "Activity Details",
      "/activities/edit/:activityId": "Edit Activity",
      "/users": "User Profile",
      "/login": "Log In",
      "/signup": "Sign Up",
    };

    for (let route in routes) {
      let regexPattern = new RegExp("^" + route.replace(/:\w+/g, "\\w+") + "$");
      if (regexPattern.test(pathname)) {
        return routes[route];
      }
    }
  }

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
     <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between h-20 items-center px-4">
        {/* Left flex container for burger icon and text */}
        <div className="flex items-center space-x-2 w-1/4">
          <button
            className="flex items-center text-l py-1"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <span className="text-xl">
            {getCurrentLinkText(location.pathname)}
          </span>
          </div>


      <Link to="/">Home</Link>

      {!isLoggedIn && <>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </>}

      {isLoggedIn && <>
        <Link to="/dashboard">Dashboard</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </>}
        </div>

    </nav>
  );
}

export default Navbar;
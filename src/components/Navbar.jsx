import logo from "./../assets/logo-ironhack-blue.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar({ toggleSidebar }) {

  const location = useLocation();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const getCurrentLinkText = (pathname) => {

    const routes = {

      // MAIN APP
      "/dashboard": "Memory Dashboard",

      // ACTIVITIES (Activity Model)
      "/activities": "Activities",
      "/activities/create": "Create Activity",
      "/activities/details/:activityId": "Activity Details",
      "/activities/edit/:activityId": "Edit Activity",

      // PLANNERS (Planner Model)
      "/planners": "Planners",
      "/planners/create": "Create Planner",
      "/planners/details/:plannerId": "Planner Details",
      "/planners/edit/:plannerId": "Edit Planner",

      // USER
      "/profile": "User Profile",
      "/login": "Log In",
      "/signup": "Sign Up",
    };

    for (let route in routes) {

      let regexPattern = new RegExp(
        "^" + route.replace(/:\w+/g, "\\w+") + "$"
      );

      if (regexPattern.test(pathname)) {
        return routes[route];
      }
    }

    return "Memory App";
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">

      <div className="flex justify-between h-20 items-center px-4">

        {/* LEFT */}
        <div className="flex items-center space-x-2 w-1/4">

          <button
            className="flex items-center text-xl py-1"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <span className="text-lg font-medium">
            {getCurrentLinkText(location.pathname)}
          </span>

        </div>

        {/* CENTER LOGO */}
        <div className="flex justify-center w-1/2">

          <Link to="/dashboard">

            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto"
            />

          </Link>

        </div>

        {/* RIGHT AUTH BUTTONS */}
        <div className="w-1/4 flex justify-end mr-4">

          {isLoggedIn && (
            <button
              className="px-4 py-1 rounded bg-blue-500 hover:bg-blue-400"
              onClick={logOutUser}
            >
              Log Out
            </button>
          )}

          {!isLoggedIn &&
            location.pathname !== "/login" &&
            location.pathname !== "/signup" && (
              <Link to="/login">
                <button className="px-6 py-1 rounded bg-blue-500 hover:bg-blue-400">
                  Log In
                </button>
              </Link>
            )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
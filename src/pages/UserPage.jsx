/*import service from '../services/index.services'
import { useEffect, useState } from 'react'

function PrivatePageExample() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      
      // call a private route here...
      const response = await service.get("/private-example")
      console.log(response.data)
      setData(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here
  if (!dataOnlyForLoggedUsers) {
    return <h3>loading...</h3>
  }

  return (
    <div>
      
      <h3>Private Page Example</h3>
      <p>Should only be visible for logged in users that already validated their credentials (login) and have a valid token</p>

      {dataOnlyForLoggedUsers.username}

    </div>
  )
}

export default PrivatePageExample*/

import logo from "../assets/logo-ironhack-blue.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const PAGE_TITLES = {
  "/dashboard": "Memory Dashboard",

  // Activities
  "/activities": "Activities",
  "/activities/create": "Create Activity",
  "/activities/details/:activityId": "Activity Details",
  "/activities/edit/:activityId": "Edit Activity",

  // Planners
  "/planners": "Planners",
  "/planners/create": "Create Planner",
  "/planners/details/:plannerId": "Planner Details",
  "/planners/edit/:plannerId": "Edit Planner",

  // User
  "/profile": "User Profile",
  "/login": "Log In",
  "/signup": "Sign Up",
};

function UserPage({ toggleSidebar }) {
  const location = useLocation();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const getCurrentPageTitle = (pathname) => {
    for (const route in PAGE_TITLES) {
      const regex = new RegExp(
        "^" + route.replace(/:\w+/g, "\\w+") + "$"
      );

      if (regex.test(pathname)) {
        return PAGE_TITLES[route];
      }
    }

    return "Memory App";
  };

  const showLoginButton =
    !isLoggedIn &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-blue-600 text-white shadow-md">
      <div className="flex h-20 items-center justify-between px-4">
        {/* Left */}
        <div className="flex w-1/4 items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-xl"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>

          <span className="text-lg font-medium">
            {getCurrentPageTitle(location.pathname)}
          </span>
        </div>

        {/* Center */}
        <div className="flex w-1/2 justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="Memory App Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Right */}
        <div className="flex w-1/4 justify-end">
          {isLoggedIn ? (
            <button
              onClick={logOutUser}
              className="rounded bg-blue-500 px-4 py-1 hover:bg-blue-400"
            >
              Logout
            </button>
          ) : (
            showLoginButton && (
              <Link to="/login">
                <button className="rounded bg-blue-500 px-6 py-1 hover:bg-blue-400">
                  Log In
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default UserPage;
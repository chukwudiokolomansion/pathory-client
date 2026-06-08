import { useContext } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import {
  HiOutlineMenu,
  HiOutlineLogout,
  HiOutlineHome,
} from "react-icons/hi";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    setIsLoggedIn,
    setLoggedUserId,
    isLoggedIn,
    setLoggedUserRole,
  } = useContext(AuthContext);

  const getCurrentLinkText = (pathname) => {
    const routes = {
      "/dashboard": "Planner Dashboard",
      "/activities": "Activities",
      "/users/profile": "Profile",
      "/login": "Login",
      "/signup": "Signup",
    };

    return routes[pathname] || "Pathory";
  };

  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("authToken");

    setIsLoggedIn(false);
    setLoggedUserId(null);
    setLoggedUserRole(null);

    navigate("/login");
  }

  return (
    <nav className="pathory-navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu size={24} />
        </button>

        <div>
          <h2>
            {getCurrentLinkText(
              location.pathname
            )}
          </h2>

          <p>Every Life Has A Story</p>
        </div>
      </div>

      <div className="navbar-right">
        <Link
          to="/"
          className="nav-icon-btn"
        >
          <HiOutlineHome size={20} />
        </Link>

        {!isLoggedIn && (
          <>
            <Link
              to="/signup"
              className="nav-btn"
            >
              Signup
            </Link>

            <Link
              to="/login"
              className="nav-btn-primary"
            >
              Login
            </Link>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <HiOutlineLogout />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Sidebar() {
  const location = useLocation();

  const { isLoggedIn } = useContext(AuthContext);

  // Hide sidebar completely if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="sidebar bg-white w-64 min-h-screen shadow-md border-r p-4">

      <h2 className="text-xl font-bold mb-6 text-blue-600">
        Dashboard
      </h2>

      <ul className="space-y-2">

        <li>
          <Link
            to="/dashboard"
            className={linkClasses("/dashboard")}
          >
            📋 Planners
          </Link>
        </li>

        <li>
          <Link
            to="/activities"
            className={linkClasses("/activities")}
          >
            🎯 Activities
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className={linkClasses("/profile")}
          >
            👤 User Profile
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
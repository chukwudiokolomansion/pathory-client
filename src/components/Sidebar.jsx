import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar bg-white text-black p-4 w-64 h-full shadow-md">

      <ul className="space-y-3">

        {/* DASHBOARD */}
        <li>
          <Link
            to="/dashboard"
            className={isActive("/dashboard") ? "font-bold text-blue-600" : ""}
          >
            🧠 Memory Dashboard
          </Link>
        </li>

        {/* ACTIVITIES (Activity Model) */}
        <li>
          <Link
            to="/activities"
            className={isActive("/activities") ? "font-bold text-blue-600" : ""}
          >
            📍 Activities
          </Link>
        </li>

        <li>
          <Link
            to="/activities/create"
            className={isActive("/activities/create") ? "font-bold text-blue-600" : ""}
          >
            ➕ Create Activity
          </Link>
        </li>

        {/* PLANNERS (Planner Model) */}
        <li>
          <Link
            to="/planners"
            className={isActive("/planners") ? "font-bold text-blue-600" : ""}
          >
            🗺️ Planners
          </Link>
        </li>

        <li>
          <Link
            to="/planners/create"
            className={isActive("/planners/create") ? "font-bold text-blue-600" : ""}
          >
            ➕ Create Planner
          </Link>
        </li>

        {/* USER */}
        <li>
          <Link
            to="/profile"
            className={isActive("/profile") ? "font-bold text-blue-600" : ""}
          >
            👤 User Profile
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;
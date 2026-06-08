import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineUser,
} from "react-icons/hi";


function Sidebar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Planners",
      path: "/planners",
      icon: <HiOutlineClipboardList size={22} />,
    },
    {
      name: "Activities",
      path: "/activities",
      icon: <HiOutlineCalendar size={22} />,
    },
    {
      name: "Profile",
      path: "/users/profile",
      icon: <HiOutlineUser size={22} />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
       

        <h2>PATHORY</h2>

        <p>Every Life Has A Story</p>
      </div>

      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path
                ? "sidebar-active"
                : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="journey-card">
          <h4>Your Journey</h4>
          <p>Keep building your story.</p>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
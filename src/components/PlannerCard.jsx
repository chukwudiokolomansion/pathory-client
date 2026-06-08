import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

function PlannerCard({ _id, title, destination, startDate, endDate, status }) {
  return (
    <div className="planner-card">
      <div className="planner-card-header">
        <h3>{title}</h3>

        <span className="status-pill">
          {status || "Draft"}
        </span>
      </div>

      <div className="planner-card-content">
        <p>📍 {destination}</p>
        <p>📅 {startDate}</p>
        <p>🏁 {endDate}</p>
      </div>

      <div className="planner-card-actions">
        <Link to={`/planner/details/${_id}`}>
          <button className="view-btn">
            View Journey
          </button>
        </Link>

        <Link to={`/dashboard/planner/${_id}`}>
          <button className="edit-btn">
            <BiEdit />
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PlannerCard;
import { Link } from "react-router-dom";

function PlannerCard({
  _id,
  title,
  description,
  startDate,
  endDate,
  destination,
  status,
  className,
}) {
  return (
    <Link to={`/planners/details/${_id}`}>
      <div
        className={`PlannerCard flex flex-col p-4 mb-3 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50 transition ${className}`}
      >
        {/* TITLE */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{title}</h3>

          {/* STATUS BADGE */}
          <span className="text-sm px-2 py-1 rounded bg-gray-100">
            {status === "pending" && "🟡 Pending"}
            {status === "in-progress" && "🔵 In Progress"}
            {status === "completed" && "🟢 Completed"}
            {status === "cancelled" && "🔴 Cancelled"}
          </span>
        </div>

        {/* DESTINATION */}
        <p className="text-sm text-gray-600 mt-1">
          📍 {destination || "No destination set"}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm mt-2 text-gray-700 line-clamp-2">
          {description || "No description provided"}
        </p>

        {/* DATES */}
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>
            Start: {new Date(startDate).toLocaleDateString()}
          </span>

          <span>
            End: {new Date(endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PlannerCard;
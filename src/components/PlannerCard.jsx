import { Link } from "react-router-dom";

function PlannerCard({
  _id,
  title,
  inProgress,
  destination,
  plannerName,
  plannerSlug,
  className,
}) {
  return (
    <Link to={`/planners/details/${_id}`}>
      <div
        className={`PlannerCard flex justify-between items-center p-3 mb-2 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50 ${className}`}
      >
        <span style={{ flexBasis: "25%" }}>{plannerName}</span>
        <span style={{ flexBasis: "15%" }}>{title}</span>
        <span style={{ flexBasis: "15%" }}>{destination}</span>
        <span style={{ flexBasis: "15%" }}>{inProgress ? "✅" : "⬜️"}</span>
        <span style={{ flexBasis: "25%" }}>{plannerSlug}</span>
      </div>
    </Link>
  );
}

export default PlannerCard;

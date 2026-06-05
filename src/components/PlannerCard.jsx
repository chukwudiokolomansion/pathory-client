import { Link } from "react-router-dom";

function PlannerCard({
  _id,
  title,
  description,
  destination,
  status,
  startDate,
  endDate,
  className = "",
}) {
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <Link to={`/planners/details/${_id}`}>
      <div
        className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition duration-200 p-5 mb-4 ${className}`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-start gap-4">

          <div>
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* STATUS */}
          <span
            className={`text-xs px-3 py-1 rounded-full capitalize ${
              statusColors[status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* DETAILS */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">

          {/* DESTINATION */}
          {destination && (
            <div>
              📍 <span>{destination}</span>
            </div>
          )}

          {/* START DATE */}
          <div>
            📅 Start: {formatDate(startDate)}
          </div>

          {/* END DATE */}
          <div>
            🏁 End: {formatDate(endDate)}
          </div>

        </div>
      </div>
    </Link>
  );
}

export default PlannerCard;
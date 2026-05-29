import { Link } from "react-router-dom";

function PlannerFilterBar({
  destinationQuery,
  setDestinationQuery,
  statusQuery,
  setStatusQuery,
  titleQuery,
  setTitleQuery,
  handleChange,
}) {
  return (
    <div className="filter-bar flex justify-between items-center mb-4 p-3 px-6 bg-gray-200 rounded">

      {/* FILTER SECTION */}
      <div className="flex flex-wrap items-center gap-6">

        {/* TITLE SEARCH */}
        <label className="flex items-center gap-2">
          <span>Search:</span>
          <input
            type="text"
            value={titleQuery}
            placeholder="Planner title..."
            onChange={(e) => handleChange(e, setTitleQuery)}
            className="p-1 rounded border"
          />
        </label>

        {/* DESTINATION FILTER */}
        <label className="flex items-center gap-2">
          <span>Destination:</span>
          <input
            type="text"
            value={destinationQuery}
            placeholder="e.g. Paris"
            onChange={(e) => handleChange(e, setDestinationQuery)}
            className="p-1 rounded border"
          />
        </label>

        {/* STATUS FILTER */}
        <label className="flex items-center gap-2">
          <span>Status:</span>
          <select
            value={statusQuery}
            onChange={(e) => handleChange(e, setStatusQuery)}
            className="p-1 rounded border"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

      </div>

      {/* CREATE BUTTON */}
      <Link to="/planners/create" className="ml-auto">
        <button className="px-6 py-1 rounded bg-blue-600 text-white hover:bg-blue-500">
          Create Planner
        </button>
      </Link>

    </div>
  );
}

export default PlannerFilterBar;
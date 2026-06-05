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
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-4 mb-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* DESTINATION */}
        <div className="flex flex-col">
          <label
            htmlFor="destination"
            className="text-sm font-medium mb-1"
          >
            Destination
          </label>

          <input
            type="text"
            name="destination"
            id="destination"
            placeholder="Search destination..."
            value={destinationQuery}
            onChange={(e) =>
              handleChange(e, setDestinationQuery)
            }
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* TITLE */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-sm font-medium mb-1"
          >
            Title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Search title..."
            value={titleQuery}
            onChange={(e) =>
              handleChange(e, setTitleQuery)
            }
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* STATUS */}
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-sm font-medium mb-1"
          >
            Status
          </label>

          <select
            name="status"
            id="status"
            value={statusQuery}
            onChange={(e) =>
              handleChange(e, setStatusQuery)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="completed">
              Completed
            </option>
            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      {/* CREATE BUTTON */}
      <Link to="/planners/create">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition duration-200">
          + Create Planner
        </button>
      </Link>
    </div>
  );
}

export default PlannerFilterBar;
import { NavLink } from "react-router-dom";

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
    <div className="filter-bar flex justify-between items-center mb-4 p-2 px-8 bg-gray-200 rounded">
      <div className="flex justify-start items-center space-x-8">
        <label htmlFor="title" className="flex items-center">
          <span className="mr-2">Title:</span>
          <select
            type="text"
            value={titleQuery}
            placeholder="Planner title..."
            onChange={(e) => handleChange(e, setTitleQuery)}
            className="p-1 rounded border"
          >
        
            <option value="">All</option>
            <option value="Summer Vacation Planner">
              Summer Vacation Planner
            </option>
            <option value="Family Reunion">Family Reunion</option>
            <option value="Startup Launch">Startup Launch</option>
            <option value="Graduation Preparation">
              Graduation Preparation
            </option>
            <option value="Fitness Challenge">Fitness Challenge</option>
            <option value="Trip to Paris">Trip to Paris</option>
          </select>
        </label>

        <label className="flex items-center">
          <span className="mr-2">Status:</span>
          <select
            value={statusQuery}
            onChange={(e) => handleChange(e, setStatusQuery)}
            className="p-1"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label htmlFor="destination" className="flex items-center">
          <span className="mr-2">Destination:</span>
          <select
            name="destination"
            id="destination"
            value={destinationQuery}
            onChange={(e) => handleChange(e, setDestinationQuery)}
            className="p-1"
          >
            <option value="">All</option>
            <option value="Berlin, Germany Dev">Berlin, Germany</option>
            <option value="Munich, Germany/UI">Munich, Germany</option>
            <option value="Paris, France">Paris, France</option>
          </select>
        </label>
      </div>

      {/* CREATE BUTTON */}
      <NavLink to="/planners/create" className="ml-auto">
        <button className="px-6 py-1 rounded bg-blue-600 text-white hover:bg-blue-500">
          Create Planner
        </button>
      </NavLink>
    </div>
  );
}

export default PlannerFilterBar;

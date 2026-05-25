import { Link } from "react-router-dom";

function PlannerFilterBar({
  destinationQuery,
  setDestinationQuery,
  programQuery,
  setProgramQuery,
  handleChange,
}) {
  return  (
    <div className="filter-bar flex justify-between items-center mb-4 p-2 px-8 bg-gray-200 rounded">
      <div className="flex justify-start items-center space-x-8">
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
            <option value="Nigeria">Nigeria</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Miami">Miami</option>
            <option value="Paris">Paris</option>
            <option value="Berlin">Berlin</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Vienna">Vienna</option>
          </select>
        </label>

        <label htmlFor="title" className="flex items-center">
          <span className="mr-2">Title:</span>
          <select
            name="title"
            id="title"
            value={programQuery}
            onChange={(e) => handleChange(e, setProgramQuery)}
            className="p-1"
          >
            <option value="">All</option>
            <option value="Trip to Paris">Trip to Paris</option>
            <option value="Fitness Challenge">Fitness Challenge</option>
            <option value="Graduation Preparation">Graduation Preparation</option>
            <option value="Startup Launch">Startup Launch</option>
            <option value="Family Reunion">Family Reunion</option>

          </select>
        </label>
      </div>

      <Link to="/planners/create" className="ml-auto">
        <button className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 px-6">Create</button>
      </Link>
    </div>
  );
}

export default PlannerFilterBar;

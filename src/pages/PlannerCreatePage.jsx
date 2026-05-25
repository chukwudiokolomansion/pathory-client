import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createPlannerSlug, convertSlugToName } from "../utils/index";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PLANNER_FORM_VALUES = {
  plannerSlug: "format-title-destination-startDate",
  plannerName: "",
  format: "",
  title: "",
  destination: "",
  startDate: "2030-01-01",
  endDate: "2030-01-01",
  inProgress: false,
  programManager: "",
  leadTeacher: "",
  totalHours: 0,
};

function PlannerCreatePage() {
  const [planner, setPlanner] = useState({ ...DEFAULT_PLANNER_FORM_VALUES });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const plannerSlug = createPlannerSlug({ ...planner, [name]: value });
    const plannerName = convertSlugToName(plannerSlug);

    setPlanner((prevPlanner) => ({
      ...prevPlanner,
      plannerSlug,
      plannerName,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...planner,
    };

    axios
      .post(`${API_URL}/api/planners`, requestBody)
      .then((response) => {
        const newPlanner = response.data;

        navigate(`/planners/details/${newPlanner._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="PlannerCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Create Planner
        </h3>

        <label
          htmlFor="plannerSlug"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Planner Id
        </label>
        <input
          type="text"
          name="plannerSlug"
          id="plannerSlug"
          value={planner.plannerSlug}
          onChange={handleChange}
          disabled
          className="border rounded p-2 w-full mb-6"
        />

        <label
          htmlFor="plannerName"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Planner Name
        </label>
        <input
          type="text"
          name="plannerName"
          id="plannerName"
          value={planner.plannerName}
          onChange={handleChange}
          disabled
          className="border rounded p-2 w-full mb-6"
        />

        <label
          htmlFor="format"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Format
        </label>
        <select
          name="format"
          id="format"
          value={planner.format}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6 bg-gray-50"
        >
          <option value="">-- Select Format --</option>
          <option value="Full day">Full day</option>
          <option value="Half day">Half day</option>
        </select>

        <label
          htmlFor="title"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Title
        </label>
        <select
          name="title"
          id="title"
          value={planner.title}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6 bg-gray-50"
        >
          <option value="">-- Select Title --</option>
          <option value="Trip to Paris">Trip to Paris</option>
          <option value="Fitness Challenge">Fitness Challenge</option>
          <option value="Graduation Preparation">Graduation Preparation</option>
          <option value="Startup Launch">Startup Launch</option>
          <option value="Family Reunion">Family Reunion</option>
        </select>

        <label
          htmlFor="destination"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Destination
        </label>
        <select
          name="destination"
          id="destination"
          value={planner.destination}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6 bg-gray-50"
        >
          <option value="">-- Select Destination --</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Miami">Miami</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Lisbon">Lisbon</option>
          <option value="Vienna">Vienna</option>
        </select>

        <label
          htmlFor="startDate"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Start Date:
        </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={planner.startDate}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6 bg-gray-50 h-10"
        />

        <label
          htmlFor="endDate"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          End Date:
        </label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={planner.endDate}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6 bg-gray-50 h-10"
        />

        <div className="flex items-center mt-6 mb-6">
          <label
            htmlFor="inProgress"
            className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
          >
            In Progress
          </label>
          <input
            type="checkbox"
            name="inProgress"
            id="inProgress"
            value={planner.inProgress}
            onChange={handleChange}
            className="-left-24 mt-2 relative leading-tight"
          />
        </div>

        <label
          htmlFor="programManager"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Title Manager
        </label>
        <input
          type="text"
          name="programManager"
          id="programManager"
          value={planner.programManager}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label
          htmlFor="leadTeacher"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Lead Teacher
        </label>
        <input
          type="text"
          name="leadTeacher"
          id="leadTeacher"
          value={planner.leadTeacher}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label
          htmlFor="totalHours"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Total Hours
        </label>
        <input
          type="number"
          name="totalHours"
          id="totalHours"
          value={planner.totalHours}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Create Planner
        </button>
      </form>
    </div>
  );
}

export default PlannerCreatePage;

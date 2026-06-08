import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/index.services";
import { createPlannerSlug, convertSlugToName } from "../utils/index";


const DEFAULT_PLANNER_FORM = {
  plannerSlug: "",
  plannerTitle: "",
  title: "",
  destination: "",
  startDate: "",
  endDate: "",
  status: "pending",
  inProgress: false,
};

function PlannerCreatePage() {

  const [planner, setPlanner] = useState(DEFAULT_PLANNER_FORM);
  const navigate = useNavigate();

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setPlanner((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();

      const requestBody = {
      ...planner,
    };


    service
      .post(`/planners`, requestBody)
      .then((res) => {
        const newPlanner = res.data;
        navigate(`/planners/details/${newPlanner._id}`);
      })
      .catch((err) => console.log(err));
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
          htmlFor="plannerTitle"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Planner Name
        </label>
        <input
          type="text"
          name="plannerTitle"
          id="plannerTitle"
          value={planner.plannerTitle}
          onChange={handleChange}
          disabled
          className="border rounded p-2 w-full mb-6"
        />

        <label
          htmlFor="format"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={planner.status}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6 bg-gray-50"
        >
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
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
          <option value="Munich">Munich</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
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
          <option value="Summer Vacation Planner">Summer Vacation Planner</option>
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
  checked={planner.inProgress}
  onChange={handleChange}
/>
        </div>

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
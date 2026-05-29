import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PLANNER_FORM = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  destination: "",
  status: "pending",
};

function PlannerCreatePage() {

  const [planner, setPlanner] = useState(DEFAULT_PLANNER_FORM);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/api/planners`, planner, {
        withCredentials: true,
      })
      .then((res) => {
        const newPlanner = res.data;
        navigate(`/planners/details/${newPlanner._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="PlannerCreatePage p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg">

      <h2 className="text-2xl font-bold mb-6">
        Create Planner
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={planner.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={planner.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* DESTINATION */}
        <div>
          <label className="block font-semibold">Destination</label>
          <input
            type="text"
            name="destination"
            value={planner.destination}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* START DATE */}
        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={planner.startDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* END DATE */}
        <div>
          <label className="block font-semibold">End Date</label>
          <input
            type="date"
            name="endDate"
            value={planner.endDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={planner.status}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Create Planner
        </button>

      </form>
    </div>
  );
}

export default PlannerCreatePage;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/index.services";

const DEFAULT_PLANNER_FORM = {
  activity: "",
  title: "",
  description: "",
  destination: "",
  startDate: "",
  endDate: "",
  status: "pending",
};

function PlannerCreatePage() {
  const navigate = useNavigate();

  const [planner, setPlanner] = useState(DEFAULT_PLANNER_FORM);
  const [activities, setActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await service.get("/activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setPlanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post("/planners", planner);

      navigate(`/planners/details/${response.data._id}`);
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.response?.data?.message || "Failed to create planner"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create Planner</h2>

      {errorMessage && (
        <p className="mb-4 text-red-500">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">
            Activity
          </label>
          <select
            name="activity"
            value={planner.activity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Activity</option>

            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={planner.title}
            onChange={handleChange}
            placeholder="Enter planner title"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={planner.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={planner.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={planner.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={planner.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Status
          </label>
          <select
            name="status"
            value={planner.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create Planner
        </button>
      </form>
    </div>
  );
}

export default PlannerCreatePage;
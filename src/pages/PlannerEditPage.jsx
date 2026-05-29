import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PLANNER = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  destination: "",
  status: "pending",
};

function PlannerEditPage() {

  const [planner, setPlanner] = useState(DEFAULT_PLANNER);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { plannerId } = useParams();
  const navigate = useNavigate();

  // FETCH PLANNER
  useEffect(() => {
    axios
      .get(`${API_URL}/api/planners/${plannerId}`)
      .then((res) => {
        const data = res.data;

        setPlanner({
          ...data,
          startDate: data.startDate?.split("T")[0],
          endDate: data.endDate?.split("T")[0],
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [plannerId]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE PLANNER
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/api/planners/${plannerId}`, planner)
      .then(() => navigate(`/planners/details/${plannerId}`))
      .catch((err) => console.log(err));
  };

  // DELETE PLANNER
  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/planners/${plannerId}`)
      .then(() => navigate("/planners"))
      .catch((err) => console.log(err));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="PlannerEditPage p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg relative">

      <h2 className="text-2xl font-bold mb-6">
        Edit Planner
      </h2>

      {/* DELETE CONFIRMATION */}
      {showDeleteConfirmation && (
        <div className="absolute top-10 left-10 bg-white border p-4 shadow-md rounded">

          <p className="mb-3">
            Are you sure you want to delete this planner?
          </p>

          <div className="flex gap-3">

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Yes
            </button>

            <button
              onClick={() => setShowDeleteConfirmation(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              No
            </button>

          </div>

        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          type="text"
          name="title"
          value={planner.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={planner.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
        />

        {/* DESTINATION */}
        <input
          type="text"
          name="destination"
          value={planner.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="border p-2 w-full rounded"
        />

        {/* START DATE */}
        <input
          type="date"
          name="startDate"
          value={planner.startDate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* END DATE */}
        <input
          type="date"
          name="endDate"
          value={planner.endDate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* STATUS */}
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

        {/* BUTTONS */}
        <div className="flex gap-4 pt-4">

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </form>
    </div>
  );
}

export default PlannerEditPage;
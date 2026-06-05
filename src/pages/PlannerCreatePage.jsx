import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/index.services";


const DEFAULT_PLANNER_FORM_VALUES = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  reminders: [],
  destination: "",
  status: "pending",
};

function PlannerCreatePage() {
  const navigate = useNavigate();

  // Planner form state
  const [planner, setPlanner] = useState({
    ...DEFAULT_PLANNER_FORM_VALUES,
  });

  // Reminder input state
  const [reminderInput, setReminderInput] =
    useState("");

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add reminder
  const addReminder = () => {
    if (!reminderInput) return;

    setPlanner((prev) => ({
      ...prev,
      reminders: [
        ...prev.reminders,
        reminderInput,
      ],
    }));

    setReminderInput("");
  };

  // Remove reminder
  const removeReminder = (indexToRemove) => {
    setPlanner((prev) => ({
      ...prev,
      reminders: prev.reminders.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        ...planner,
      };

      const response = await service.post(
        `planners`,
        requestBody,
        {
          withCredentials: true,
        }
      );

      const newPlanner = response.data;

      navigate(
        `/planners/details/${newPlanner._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PlannerCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto bg-white">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-4 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Create Planner
        </h3>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title">
            Title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            value={planner.title}
            onChange={handleChange}
            placeholder="Enter planner title"
            className="border rounded p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            name="description"
            id="description"
            value={planner.description}
            onChange={handleChange}
            placeholder="Enter planner description"
            className="border rounded p-2 min-h-[120px]"
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-1">
          <label htmlFor="destination">
            Destination
          </label>

          <input
            type="text"
            name="destination"
            id="destination"
            value={planner.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            className="border rounded p-2"
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="startDate">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            id="startDate"
            value={planner.startDate}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="endDate">
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            id="endDate"
            value={planner.endDate}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label htmlFor="status">
            Status
          </label>

          <select
            name="status"
            id="status"
            value={planner.status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="pending">
              Pending
            </option>

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

        {/* Reminders */}
        <div className="flex flex-col gap-2">
          <label>
            Reminders
          </label>

          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={reminderInput}
              onChange={(e) =>
                setReminderInput(e.target.value)
              }
              className="border rounded p-2 flex-1"
            />

            <button
              type="button"
              onClick={addReminder}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* Reminder List */}
          {planner.reminders.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {planner.reminders.map(
                (reminder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded p-2"
                  >
                    <span>
                      {new Date(
                        reminder
                      ).toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeReminder(index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create Planner
        </button>
      </form>
    </div>
  );
}

export default PlannerCreatePage;
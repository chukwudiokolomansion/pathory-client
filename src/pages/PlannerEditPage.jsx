import { useState, useEffect } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import service from "../services/index.services";

import { getFormattedDate } from "../utils";

const DEFAULT_PLANNER_FORM_VALUES = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  reminders: [],
  destination: "",
  status: "pending",
};

function PlannerEditPage() {
  const [planner, setPlanner] = useState({
    ...DEFAULT_PLANNER_FORM_VALUES,
  });

  const [loading, setLoading] =
    useState(true);

  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);

  const [reminderInput, setReminderInput] =
    useState("");

  const { plannerId } = useParams();

  const navigate = useNavigate();

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlanner((prevPlanner) => ({
      ...prevPlanner,
      [name]: value,
    }));
  };

  // Add reminder
  const addReminder = () => {
    if (!reminderInput) return;

    setPlanner((prevPlanner) => ({
      ...prevPlanner,
      reminders: [
        ...prevPlanner.reminders,
        reminderInput,
      ],
    }));

    setReminderInput("");
  };

  // Remove reminder
  const removeReminder = (
    reminderIndex
  ) => {
    setPlanner((prevPlanner) => ({
      ...prevPlanner,
      reminders:
        prevPlanner.reminders.filter(
          (_, index) =>
            index !== reminderIndex
        ),
    }));
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title: planner.title,
      description: planner.description,
      startDate: planner.startDate,
      endDate: planner.endDate,
      reminders: planner.reminders,
      destination: planner.destination,
      status: planner.status,
    };

    service
      .put(
        `/planners/${plannerId}`,
        requestBody,
        {
          withCredentials: true,
        }
      )
      .then(() =>
        navigate(
          `/planners/details/${plannerId}`
        )
      )
      .catch((error) =>
        console.log(error)
      );
  };

  // Delete planner
  const handleDelete = () => {
    service
      .delete(
        `planners/${planner._id}`,
        {
          withCredentials: true,
        }
      )
      .then(() =>
        navigate("/dashboard")
      )
      .catch((error) =>
        console.log(error)
      );
  };

  // Fetch planner
  useEffect(() => {
    const getPlanner = () => {
      service
        .get(
          `planners/${plannerId}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const onePlanner =
            response.data;

          setPlanner({
            ...onePlanner,

            startDate:
              getFormattedDate(
                onePlanner.startDate
              ),

            endDate:
              getFormattedDate(
                onePlanner.endDate
              ),
          });

          setLoading(false);
        })
        .catch((error) =>
          console.log(error)
        );
    };

    getPlanner();
  }, [plannerId]);

  if (loading) {
    return (
      <div className="p-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="PlannerEditPage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto bg-white">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">
        Edit Planner
      </h3>

      {/* DELETE MODAL */}
      {showDeleteConfirmation && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 bg-white flex flex-col justify-center items-center border border-gray-300 rounded-md p-6 shadow-lg z-20">
          <p className="mb-6 text-center">
            Are you sure you want to
            delete this planner?
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Yes
            </button>

            <button
              onClick={() =>
                setShowDeleteConfirmation(
                  false
                )
              }
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 mt-4"
      >
        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="font-semibold text-gray-700"
          >
            Title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            value={planner.title}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="font-semibold text-gray-700"
          >
            Description
          </label>

          <textarea
            name="description"
            id="description"
            value={planner.description}
            onChange={handleChange}
            className="border rounded p-2 min-h-[120px]"
          />
        </div>

        {/* DESTINATION */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="destination"
            className="font-semibold text-gray-700"
          >
            Destination
          </label>

          <input
            type="text"
            name="destination"
            id="destination"
            value={planner.destination}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>

        {/* STATUS */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="status"
            className="font-semibold text-gray-700"
          >
            Status
          </label>

          <select
            name="status"
            id="status"
            value={planner.status}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-50"
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

        {/* START DATE */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="startDate"
            className="font-semibold text-gray-700"
          >
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            id="startDate"
            value={planner.startDate}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-50"
            required
          />
        </div>

        {/* END DATE */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="endDate"
            className="font-semibold text-gray-700"
          >
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            id="endDate"
            value={planner.endDate}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-50"
            required
          />
        </div>

        {/* REMINDERS */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Reminders
          </label>

          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={reminderInput}
              onChange={(e) =>
                setReminderInput(
                  e.target.value
                )
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

          {/* REMINDER LIST */}
          {planner.reminders?.length >
            0 && (
            <div className="space-y-2 mt-2">
              {planner.reminders.map(
                (
                  reminder,
                  index
                ) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded p-2"
                  >
                    <span>
                      {new Date(
                        reminder
                      ).toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeReminder(
                          index
                        )
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

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Save Changes
          </button>

          <button
            disabled={loading}
            type="button"
            onClick={() =>
              setShowDeleteConfirmation(
                true
              )
            }
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Delete Planner
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlannerEditPage;
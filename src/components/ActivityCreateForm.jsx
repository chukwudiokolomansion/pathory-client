import { useState, useEffect } from "react";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_ACTIVITY_FORM_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  languages: [],
  title: "",
  background: "",
  image: "",
  planner: "",
};

function ActivityCreateForm({ plannerId, plannerName, callback, closeCallback }) {
  const [activity, setActivity] = useState({ ...DEFAULT_STUDENT_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...activity, planner: plannerId };

    setSubmitting(true);

    axios
      .post(`${API_URL}/api/activitys`, requestBody)
      .then(() => {
        // Reset the state to clear the inputs
        setActivity({ ...DEFAULT_ACTIVITY_FORM_VALUES, planner: plannerId });
        setSubmitting(false);
        callback();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setActivity({ ...DEFAULT_ACTIVITY_FORM_VALUES, planner: plannerId });
  }, [plannerId]);

  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    if (multiple && options) {
      inputValue = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          inputValue.push(options[i].value);
        }
      }
    }

    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    setActivity({ ...DEFAULT_ACTIVITY_FORM_VALUES });
  }, [plannerId]);

  return (
    <div className="AddActivity bg-white-100 p-8 pb-4 rounded-lg shadow-md flex flex-col h-[100vh] relative  w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-2 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-xl mt-4 mb-4 sticky left-0">Add Activity</h3>
        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={activity.firstName}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={activity.lastName}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={activity.email}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={activity.phone}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">LinkedIn URL:</label>
          <input
            type="url"
            name="linkedinUrl"
            value={activity.linkedinUrl}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Languages:</label>
          <select
            name="languages"
            value={activity.languages}
            onChange={handleChange}
            multiple
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Dutch">Dutch</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Title:</label>
          <select
            name="title"
            value={activity.title}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          >
            <option value="">-- Select a title --</option>
            <option value="Trip to Paris">Trip to Paris</option>
            <option value="Fitness Challenge">Fitness Challenge</option>
            <option value="Graduation Preparation">Graduation Preparation</option>
            <option value="Startup Launch">Startup Launch</option>
            <option value="Family Reunion">Family Reunion</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Background:</label>
          <textarea
            name="background"
            value={activity.background}
            onChange={handleChange}
            disabled={submitting}
            className="border p-2 rounded h-auto"
            rows="4"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Image:</label>
          <input
            type="text"
            name="image"
            value={activity.image}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Planner:</label>
          <select
            name="planner"
            value={plannerId}
            onChange={handleChange}
            disabled
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          >
            <option value={plannerId}>{plannerName}</option>
          </select>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="text-white w-20 px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Save
          </button>
          <button
            onClick={closeCallback}
            className="text-white mt-2 bg-red-500 hover:bg-red-600  w-20 px-4 py-2 rounded transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityCreateForm;

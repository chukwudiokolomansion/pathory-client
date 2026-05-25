import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

function ActivityEditPage() {
  const [activity, setActivity] = useState({ ...DEFAULT_ACTIVITY_FORM_VALUES });
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  
  const { activityId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...activity };

    setLoading(true);

    axios
      .put(`${API_URL}/api/activities/${activity._id}`, requestBody)
      .then(() => {
        navigate(`/activities/details/${activity._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/activities/${activity._id}`)
      .then(() => {
        navigate(`/planners/details/${activity.planner._id}`);
      })
      .catch((error) => console.log(error));
  };

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
    const getActivity = () => {
      axios
        .get(`${API_URL}/api/activities/${activityId}`)
        .then((response) => {
          const activityData = response.data;
          setActivity(activityData);
        })
        .catch((error) => console.log(error));
    };

    const getPlanners = () => {
      axios
        .get(`${API_URL}/api/planners`)
        .then((response) => {
          const plannerList = response.data;
          setPlanners(plannerList);
        })
        .catch((error) => console.log(error));
    };

    getActivity();
    getPlanners();
    setLoading(false);
  }, [activityId]);

  return (
    <div className="p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto bg-white">
    <h3 className="text-2xl font-semibold text-gray-700 mb-6">Edit Activity</h3>

    {showDeleteConfirmation && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="bg-black opacity-50 absolute w-full h-full"></div>

        <div className="bg-white w-96 p-6 rounded-lg z-10 shadow-xl relative">
            <p className="text-lg mb-6 text-gray-700 font-semibold">Are you sure you want to delete this acitivty?</p>
            
            <div className="flex justify-end space-x-4">
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition ease-in-out duration-150">Yes</button>
                <button onClick={() => setShowDeleteConfirmation(false)} className="bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 px-4 rounded-md transition ease-in-out duration-150">No</button>
            </div>
        </div>
    </div>
)}


    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-6 px-4">
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">First Name:</label>
        <input type="text" name="firstName" value={acitivty.firstName} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Last Name:</label>
        <input type="text" name="lastName" value={acitivty.lastName} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Email:</label>
        <input type="email" name="email" value={acitivty.email} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Phone:</label>
        <input type="tel" name="phone" value={acitivty.phone} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">LinkedIn URL:</label>
        <input type="url" name="linkedinUrl" value={acitivty.linkedinUrl} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Languages:</label>
        <select name="languages" value={acitivty.languages} onChange={handleChange} multiple className="border rounded p-2 w-full mb-6 bg-gray-50">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Dutch">Dutch</option>
          <option value="Other">Other</option>
        </select>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Title:</label>
        <select name="title" value={activity.title} onChange={handleChange} className="border rounded p-2 w-full mb-6 bg-gray-50">
          <option value="">-- Select a title --</option>
          <option value="Trip to Paris">Trip to Paris</option>
          <option value="Fitness Challenge">Fitness Challenge</option>
          <option value="Graduation Preparation">Graduation Preparation</option>
          <option value="Startup Launch">Startup Launch</option>
          <option value="Family Reunion">Family Reunion</option>
        </select>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Background:</label>
        <textarea type="text" name="background" value={activity.background} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Image:</label>
        <input type="text" name="image" value={acitivty.image} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Planner:</label>
        <select name="planner" value={acitivty.planner._id} onChange={handleChange} className="border rounded p-2 w-full mb-6 bg-gray-50">
        <option value="">-- Select a planner --</option>
          {Planners.map((planner) => (
            <option key={planner._id} value={planner._id}>
              {planner.plannerName}
            </option>
          ))}
        </select>

        <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out">Save</button>
        <button disabled={loading} type="button" onClick={()=> setShowDeleteConfirmation(true)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out">Delete</button>
    </form>
</div>
  );
}

export default ActivityEditPage;

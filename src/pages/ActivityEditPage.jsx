import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_ACTIVITY_FORM_VALUES = {
  title: "",
  aiDescription: "",
  activityType: "",
  coordinates: ["", ""], // [lat, lng]
  city: "",
  country: "",
  address: "",
  image: "",
  video: "",
  tag: "",
  weather: "",
};

function ActivityEditPage() {
  const [activity, setActivity] = useState(DEFAULT_ACTIVITY_FORM_VALUES);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { activityId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/activities/${activityId}`)
      .then((res) => {
        const data = res.data;

        setActivity({
          ...data,
          image: (data.image || []).join(", "),
          video: (data.video || []).join(", "),
          tag: (data.tag || []).join(", "),
          coordinates: data.coordinates || ["", ""],
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [activityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoordinateChange = (index, value) => {
    const updated = [...activity.coordinates];
    updated[index] = value;

    setActivity((prev) => ({
      ...prev,
      coordinates: updated,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...activity,
      image: activity.image ? activity.image.split(",").map((i) => i.trim()) : [],
      video: activity.video ? activity.video.split(",").map((v) => v.trim()) : [],
      tag: activity.tag ? activity.tag.split(",").map((t) => t.trim().toLowerCase()) : [],
      coordinates:
        activity.coordinates[0] && activity.coordinates[1]
          ? [Number(activity.coordinates[0]), Number(activity.coordinates[1])]
          : undefined,
    };

    axios
      .put(`${API_URL}/api/activities/${activityId}`, requestBody)
      .then(() => navigate(`/activities/${activityId}`))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/activities/${activityId}`)
      .then(() => navigate(`/activities`))
      .catch((err) => console.log(err));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg">

      <h2 className="text-2xl font-bold mb-6">Edit Activity</h2>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <p className="mb-4">Delete this activity?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mr-2">
              Yes
            </button>
            <button onClick={() => setShowDeleteConfirmation(false)} className="bg-gray-300 px-4 py-2">
              No
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">

        <input
          name="title"
          value={activity.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2"
        />

        <textarea
          name="aiDescription"
          value={activity.aiDescription}
          onChange={handleChange}
          placeholder="AI Description"
          className="border p-2"
        />

        <select
          name="activityType"
          value={activity.activityType}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select type</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="fitness">Fitness</option>
          <option value="study">Study</option>
          <option value="social">Social</option>
          <option value="adventure">Adventure</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>

        <div className="flex gap-2">
          <input
            placeholder="Latitude"
            value={activity.coordinates?.[0] || ""}
            onChange={(e) => handleCoordinateChange(0, e.target.value)}
            className="border p-2 w-full"
          />
          <input
            placeholder="Longitude"
            value={activity.coordinates?.[1] || ""}
            onChange={(e) => handleCoordinateChange(1, e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <input
          name="city"
          value={activity.city}
          onChange={handleChange}
          placeholder="City"
          className="border p-2"
        />

        <input
          name="country"
          value={activity.country}
          onChange={handleChange}
          placeholder="Country"
          className="border p-2"
        />

        <input
          name="address"
          value={activity.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2"
        />

        <input
          name="image"
          value={activity.image}
          onChange={handleChange}
          placeholder="Images (comma separated URLs)"
          className="border p-2"
        />

        <input
          name="video"
          value={activity.video}
          onChange={handleChange}
          placeholder="Videos (comma separated URLs)"
          className="border p-2"
        />

        <input
          name="tag"
          value={activity.tag}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="border p-2"
        />

        <input
          name="weather"
          value={activity.weather}
          onChange={handleChange}
          placeholder="Weather"
          className="border p-2"
        />

        <div className="flex gap-3 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Save
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-red-500 text-white px-4 py-2"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityEditPage;
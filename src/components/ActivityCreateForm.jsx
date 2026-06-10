import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/index.services";

const DEFAULT_ACTIVITY_FORM_VALUES = {
  title: "",
  aiDescription: "",
  activityType: "",

  location: {
    lat: "",
    lng: "",
    city: "",
    country: "",
    address: "",
  },

  image: "",
  video: "",
  tags: "",
  weather: "",
};

function ActivityCreateForm({
  plannerId,
  callback,
  closeCallback,
}) {
  const navigate = useNavigate();

  const [activity, setActivity] = useState(
    DEFAULT_ACTIVITY_FORM_VALUES
  );

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setActivity(DEFAULT_ACTIVITY_FORM_VALUES);
  }, [plannerId]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (
    ["lat", "lng", "city", "country", "address"].includes(
      name
    )
  ) {
    setActivity((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));

    return;
  }

  setActivity((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const requestBody = {
  title: activity.title,
  aiDescription: activity.aiDescription,
  activityType: activity.activityType,

  location: {
    lat: Number(activity.location.lat),
    lng: Number(activity.location.lng),
    city: activity.location.city,
    country: activity.location.country,
    address: activity.location.address,
  },

  image: activity.image
    ? [activity.image]
    : [],

  video: activity.video
    ? [activity.video]
    : [],

  tag: activity.tags
    ? activity.tags
        .split(",")
        .map((tag) => tag.trim())
    : [],

  weather: activity.weather,
};

      const response = await service.post(
        "/activities",
        requestBody
      );

      setActivity(DEFAULT_ACTIVITY_FORM_VALUES);

      callback?.();
      closeCallback?.();

      navigate(
        `/activities/details/${response.data._id}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 h-screen overflow-y-auto shadow-xl w-full max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Create Activity
        </h2>

        <button
          type="button"
          onClick={closeCallback}
          className="text-red-500 hover:text-red-700 text-xl"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={activity.title}
            onChange={handleChange}
            disabled={submitting}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>

          <textarea
            name="aiDescription"
            value={activity.aiDescription}
            onChange={handleChange}
            disabled={submitting}
            rows={4}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Activity Type */}
        <div>
          <label className="block mb-1 font-medium">
            Activity Type
          </label>

          <select
            name="activityType"
            value={activity.activityType}
            onChange={handleChange}
            disabled={submitting}
            required
            className="w-full border rounded p-2"
          >
            <option value="">
              Select type
            </option>
            <option value="travel">
              travel
            </option>
            <option value="food">
              food
            </option>
            <option value="fitness">
              fitness
            </option>
            <option value="study">
              study
            </option>
            <option value="social">
              social
            </option>
            <option value="adventure">
              adventure
            </option>
            <option value="work">
              work
            </option>
          </select>
        </div>

        {/* Location */}
        <div>
  <label className="block mb-1 font-medium">
    Latitude
  </label>

  <input
    type="number"
    step="any"
    name="lat"
    value={activity.location.lat}
    onChange={handleChange}
    required
    className="w-full border rounded p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Longitude
  </label>

  <input
    type="number"
    step="any"
    name="lng"
    value={activity.location.lng}
    onChange={handleChange}
    required
    className="w-full border rounded p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    City
  </label>

  <input
    type="text"
    name="city"
    value={activity.location.city}
    onChange={handleChange}
    className="w-full border rounded p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Country
  </label>

  <input
    type="text"
    name="country"
    value={activity.location.country}
    onChange={handleChange}
    className="w-full border rounded p-2"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Address
  </label>

  <input
    type="text"
    name="address"
    value={activity.location.address}
    onChange={handleChange}
    className="w-full border rounded p-2"
  />
</div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={activity.image}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block mb-1 font-medium">
            Video URL
          </label>

          <input
            type="text"
            name="video"
            value={activity.video}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">
            Tags
          </label>

          <input
            type="text"
            name="tags"
            value={activity.tags}
            onChange={handleChange}
            placeholder="travel, beach, summer"
            className="w-full border rounded p-2"
          />
        </div>

        {/* Weather */}
        <div>
          <label className="block mb-1 font-medium">
            Weather
          </label>

          <input
            type="text"
            name="weather"
            value={activity.weather}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {submitting
              ? "Saving..."
              : "Save Activity"}
          </button>

          <button
            type="button"
            onClick={closeCallback}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityCreateForm;
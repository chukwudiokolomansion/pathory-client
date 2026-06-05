import { useState, useEffect } from "react";
import service from "../services/index.services";

const DEFAULT_ACTIVITY_FORM_VALUES = {
  title: "",
  aiDescription: "",
  activityType: "",
  coordinates: "",
  city: "",
  country: "",
  address: "",
  image: "",
  video: "",
  tag: "",
  weather: "",
};

function ActivityCreateForm({
  plannerId,
  callback,
  closeCallback,
}) {
  const [activity, setActivity] = useState(
    DEFAULT_ACTIVITY_FORM_VALUES
  );

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setActivity(DEFAULT_ACTIVITY_FORM_VALUES);
  }, [plannerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
        ...activity,

        coordinates: activity.coordinates
          ? activity.coordinates
              .split(",")
              .map((coord) => Number(coord.trim()))
          : [],

        image: activity.image
          ? [activity.image]
          : [],

        video: activity.video
          ? [activity.video]
          : [],

        tag: activity.tag
          ? activity.tag
              .split(",")
              .map((t) => t.trim().toLowerCase())
          : [],

        planner: plannerId,
      };

      await service.post(
        `/activities`,
        requestBody
      );

      setActivity(DEFAULT_ACTIVITY_FORM_VALUES);

      callback();
    } catch (error) {
      console.log(error);
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
          onClick={closeCallback}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* TITLE */}
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
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>

          <textarea
            name="aiDescription"
            value={activity.aiDescription}
            onChange={handleChange}
            disabled={submitting}
            rows="4"
            className="w-full border rounded p-2"
          />
        </div>

        {/* ACTIVITY TYPE */}
        <div>
          <label className="block mb-1 font-medium">
            Activity Type
          </label>

          <select
            name="activityType"
            value={activity.activityType}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
            required
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
        </div>

        {/* COORDINATES */}
        <div>
          <label className="block mb-1 font-medium">
            Coordinates
          </label>

          <input
            type="text"
            name="coordinates"
            placeholder="52.5200, 13.4050"
            value={activity.coordinates}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* CITY */}
        <div>
          <label className="block mb-1 font-medium">
            City
          </label>

          <input
            type="text"
            name="city"
            value={activity.city}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* COUNTRY */}
        <div>
          <label className="block mb-1 font-medium">
            Country
          </label>

          <input
            type="text"
            name="country"
            value={activity.country}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block mb-1 font-medium">
            Address
          </label>

          <textarea
            name="address"
            value={activity.address}
            onChange={handleChange}
            disabled={submitting}
            rows="3"
            className="w-full border rounded p-2"
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block mb-1 font-medium">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={activity.image}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* VIDEO URL */}
        <div>
          <label className="block mb-1 font-medium">
            Video URL
          </label>

          <input
            type="text"
            name="video"
            value={activity.video}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="block mb-1 font-medium">
            Tags
          </label>

          <input
            type="text"
            name="tag"
            placeholder="travel, europe, summer"
            value={activity.tag}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* WEATHER */}
        <div>
          <label className="block mb-1 font-medium">
            Weather
          </label>

          <input
            type="text"
            name="weather"
            value={activity.weather}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border rounded p-2"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {submitting ? "Saving..." : "Save"}
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
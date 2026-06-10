import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/index.services";

const DEFAULT_ACTIVITY = {
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

function ActivityEditPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] =
    useState(DEFAULT_ACTIVITY);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await service.get(
          `/activities/${activityId}`
        );

        const data = response.data;

        setActivity({
          title: data.title || "",
          aiDescription:
            data.aiDescription || "",
          activityType:
            data.activityType || "",

          location: {
            lat: data.location?.lat || "",
            lng: data.location?.lng || "",
            city: data.location?.city || "",
            country:
              data.location?.country || "",
            address:
              data.location?.address || "",
          },

          image: data.image?.[0] || "",
          video: data.video?.[0] || "",

          tags:
            data.tag?.join(", ") || "",

          weather: data.weather || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getActivity();
  }, [activityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        "lat",
        "lng",
        "city",
        "country",
        "address",
      ].includes(name)
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

    try {
      const requestBody = {
        title: activity.title,
        aiDescription:
          activity.aiDescription,
        activityType:
          activity.activityType,

        location: {
          lat: Number(
            activity.location.lat
          ),
          lng: Number(
            activity.location.lng
          ),
          city: activity.location.city,
          country:
            activity.location.country,
          address:
            activity.location.address,
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
              .map((tag) =>
                tag.trim()
              )
          : [],

        weather: activity.weather,
      };

      await service.patch(
        `/activities/${activityId}`,
        requestBody
      );

      navigate(
        `/activities/details/${activityId}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading activity...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Activity
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="aiDescription"
          placeholder="Description"
          value={activity.aiDescription}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="activityType"
          value={activity.activityType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">
            Select Type
          </option>
          <option value="travel">
            Travel
          </option>
          <option value="food">
            Food
          </option>
          <option value="fitness">
            Fitness
          </option>
          <option value="study">
            Study
          </option>
          <option value="social">
            Social
          </option>
          <option value="adventure">
            Adventure
          </option>
          <option value="work">
            Work
          </option>
          <option value="other">
            Other
          </option>
        </select>

        <input
          type="number"
          step="any"
          name="lat"
          placeholder="Latitude"
          value={activity.location.lat}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          step="any"
          name="lng"
          placeholder="Longitude"
          value={activity.location.lng}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={activity.location.city}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={activity.location.country}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={activity.location.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={activity.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="video"
          placeholder="Video URL"
          value={activity.video}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="travel, beach, summer"
          value={activity.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="weather"
          placeholder="Weather"
          value={activity.weather}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ActivityEditPage;
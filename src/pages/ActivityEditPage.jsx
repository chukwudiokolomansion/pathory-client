import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/index.services";

const DEFAULT_ACTIVITY_FORM_VALUES = {
  title: "",
  aiDescription: "",
  activityType: "",
  coordinates: [],
  city: "",
  country: "",
  address: "",
  image: [],
  video: [],
  tag: [],
  weather: "",
};

function ActivityEditPage() {
  const { activityId } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState(
    DEFAULT_ACTIVITY_FORM_VALUES
  );

  const [loading, setLoading] =
    useState(true);

  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);

  // FETCH ACTIVITY
  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/activities/${activityId}`
        );

        setActivity(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getActivity();
  }, [activityId]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        ...activity,

        image:
          typeof activity.image === "string"
            ? [activity.image]
            : activity.image,

        video:
          typeof activity.video === "string"
            ? [activity.video]
            : activity.video,

        tag:
          typeof activity.tag === "string"
            ? activity.tag
                .split(",")
                .map((t) =>
                  t.trim().toLowerCase()
                )
            : activity.tag,
      };

      await service.put(
        `/activities/${activity._id}`,
        requestBody
      );

      navigate(
        `/activities/details/${activity._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE DELETE
  const handleDelete = async () => {
    try {
      await service.delete(
        `/activities/${activity._id}`
      );

      navigate("/activities");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Edit Activity
        </h1>

        {/* DELETE MODAL */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="bg-white rounded-xl p-6 w-96 z-10 shadow-xl">

              <h2 className="text-xl font-semibold mb-4">
                Delete Activity?
              </h2>

              <p className="text-gray-600 mb-6">
                Are you sure you want to
                permanently delete this
                activity?
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() =>
                    setShowDeleteConfirmation(
                      false
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={activity.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="aiDescription"
              value={
                activity.aiDescription
              }
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* ACTIVITY TYPE */}
          <div>
            <label className="block mb-2 font-medium">
              Activity Type
            </label>

            <select
              name="activityType"
              value={
                activity.activityType
              }
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Select type
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
          </div>

          {/* CITY + COUNTRY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={activity.city || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={
                  activity.country || ""
                }
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block mb-2 font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={
                activity.address || ""
              }
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* WEATHER */}
          <div>
            <label className="block mb-2 font-medium">
              Weather
            </label>

            <input
              type="text"
              name="weather"
              value={
                activity.weather || ""
              }
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block mb-2 font-medium">
              Tags
            </label>

            <input
              type="text"
              name="tag"
              value={
                Array.isArray(activity.tag)
                  ? activity.tag.join(", ")
                  : activity.tag || ""
              }
              onChange={handleChange}
              placeholder="travel, hiking, food"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={
                Array.isArray(
                  activity.image
                )
                  ? activity.image[0]
                  : activity.image || ""
              }
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* VIDEO */}
          <div>
            <label className="block mb-2 font-medium">
              Video URL
            </label>

            <input
              type="text"
              name="video"
              value={
                Array.isArray(
                  activity.video
                )
                  ? activity.video[0]
                  : activity.video || ""
              }
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() =>
                setShowDeleteConfirmation(
                  true
                )
              }
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
            >
              Delete Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityEditPage;
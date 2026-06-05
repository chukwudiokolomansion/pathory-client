import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/index.services";



const DEFAULT_ACTIVITY_FORM_VALUES = {
  title: "",
  aiDescription: "",
  activityType: "",
  city: "",
  country: "",
  address: "",
  video: "",
  tag: "",
  weather: "",
};

function ActivityCreatePage() {
  const navigate = useNavigate();

  // FORM STATE
  const [activity, setActivity] = useState(
    DEFAULT_ACTIVITY_FORM_VALUES
  );

  // IMAGE STATE
  const [imageUrl, setImageUrl] = useState("");

  const [isUploading, setIsUploading] =
    useState(false);

  // MAP STATE
  const [clickedPosition, setClickedPosition] =
    useState(null);

  const [center] = useState([52.52, 13.405]); // Berlin

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE IMAGE UPLOAD
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setIsUploading(true);

    const uploadData = new FormData();

    uploadData.append("image", file);

    try {
      const response = await service.post(`/upload`, uploadData);

      setImageUrl(response.data.imageUrl);

      setIsUploading(false);
    } catch (error) {
      console.log(error);

      setIsUploading(false);

      navigate("/error");
    }
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        ...activity,

        coordinates: clickedPosition
          ? [
              clickedPosition.lat,
              clickedPosition.lng,
            ]
          : [],

        image: imageUrl ? [imageUrl] : [],

        video: activity.video
          ? [activity.video]
          : [],

        tag: activity.tag
          ? activity.tag
              .split(",")
              .map((t) =>
                t.trim().toLowerCase()
              )
          : [],
      };

      const response = await axios.post(
        `${API_URL}/api/activities`,
        requestBody
      );

      const newActivity = response.data;

      navigate(
        `/activities/details/${newActivity._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">

        {/* MAP */}
        <div className="h-[400px]">

          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickMarker
              setClickedPosition={
                setClickedPosition
              }
            />

            {clickedPosition && (
              <Marker
                position={clickedPosition}
              />
            )}
          </MapContainer>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Activity
            </h1>

            <p className="text-gray-500 mt-1">
              Add a new activity to your
              planner
            </p>
          </div>

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
              placeholder="Activity title"
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
              value={activity.aiDescription}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-3"
              placeholder="Describe the activity..."
            />
          </div>

          {/* ACTIVITY TYPE */}
          <div>
            <label className="block mb-2 font-medium">
              Activity Type
            </label>

            <select
              name="activityType"
              value={activity.activityType}
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

          {/* LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={activity.city}
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
                value={activity.country}
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
              value={activity.address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* TAGS + WEATHER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Tags
              </label>

              <input
                type="text"
                name="tag"
                value={activity.tag}
                onChange={handleChange}
                placeholder="travel, summer, hiking"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Weather
              </label>

              <input
                type="text"
                name="weather"
                value={activity.weather}
                onChange={handleChange}
                placeholder="Sunny"
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* VIDEO URL */}
          <div>
            <label className="block mb-2 font-medium">
              Video URL
            </label>

            <input
              type="text"
              name="video"
              value={activity.video}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Image
            </label>

            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />

            {isUploading && (
              <p className="text-sm text-blue-500 mt-2">
                Uploading image...
              </p>
            )}

            {imageUrl && (
              <img
                src={imageUrl}
                alt="preview"
                className="w-48 mt-4 rounded-lg border"
              />
            )}
          </div>

          {/* COORDINATES */}
          {clickedPosition && (
            <div className="bg-gray-50 border rounded-lg p-4 text-sm">

              <p>
                <strong>Latitude:</strong>{" "}
                {clickedPosition.lat}
              </p>

              <p>
                <strong>Longitude:</strong>{" "}
                {clickedPosition.lng}
              </p>
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Create Activity
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivityCreatePage;
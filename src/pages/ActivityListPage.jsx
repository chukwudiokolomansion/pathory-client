import { useState, useEffect } from "react";
import service from "../services/index.services";



import ActivityCard from "../components/ActivityCard";



const DEFAULT_CENTER = [51.505, -0.09];

function ActivityListPage() {
  const [activities, setActivities] = useState([]);

  const [titleQuery, setTitleQuery] =
    useState("");

  const [categoryQuery, setCategoryQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // Handle filter changes
  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  };

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);

        // Build query params safely
        const params = new URLSearchParams();

        if (titleQuery) {
          params.append("title", titleQuery);
        }

        if (categoryQuery) {
          params.append(
            "category",
            categoryQuery
          );
        }

        const response = await service.get(
          `/activities?${params.toString()}`
        );

        setActivities(response.data);

        setError(null);
      } catch (err) {
        console.log(err);

        setError("Failed to load activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [titleQuery, categoryQuery]);

  return (
    <div className="ActivityListPage space-y-6">

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">

        {/* Search by title */}
        <input
          type="text"
          placeholder="Search by title..."
          value={titleQuery}
          onChange={(e) =>
            handleChange(e, setTitleQuery)
          }
          className="border rounded p-2 flex-1"
        />

        {/* Filter by category */}
        <select
          value={categoryQuery}
          onChange={(e) =>
            handleChange(e, setCategoryQuery)
          }
          className="border rounded p-2"
        >
          <option value="">
            All Categories
          </option>

          <option value="Outdoor">
            Outdoor
          </option>

          <option value="Fitness">
            Fitness
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Entertainment">
            Entertainment
          </option>
        </select>
      </div>

      {/* MAP */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={13}
          scrollWheelZoom={false}
          className="h-[400px] w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activities.map((activity) => {
            const coordinates =
              activity?.coordinates;

            // Skip invalid coordinates
            if (
              !coordinates ||
              coordinates.length !== 2
            ) {
              return null;
            }

            return (
              <Marker
                key={activity._id}
                position={coordinates}
              >
                <Popup>
                  <div className="space-y-2">

                    {/* Cloudinary Image */}
                    {activity.imageUrl && (
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="w-full h-24 object-cover rounded"
                      />
                    )}

                    <p>
                      <strong>
                        {activity.title}
                      </strong>
                    </p>

                    <p>
                      Category:{" "}
                      {activity.category}
                    </p>

                    <p>
                      Duration:{" "}
                      {activity.duration} hrs
                    </p>

                    <p>
                      Price: $
                      {activity.price}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* TABLE HEADER */}
      <div className="flex justify-between items-center p-3 font-bold border-b bg-gray-100 rounded">

        <span className="basis-1/4">
          Image
        </span>

        <span className="basis-1/4">
          Title
        </span>

        <span className="basis-[15%]">
          Category
        </span>

        <span className="basis-[15%]">
          Duration
        </span>

        <span className="basis-[15%]">
          Price
        </span>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center">
          Loading activities...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      {/* ACTIVITY LIST */}
      {!loading &&
        !error &&
        activities.map((activity, index) => (
          <ActivityCard
            key={activity._id}
            {...activity}
            className={
              index % 2 === 0
                ? "bg-white"
                : "bg-gray-100"
            }
          />
        ))}
    </div>
  );
}

export default ActivityListPage;
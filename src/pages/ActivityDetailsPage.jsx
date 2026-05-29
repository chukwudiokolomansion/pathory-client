import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";

const API_URL = import.meta.env.VITE_API_URL;

function ActivityDetailsPage() {

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const { activityId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/activities/${activityId}`)
      .then((res) => {
        setActivity(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [activityId]);

  if (loading) return <div>Loading...</div>;

  if (!activity) return <div>No activity found</div>;

  return (
    <div className="ActivityDetailsPage bg-gray-100 p-6">

      <div className="bg-white p-6 rounded-lg shadow-md">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-2">
          {activity.title}
        </h1>

        {/* AI DESCRIPTION */}
        {activity.aiDescription && (
          <p className="italic text-gray-600 mb-4">
            🤖 {activity.aiDescription}
          </p>
        )}

        {/* MAIN INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">

          <p><strong>Type:</strong> {activity.activityType}</p>

          <p>
            <strong>Location:</strong>{" "}
            {activity.city}, {activity.country}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {activity.address || "N/A"}
          </p>

          <p>
            <strong>Weather:</strong>{" "}
            {activity.weather || "N/A"}
          </p>

          <p>
            <strong>Coordinates:</strong>{" "}
            {activity.coordinates?.join(", ") || "N/A"}
          </p>

        </div>

        {/* TAGS */}
        {activity.tag?.length > 0 && (
          <div className="mt-4">
            <strong>Tags:</strong>
            <div className="flex gap-2 mt-1 flex-wrap">
              {activity.tag.map((t, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* MEDIA */}
        <div className="mt-6">

          {activity.image?.length > 0 && (
            <img
              src={activity.image[0] || placeholderImage}
              alt="activity"
              className="w-full h-64 object-cover rounded"
            />
          )}

          {activity.video?.length > 0 && (
            <video controls className="w-full mt-4 rounded">
              <source src={activity.video[0]} />
            </video>
          )}

        </div>

        {/* BACK BUTTON */}
        <div className="mt-6">
          <Link to="/activities">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Back to Activities
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ActivityDetailsPage;
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import service from "../services/index.services";
import ActivityCard from "../components/ActivityCard";
import { BiEdit, BiTrash } from "react-icons/bi";

function ActivityListPage() {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    service
      .get("/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!activities) {
    return (
      <div className="loader-container">
        <HashLoader color="#8b5cf6" size={80} />
      </div>
    );
  }
  const handleDelete = async (activityId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirmed) return;

    try {
      await service.delete(`/activities/${activityId}`);

      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity._id !== activityId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="activity-dashboard">
      {/* HERO */}
      <div className="activity-hero">
        <div>
          <h1>Discover Activities</h1>

          <Link to="/activities/create">
            <button className="dashboard-create-btn">+ Create Activity</button>
          </Link>

          <p>
            Explore experiences, destinations and moments to add to your
            journey.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="activity-stats">
        <div className="activity-stat-card">
          <h3>{activities.length}</h3>
          <p>Total Activities</p>
        </div>

        <div className="activity-stat-card">
          <h3>
            {new Set(activities.map((activity) => activity.country)).size}
          </h3>
          <p>Countries</p>
        </div>

        <div className="activity-stat-card">
          <h3>{new Set(activities.map((activity) => activity.city)).size}</h3>
          <p>Cities</p>
        </div>
      </div>

      {/* ACTIVITIES GRID */}

      <div className="activity-grid">
        {activities.map((activity) => (
          <div key={activity._id} className="bg-white rounded-lg shadow p-4">
            <ActivityCard {...activity} />
                 
            <div className="flex gap-2 mt-4">
              <Link to={`/activities/details/${activity._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  View
                </button>
              </Link>

              <Link to={`/activities/edit/${activity._id}`}>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1">
                  <BiEdit />
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(activity._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <BiTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityListPage;

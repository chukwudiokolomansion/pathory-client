import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";

import service from "../services/index.services";
import ActivityCard from "../components/ActivityCard";

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

  return (
    <div className="activity-dashboard">
      {/* HERO */}
      <div className="activity-hero">
        <div>
          <h1>Discover Activities</h1>

          <p>
            Explore experiences, destinations and moments
            to add to your journey.
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
            {
              new Set(
                activities.map(
                  (activity) => activity.country
                )
              ).size
            }
          </h3>
          <p>Countries</p>
        </div>

        <div className="activity-stat-card">
          <h3>
            {
              new Set(
                activities.map(
                  (activity) => activity.city
                )
              ).size
            }
          </h3>
          <p>Cities</p>
        </div>
      </div>

      {/* ACTIVITIES GRID */}
      <div className="activity-grid">
        {activities.map((activity) => (
          <ActivityCard
            key={activity._id}
            {...activity}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityListPage;
import { Link } from "react-router-dom";

function ActivityCard(activity) {
  return (
    <Link to={`/activities/${activity._id}`}>
      <div className="activity-card">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="activity-image"
        />

        <div className="activity-content">
          <h3>{activity.title}</h3>

          <p className="activity-type">
            {activity.type}
          </p>

          <p>
            📍 {activity.city}, {activity.country}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCard;
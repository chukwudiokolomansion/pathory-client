import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/index.services";

function ActivityDetailsPage() {
  const { activityId } = useParams();

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await service.get(
          `/activities/${activityId}`
        );

        setActivity(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getActivity();
  }, [activityId]);

  if (!activity) return <p>Loading...</p>;

  return (
    <div>
      <h1>{activity.title}</h1>

      <p>{activity.aiDescription}</p>

      <p>{activity.location}</p>

      {activity.image && (
        <img
          src={activity.image}
          alt={activity.title}
        />
      )}
    </div>
  );
}

export default ActivityDetailsPage;
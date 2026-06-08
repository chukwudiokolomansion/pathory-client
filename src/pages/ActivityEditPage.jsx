import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/index.services";

function ActivityEditPage() {
  const { activityId } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    title: "",
    aiDescription: "",
    activityType: "",
    location: "",
    image: "",
    video: "",
    tags: "",
    weather: "",
  });

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

  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.patch(
        `/activities/${activityId}`,
        activity
      );

      navigate(
        `/activities/details/${activityId}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={activity.title}
        onChange={handleChange}
      />

      <button type="submit">
        Save Changes
      </button>
    </form>
  );
}

export default ActivityEditPage;
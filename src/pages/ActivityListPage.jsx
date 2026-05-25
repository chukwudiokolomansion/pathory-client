import { useState, useEffect } from "react";
import axios from "axios";

import ActivityCard from "../components/ActivityCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function ActivityListPage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/activities?$`)
      .then((response) => {
        setActivities(response.data)})
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ActivityListPage">
      <div className="flex justify-between items-center p-2 font-bold border-b">
        <span className="flex items-center justify-center" style={{ flexBasis: "20%" }}>Image</span>
        <span style={{ flexBasis: "20%" }}>Name</span>
        <span style={{ flexBasis: "20%" }}>Title</span>
        <span style={{ flexBasis: "20%" }}>Email</span>
        <span style={{ flexBasis: "20%" }}>Phone</span>
      </div>

      {activities && activities.map((activity, index) => (
          <ActivityCard key={activity._id} {...activity} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"} />
      ))}
    </div>
  );
}

export default ActivityListPage;

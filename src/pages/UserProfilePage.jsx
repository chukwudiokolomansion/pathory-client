import { useEffect, useState, useContext } from "react";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function UserProfilePage() {

  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [planners, setPlanners] = useState([]);
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token || !user?._id) {
      setErrorMessage("User not logged in");
      return;
    }

    // FETCH USER PROFILE
    axios
      .get(`${API_URL}/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));

    // FETCH USER PLANNERS
    axios
      .get(`${API_URL}/api/planners/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlanners(res.data))
      .catch((err) => console.log(err));

    // FETCH USER ACTIVITIES
    axios
      .get(`${API_URL}/api/activities/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, [user?._id]);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="UserProfilePage bg-gray-100 p-6">

      {/* PROFILE HEADER */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 flex items-center gap-4">

        <img
          src={placeholderImage}
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h1 className="text-2xl font-bold">
            {profile?.name}
          </h1>

          <p className="text-gray-600">
            {profile?.email}
          </p>
        </div>

      </div>

      {/* PLANNERS SECTION */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h2 className="text-xl font-bold mb-4">
          📅 My Planners
        </h2>

        {planners.length === 0 && (
          <p>No planners yet</p>
        )}

        {planners.map((planner) => (
          <div key={planner._id} className="border-b py-2">

            <p className="font-semibold">
              {planner.title}
            </p>

            <p className="text-sm text-gray-500">
              {planner.destination} • {planner.status}
            </p>

          </div>
        ))}

      </div>

      {/* ACTIVITIES SECTION */}
      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-4">
          📍 My Activities
        </h2>

        {activities.length === 0 && (
          <p>No activities yet</p>
        )}

        {activities.map((activity) => (
          <div key={activity._id} className="border-b py-3">

            <p className="font-semibold">
              {activity.title}
            </p>

            <p className="text-sm text-gray-600">
              {activity.activityType} • {activity.city}, {activity.country}
            </p>

            {activity.aiDescription && (
              <p className="text-sm italic text-gray-500 mt-1">
                “{activity.aiDescription}”
              </p>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default UserProfilePage;
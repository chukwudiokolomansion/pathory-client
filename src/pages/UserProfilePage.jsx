import { useEffect, useState, useContext } from "react";
import service from "../services/index.services";
import placeholderImage from "./../assets/placeholder.png";
import { AuthContext } from "../context/auth.context";

import ActivityListPage from "./ActivityListPage";
import PlannerListPage from "./PlannerListPage";


function UserProfilePage() {
  const { user } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?._id) return;

   

      try {
        const response = await service.get(
          `/users/${user._id}`,
         
        );

        setUserProfile(response.data);
      } catch (err) {
        setErrorMessage("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (errorMessage) return <div className="p-6 text-red-500">{errorMessage}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={placeholderImage}
            className="w-16 h-16 rounded-full object-cover border"
            alt="profile"
          />

          <div>
            <h1 className="text-xl font-bold">
              Welcome, {userProfile?.name}
            </h1>
            <p className="text-gray-500">{userProfile?.email}</p>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Planners</h2>
          <p className="text-2xl font-bold">Your planning space</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Activities</h2>
          <p className="text-2xl font-bold">Your activity hub</p>
        </div>

      </div>

      {/* MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PLANNERS */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Your Planners</h2>
          </div>
          <PlannerListPage />
        </div>

        {/* ACTIVITIES */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Your Activities</h2>
          </div>
          <ActivityListPage />
        </div>

      </div>

    </div>
  );
}

export default UserProfilePage;
import { useState, useEffect, useCallback } from "react";
import { useParams, NavLink } from "react-router-dom";
import service from "../services/index.services";

import ActivityCard from "../components/ActivityCard";
import ActivityCreateForm from "../components/ActivityCreateForm";
import { HashLoader } from "react-spinners";


function PlannerDetailsPage() {

  const [planner, setPlanner] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDrawer, setShowDrawer] = useState(false);

  const { plannerId } = useParams();

  // GET PLANNER

useEffect(() => {
  const getPlanner = async () => {
    try {
      const response = await service.get(
        `/planners/${plannerId}`
      );

      setPlanner(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  getPlanner();
}, [plannerId]);
  /*const getPlanner = useCallback(() => {
    service
      .get(`/planners/${plannerId}`)
      .then((response) => {
        setPlanner(response.data);
      })
      .catch((err) => console.log(err));
  }, [plannerId]);

  // GET ACTIVITIES INSIDE PLANNER
  const getActivities = useCallback(() => {
    service
      .get(`/activities?plannerId=${plannerId}`)
      .then((res) => {
        setActivities(res.data);
      })
      .catch((err) => console.log(err));
  }, [plannerId]);

  useEffect(() => {
    getPlanner();
    getActivities();
    setLoading(false);
  }, [getPlanner, getActivities]);*/

  return (
    <div className="PlannerDetails bg-gray-100 py-6 px-4">

      {/* DRAWER (ADD ACTIVITY) */}
      <div
        className={`drawer transition-transform transform ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        } fixed right-0 top-0 h-full bg-white shadow-md z-10`}
      >
        {planner && showDrawer && (
          <ActivityCreateForm
            plannerId={planner._id}
            callback={() => {
              setShowDrawer(false);
              getActivities();
            }}
            closeCallback={() => setShowDrawer(false)}
          />
        )}
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`bg-gray-100 py-6 px-4 ${
          showDrawer ? "opacity-30 pointer-events-none" : ""
        }`}
      >

        {/* PLANNER DETAILS */}
        <div className="bg-white p-8 px-24 rounded-lg shadow-md mb-6">

          {planner && (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                {planner.title}
              </h1>

              <div className="grid grid-cols-2 gap-6 mb-4 border-b pb-4">

                {/* LEFT SIDE */}
                <div className="text-left pr-4 border-r">

                  <p className="mb-2 border-b pb-2">
                    <strong>Destination:</strong> {planner.destination || "—"}
                  </p>

                  <p className="mb-2 border-b pb-2">
                    <strong>Start Date:</strong>{" "}
                    {new Date(planner.startDate).toLocaleDateString()}
                  </p>

                  <p className="mb-2 border-b pb-2">
                    <strong>End Date:</strong>{" "}
                    {new Date(planner.endDate).toLocaleDateString()}
                  </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="text-left pl-4">

                  <p className="mb-2 border-b pb-2">
                    <strong>Status:</strong> {planner.status}
                  </p>

                  <p className="mb-2 border-b pb-2">
                    <strong>Description:</strong>{" "}
                    {planner.description || "No description"}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col items-center gap-2 mt-6 w-2/3 mx-auto">

                <NavLink to= "/planners/edit/:plannerId" className="w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-full rounded">
                    Edit Planner
                  </button>
                </NavLink>

                <NavLink to= "/activities/create" className="w-full">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded"
                  onClick={() => setShowDrawer(true)}
                >
                  Add Activity (Memory)
                </button>
                </NavLink>

              </div>

            </>
          )}

        </div>

        {/* ACTIVITIES LIST */}
        <h2 className="text-xl mb-4">Activities (Memories)</h2>

        {loading && <div><div className="profile-loader">
        <HashLoader color="#8b5cf6" size={80} />
      </div></div>}

        {activities &&
          activities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}

      </div>
    </div>
  );
}

export default PlannerDetailsPage;
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import ActivityCreateForm from "../components/ActivityCreateForm";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function PlannerDetailsPage() {
  const [planner, setPlanner] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDrawer, setShowDrawer] = useState(false);

  const { plannerId } = useParams();

  const getPlanner = useCallback(() => {
    axios
      .get(`${API_URL}/api/planners/${plannerId}`)
      .then((response) => {
        const onePlanner = response.data;
        setPlanner(onePlanner);
      })
      .catch((error) => console.log(error));
  }, [plannerId]);

  const getActivities = useCallback(() => {
    axios
      .get(`${API_URL}/api/Activities/planner/${plannerId}`)
      .then((response) => {
        const allPlanners = response.data;
        setActivities(allActivities);
      })
      .catch((error) => console.log(error));
  }, [plannerId]);

  useEffect(() => {
    getPlanner();
    getActivities();
    setLoading(false);
  }, [plannerId, getPlanner, getActivities]);

  return (
    <div className={`PlannerDetails bg-gray-100 py-6 px-4`}>
      {/* Drawer */}
      <div
className={`drawer transition-transform transform ${
       showDrawer ? "translate-x-0" : "translate-x-full"
     } fixed right-0 top-0 h-full bg-white shadow-md z-10`}
      >
        {planner && showDrawer && (
          <ActivityCreateForm
            plannerId={planner._id}
            plannerName={planner.plannerName}
            callback={() => {
              setShowDrawer(false);
              getActivities();
            }}
            closeCallback={() => setShowDrawer(false)}
          />
        )}
      </div>


      <div
        className={`PlannerDetails bg-gray-100 py-6 px-4 ${
          showDrawer ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        {/* Planner details */}
        <div className="bg-white p-8  px-24 rounded-lg shadow-md mb-6">
          {planner && (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                {planner.plannerName}
              </h1>
              <br />

              <div className="grid grid-cols-2 gap-6 mb-4 border-b pb-4">
                <div className="text-left pr-4 border-r">
                  <p className="mb-2 border-b pb-2">
                    <strong>Title:</strong> {planner.title}
                  </p>
                  <p className="mb-2 border-b pb-2">
                    <strong>Destination:</strong> {planner.destination}
                  </p>
                  <p className="mb-2 border-b pb-2">
                    <strong>Start Date:</strong> {planner.startDate}
                  </p>
                  <p className="mb-2 border-b pb-2">
                    <strong>End Date:</strong> {planner.endDate}
                  </p>
                </div>
                <div className="text-left pl-4">
                  <p className="mb-2 border-b pb-2">
                    <strong>Status:</strong>{" "}
                    {planner.inProgress ? "In Progress" : "Not Started"}
                  </p>
                  <p className="mb-2 border-b pb-2">
                    <strong>Total Hours:</strong> {planner.totalHours}
                  </p>
                  <p className="mb-2 border-b pb-2">
                    <strong>Title Manager:</strong> {planner.programManager}
                  </p>
                  <p className="mb-2 border-b pb-2">
                    <strong>Lead Teacher:</strong> {planner.leadTeacher}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mt-6 w-2/3 mx-auto">
                <Link to={`/planners/edit/${plannerId}`} className="w-full">
                  <button
                    disabled={showDrawer}
                    className={`transition duration-300 ease-in-out text-white px-4 py-2 w-full rounded ${
                      showDrawer
                        ? "bg-gray-500 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Edit Planner
                  </button>
                </Link>
                <button
                  disabled={showDrawer}
                  className={`transition duration-300 ease-in-out text-white px-4 py-2 w-full rounded hover:bg-blue-600 ${
                    showDrawer
                      ? "bg-gray-500 hover:bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => setShowDrawer(true)}
                >
                  Add Activity
                </button>
              </div>
            </>
          )}
        </div>

        <h2 className="text-xl mb-4">Activities</h2>

        {loading && <div>Loading...</div>}

        {activitys &&
          activities.map((activity) => (
            <ActivityCard key={activity._id} {...activity} />
          ))}
      </div>
    </div>
  );
}

export default PlannerDetailsPage;

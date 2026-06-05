import {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import service from "../services/index.services";

import ActivityCard from "../components/ActivityCard";
import ActivityCreateForm from "../components/ActivityCreateForm";

const API_URL = import.meta.env.VITE_API_URL;

function PlannerDetailsPage() {
  const { plannerId } = useParams();

  const [planner, setPlanner] = useState(null);

  const [activities, setActivities] = useState(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [showDrawer, setShowDrawer] =
    useState(false);

  // Fetch planner
  const getPlanner = useCallback(async () => {
    try {
      const res = await service.get(
        `/planners/${plannerId}`,
        {
          withCredentials: true,
        }
      );

      setPlanner(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [plannerId]);

  // Fetch activities
  const getActivities = useCallback(async () => {
    try {
      const res = await service.get(
        `/activities/planner/${plannerId}`,
        {
          withCredentials: true,
        }
      );

      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [plannerId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await Promise.all([
        getPlanner(),
        getActivities(),
      ]);

      setLoading(false);
    };

    fetchData();
  }, [getPlanner, getActivities]);

  // Format date helper
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  // Status badge styling
  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "in-progress":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 relative">
      {/* DRAWER */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-md transform transition-transform z-20 ${
          showDrawer
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {planner && (
          <ActivityCreateForm
            plannerId={planner._id}
            plannerTitle={planner.title}
            callback={() => {
              setShowDrawer(false);

              getActivities();
            }}
            closeCallback={() =>
              setShowDrawer(false)
            }
          />
        )}
      </div>

      {/* MAIN CONTENT */}
      <div
        className={
          showDrawer
            ? "opacity-30 pointer-events-none"
            : ""
        }
      >
        {/* PLANNER INFO */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              {planner?.title}
            </h1>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyles(
                planner?.status
              )}`}
            >
              {planner?.status}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <h2 className="font-semibold text-gray-700 mb-2">
              Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {planner?.description ||
                "No description provided."}
            </p>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p>
                <strong>
                  Destination:
                </strong>{" "}
                {planner?.destination ||
                  "N/A"}
              </p>

              <p>
                <strong>
                  Start Date:
                </strong>{" "}
                {formatDate(
                  planner?.startDate
                )}
              </p>

              <p>
                <strong>
                  End Date:
                </strong>{" "}
                {formatDate(
                  planner?.endDate
                )}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <strong>
                  Reminders:
                </strong>

                {planner?.reminders
                  ?.length > 0 ? (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {planner.reminders.map(
                      (
                        reminder,
                        index
                      ) => (
                        <li key={index}>
                          {new Date(
                            reminder
                          ).toLocaleString()}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-1">
                    No reminders set.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 mt-8 w-full md:w-1/2 mx-auto">
            <Link
              to={`/planners/edit/${plannerId}`}
            >
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Edit Planner
              </button>
            </Link>

            <button
              onClick={() =>
                setShowDrawer(true)
              }
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Add Activity
            </button>
          </div>
        </div>

        {/* ACTIVITIES */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Activities
          </h2>

          {activities.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center text-gray-500 shadow-sm">
              No activities yet.
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity._id}
                  {...activity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlannerDetailsPage;
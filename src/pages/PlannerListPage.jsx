import { useState, useEffect } from "react";
import service from "../services/index.services";

import PlannerFilterBar from "../components/PlannerFilterBar";
import PlannerCard from "../components/PlannerCard";


function PlannerListPage() {
  const [planners, setPlanners] =
    useState([]);

  const [destinationQuery, setDestinationQuery] =
    useState("");

  const [titleQuery, setTitleQuery] =
    useState("");

  const [statusQuery, setStatusQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // Handle filter changes
  const handleChange = (
    event,
    updateState
  ) => {
    updateState(event.target.value);
  };

  // Fetch planners
  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        setLoading(true);

        // Build query params
        const params =
          new URLSearchParams();

        if (destinationQuery) {
          params.append(
            "destination",
            destinationQuery
          );
        }

        if (titleQuery) {
          params.append(
            "title",
            titleQuery
          );
        }

        if (statusQuery) {
          params.append(
            "status",
            statusQuery
          );
        }

        const response =
          await service.get(
            `/planners?${params.toString()}`,
            {
              withCredentials: true,
            }
          );

        setPlanners(response.data);

        setError(null);
      } catch (err) {
        console.log(err);

        setError(
          "Failed to load planners."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlanners();
  }, [
    destinationQuery,
    titleQuery,
    statusQuery,
  ]);

  return (
    <div className="PlannerListPage space-y-6 p-4">
      {/* FILTER BAR */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4">
        {/* Existing Filter Bar */}
        <PlannerFilterBar
          destinationQuery={
            destinationQuery
          }
          setDestinationQuery={
            setDestinationQuery
          }
          titleQuery={titleQuery}
          setTitleQuery={
            setTitleQuery
          }
          handleChange={
            handleChange
          }
        />

        {/* STATUS FILTER */}
        <div className="flex flex-col gap-1 min-w-[180px]">
          <label className="text-sm font-semibold text-gray-700">
            Status
          </label>

          <select
            value={statusQuery}
            onChange={(e) =>
              setStatusQuery(
                e.target.value
              )
            }
            className="border rounded p-2"
          >
            <option value="">
              All Statuses
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="hidden md:flex justify-between items-center p-4 font-bold border-b bg-gray-100 rounded text-sm">
        <span className="basis-1/4">
          Title
        </span>

        <span className="basis-1/4">
          Destination
        </span>

        <span className="basis-[15%]">
          Status
        </span>

        <span className="basis-[15%]">
          Start Date
        </span>

        <span className="basis-[15%]">
          End Date
        </span>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center py-10">
          Loading planners...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500 py-10">
          {error}
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading &&
        !error &&
        planners.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            No planners found.
          </div>
        )}

      {/* PLANNER LIST */}
      {!loading &&
        !error &&
        planners.length > 0 && (
          <div className="space-y-3">
            {Array.isArray(planners) &&
              planners.map((planner, index) => (
                <PlannerCard
                  key={planner._id}
                  {...planner}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } rounded-lg shadow-sm`}
                />
              ))}
          </div>
        )}
    </div>
  );
}

export default PlannerListPage;
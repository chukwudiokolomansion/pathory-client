import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { HashLoader } from "react-spinners";

import PlannerFilterBar from "../components/PlannerFilterBar";
import service from "../services/index.services";

function PlannerListPage() {
  const [allPlanners, setAllPlanners] = useState([]);
  const [filteredPlanners, setFilteredPlanners] = useState([]);
  const [welcomeUser, setWelcomeUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plannerRes, userRes] = await Promise.all([
          service.get("/planners"),
          service.get("/auth/verify"),
        ]);

        setAllPlanners(plannerRes.data);
        setFilteredPlanners(plannerRes.data);

        setWelcomeUser(
          userRes.data.payload || userRes.data.user || userRes.data,
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";

    return "Good evening";
  }, []);

  const stats = useMemo(() => {
    return {
      total: allPlanners.length,
      active: allPlanners.filter((plan) => plan.status === "Active").length,
      completed: allPlanners.filter((plan) => plan.status === "Completed")
        .length,
      destinations: new Set(allPlanners.map((plan) => plan.destination)).size,
    };
  }, [allPlanners]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loader-container">
        <HashLoader color="#ff6b35" size={90} />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
  const handleDelete = async (plannerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this planner?",
    );

    if (!confirmed) return;

    try {
      await service.delete(`/planners/${plannerId}`);

      setAllPlanners((prev) =>
        prev.filter((planner) => planner._id !== plannerId),
      );

      setFilteredPlanners((prev) =>
        prev.filter((planner) => planner._id !== plannerId),
      );
    } catch (error) {
      console.error("Error deleting planner:", error);
    }
  };
  return (
    <div className="planner-dashboard">
      {/* HERO */}
      <div className="dashboard-hero">
        <div>
          <h1>
            {greeting}
            {welcomeUser?.username && `, ${welcomeUser.username}`}
          </h1>

          <p>Manage your journeys, memories, and destinations.</p>
        </div>

        <Link to="/planner/create">
          <button className="create-btn">+ Create Plan</button>
        </Link>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Plans</p>
        </div>

        <div className="stat-card">
          <h3>{stats.active}</h3>
          <p>Active Plans</p>
        </div>

        <div className="stat-card">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h3>{stats.destinations}</h3>
          <p>Destinations</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="search-section">
        <PlannerFilterBar
          allPlanners={allPlanners}
          setFilteredPlanners={setFilteredPlanners}
        />
      </div>

      {/* EMPTY STATE */}
      {filteredPlanners.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold">No planners found</h3>
          <p className="text-gray-500 mt-2">
            Create your first planner to get started.
          </p>
        </div>
      ) : (
        <div className="planner-grid">
          {filteredPlanners.map((plan) => (
            <div key={plan._id} className="planner-card">
              <div className="planner-card-header">
                <h3>{plan.title}</h3>

                <span className="status-pill">{plan.status}</span>
              </div>

              <div className="planner-content">
                <p>📍 {plan.destination || "N/A"}</p>
                <p>📅 {formatDate(plan.startDate)}</p>
                <p>🏁 {formatDate(plan.endDate)}</p>
              </div>

              <div className="planner-actions flex gap-2">
                <Link to={`/planners/details/${plan._id}`}>
                  <button className="view-btn">View</button>
                </Link>

                <Link to={`/dashboard/planners/${plan._id}`}>
                  <button className="edit-btn flex items-center gap-1">
                    <BiEdit />
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(plan._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-1"
                >
                  <BiTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlannerListPage;

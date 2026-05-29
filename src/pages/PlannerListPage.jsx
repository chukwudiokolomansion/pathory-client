import { useState, useEffect } from "react";
import axios from "axios";
import PlannerCard from "../components/PlannerCard";

const API_URL = import.meta.env.VITE_API_URL;

function PlannerListPage() {
  const [planners, setPlanners] = useState([]);
  const [statusQuery, setStatusQuery] = useState("");

  useEffect(() => {
    let queryString = "";
    if (statusQuery) queryString += `status=${statusQuery}`;

    axios
      .get(`${API_URL}/api/planners?${queryString}`)
      .then((response) => {
        setPlanners(response.data);
      })
      .catch((error) => console.log(error));
  }, [statusQuery]);

  const getAllPlanners = () => {
    axios
      .get(`${API_URL}/api/planners`)
      .then((response) => {
        setPlanners(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPlanners();
  }, []);

  return (
    <div className="PlannerListPage">

      {/* Simple filter (based on your schema) */}
      <div className="flex items-center gap-4 p-4 border-b">
        <label className="font-bold">Status:</label>

        <select
          value={statusQuery}
          onChange={(e) => setStatusQuery(e.target.value)}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-2 font-bold border-b">
        <span style={{ flexBasis: "25%" }}>Title</span>
        <span style={{ flexBasis: "20%" }}>Start Date</span>
        <span style={{ flexBasis: "20%" }}>End Date</span>
        <span style={{ flexBasis: "15%" }}>Status</span>
        <span style={{ flexBasis: "20%" }}>Destination</span>
      </div>

      {/* List */}
    
            
      {Array.isArray(planners) &&
  planners.map((planner) => (
    <PlannerCard key={planner._id} {...planner}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          />
        ))}
    </div>
  );
}

export default PlannerListPage;
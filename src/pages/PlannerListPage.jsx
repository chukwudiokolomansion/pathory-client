import { useState, useEffect } from "react";
import axios from "axios";
import PlannerFilterBar from "../components/PlannerFilterBar";
import PlannerCard from "../components/PlannerCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function PlannerListPage() {
  const [planners, setPlanners] = useState([]);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [titleQuery, setTitleQuery] = useState("");

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  };

  useEffect(() => {
    let queryString = "";
    if (destinationQuery) queryString += `destination=${destinationQuery}&`;
    if (titleQuery) queryString += `title=${titleQuery}`;

    axios
      .get(`${API_URL}/api/planners?${queryString}`)
      .then((response) => {
        setPlanners(response.data);
      })
      .catch((error) => console.log(error));
  }, [destinationQuery, titleQuery]);

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
    <PlannerFilterBar
      destinationQuery={destinationQuery}
      setDestinationQuery={setDestinationQuery}
      titleQuery={titleQuery}
      setTitleQuery={setTitleQuery}
      handleChange={handleChange}
    />

    <div className="flex justify-between items-center p-2 font-bold border-b">
      <span style={{ flexBasis: "25%" }}>Planner</span>
      <span style={{ flexBasis: "15%" }}>Title</span>
      <span style={{ flexBasis: "15%" }}>Format</span>
      <span style={{ flexBasis: "15%" }}>Ongoing</span>
      <span style={{ flexBasis: "25%" }}>Id</span>
    </div>

  {Array.isArray(planners) &&
  planners.map((planner, index) => (
    <PlannerCard
      key={planner._id}
      {...planner}
      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
    />
  ))}
  </div>
  )
}
export default PlannerListPage

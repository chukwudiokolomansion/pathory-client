import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// PLANNER pages
import PlannerListPage from "./pages/PlannerListPage";
import PlannerDetailsPage from "./pages/PlannerDetailsPage";
import PlannerEditPage from "./pages/PlannerEditPage";
import PlannerCreatePage from "./pages/PlannerCreatePage";

// ACTIVITY pages
import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import ActivityEditPage from "./pages/ActivityEditPage";
//import ActivityCreatePage from "./pages/ActivityCreatePage";

// AUTH / PROFILE
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App relative z-20 pt-20">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {isSidebarOpen && <Sidebar />}

      <div className={`content ${isSidebarOpen ? "shifted" : ""} relative z-10`}>
        <Routes>

          {/* Default */}
          <Route path="/" element={<Navigate to="/activities" />} />

          {/* ACTIVITIES */}
          <Route path="/activities" element={<ActivityListPage />} />
          <Route path="/activities/:activityId" element={<ActivityDetailsPage />} />
          <Route path="/activities/edit/:activityId" element={<ActivityEditPage />} />

          {/* PLANNERS */}
          <Route path="/planners" element={<PlannerListPage />} />
          <Route path="/planners/create" element={<PlannerCreatePage />} />
          <Route path="/planners/:plannerId" element={<PlannerDetailsPage />} />
          <Route path="/planners/edit/:plannerId" element={<PlannerEditPage />} />

          {/* AUTH */}
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <UserProfilePage />
              </IsPrivate>
            }
          />

          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />

          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
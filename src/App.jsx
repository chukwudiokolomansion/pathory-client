import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import PlannerListPage from "./pages/PlannerListPage";
import PlannerDetailsPage from "./pages/PlannerDetailsPage";
import PlannerEditPage from "./pages/PlannerEditPage";
import PlannerCreatePage from "./pages/PlannerCreatePage";

import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import ActivityEditPage from "./pages/ActivityEditPage";

import UserProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";


import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App relative z-20 pt-20">
      <Navbar
        toggleSidebar={() =>
          setIsSidebarOpen(!isSidebarOpen)
        }
      />

      {isSidebarOpen && <Sidebar />}

      <div
        className={`content ${
          isSidebarOpen ? "shifted" : ""
        } relative z-10`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/dashboard" element={<HomePage />} />

          <Route path="/planners" element={<PlannerListPage />} />

          <Route path="/planners/details/:plannerId" element={<PlannerDetailsPage />} />

          <Route path="/planners/edit/:plannerId" element={<PlannerEditPage />} />

          <Route path="/planners/create" element={<PlannerCreatePage />} />

          <Route path="/activities" element={<ActivityListPage />} />

          <Route path="/activities/details/:activityId" element={<ActivityDetailsPage />} />

          <Route path="/activities/edit/:activityId" element={<ActivityEditPage />} />

          <Route path="/users/profile" element={ <IsPrivate> <UserProfilePage /> </IsPrivate> } />

          <Route path="/login" element={ <IsAnon> <Login /> </IsAnon> } />

          <Route path="/signup" element={ <IsAnon> <Signup /> </IsAnon> } />

        </Routes>
      </div>
    </div>
  );
}

export default App;
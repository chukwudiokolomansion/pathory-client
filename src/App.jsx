import {useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PlannerListPage from "./pages/PlannerListPage";
import PlannerDetailsPage from "./pages/PlannerDetailsPage";
import PlannerEditPage from "./pages/PlannerEditPage";
import PlannerCreatePage from "./pages/PlannerCreatePage";
import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import ActivityEditPage from "./pages/ActivityEditPage";
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
      <div className={`content ${isSidebarOpen ? 'shifted' : ''} relative z-10`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<PlannerListPage />} />
          <Route path="/activities" element={<ActivityListPage />} />
          <Route path="/cohorts/details/:cohortId" element={<PlannerDetailsPage />} />
          <Route path="/cohorts/edit/:cohortId" element={<PlannerEditPage />} />
          <Route path="/cohorts/create" element={<PlannerCreatePage />} />
          <Route path="/activities/details/:studentId" element={<ActivityDetailsPage />} />
          <Route path="/activities/edit/:studentId" element={<ActivityEditPage />} />
          <Route path="/profile" element={ <IsPrivate><UserProfilePage /></IsPrivate>} />
          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />

          
        </Routes>
      </div>

    </div>
  );
}

export default App;

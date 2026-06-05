import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PlannerListPage from "./pages/PlannerListPage";
import PlannerDetailsPage from "./pages/PlannerDetailsPage";
import PlannerEditPage from "./pages/PlannerEditPage";
import PlannerCreatePage from "./pages/PlannerCreatePage";
import ActivityCreatePage from "./pages/ActivityCreatePage";
import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import ActivityEditPage from "./pages/ActivityEditPage";
import UserProfilePage from "./pages/UserProfilePage";
// pages
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserPage from "./pages/UserPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";


import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


function App() {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
     <div className="min-h-screen flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-zinc-100">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />

      <div className="App relative z-20 pt-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {isSidebarOpen && <Sidebar />}

        <div className={`content ${isSidebarOpen ? "shifted" : ""} relative z-10`}>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/UserPage" element={<UserPage />} />
              <Route path="/activities" element={<ActivityListPage />} />
              <Route path="/activities/create/:activityId" element={<ActivityCreatePage />} />
              <Route path="/activities/details/:activityId" element={<ActivityDetailsPage />} />
              <Route path="/activities/edit/:activityId" element={<ActivityEditPage />} />
              <Route path="/planners" element={<PlannerListPage />} />
              <Route path="/planners/create" element={<PlannerCreatePage />} />
              <Route path="/planners/details/:plannerId" element={<PlannerDetailsPage />} />
              <Route path="/planners/edit/:plannerId" element={<PlannerEditPage />} />
              <Route path="/profile" element={<IsPrivate><UserProfilePage /></IsPrivate>} />
              <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
              <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

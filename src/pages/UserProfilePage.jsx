import { useEffect, useState } from "react";
import service from "../services/index.services";
import { HashLoader } from "react-spinners";
import { Avatar } from "flowbite-react";
import { BiEdit } from "react-icons/bi";

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/auth/verify");
      setUserProfile(response.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userProfile) {
    return (
      <div className="profile-loader">
        <HashLoader color="#8b5cf6" size={80} />
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner">
        <div className="profile-banner-overlay">
          <h1>My Journey Profile</h1>
          <p>
            Your personal Pathory identity and life story dashboard.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <Avatar
          img={userProfile.avatar || ""}
          rounded
          size="xl"
          className="profile-avatar"
        />

        <h2>{userProfile.email}</h2>

        <span className="role-pill">
          {userProfile.role}
        </span>

        <button className="edit-profile-btn">
          <BiEdit />
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="profile-stat-card">
          <h3>24</h3>
          <p>Stories Created</p>
        </div>

        <div className="profile-stat-card">
          <h3>12</h3>
          <p>Journeys</p>
        </div>

        <div className="profile-stat-card">
          <h3>18</h3>
          <p>Places Visited</p>
        </div>

        <div className="profile-stat-card">
          <h3>87%</h3>
          <p>Journey Completion</p>
        </div>
      </div>

      {/* Details */}
      <div className="profile-details-grid">
        <div className="profile-info-card">
          <h3>Account Information</h3>

          <div className="info-row">
            <span>Email</span>
            <strong>{userProfile.email}</strong>
          </div>

          <div className="info-row">
            <span>Role</span>
            <strong>{userProfile.role}</strong>
          </div>

          <div className="info-row">
            <span>User ID</span>
            <strong>{userProfile._id}</strong>
          </div>
        </div>

        <div className="profile-info-card">
          <h3>Journey Summary</h3>

          <p>
            Track memories, destinations, events,
            and milestones that shape your story.
          </p>

          <div className="progress-container">
            <div className="progress-fill"></div>
          </div>

          <span className="progress-label">
            Journey Progress 72%
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
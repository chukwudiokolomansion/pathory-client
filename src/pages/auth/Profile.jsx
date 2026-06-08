import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/index.services";
import placeholderImage from "../../assets/placeholder.png";

function Profile() {
  const { user } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await service.get(
          `/users/${user._id}`,
          
        );

        setUserProfile(response.data);
      } catch (error) {
        console.error(error);

        setErrorMessage(
          error?.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="p-6 text-red-500">
        {errorMessage}
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="p-6">
        No profile found.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center">
          <img
            src={userProfile.profileImage || placeholderImage}
            alt={userProfile.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />

          <h1 className="text-3xl font-bold mt-4">
            {userProfile.name}
          </h1>

          <p className="text-gray-500">
            {userProfile.role}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="border-b py-2">
              <strong>Email:</strong> {userProfile.email}
            </p>

            </div>

          <div>
            <p className="border-b py-2">
              <strong>Role:</strong> {userProfile.role}
            </p>

            <p className="border-b py-2">
              <strong>User ID:</strong> {userProfile._id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
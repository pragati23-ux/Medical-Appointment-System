import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";

const MyAccount = () => {
  const { user, logout, photoURL, setUser, updatePhotoURL, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get userId from user context or localStorage
    if (user?._id) {
      setUserId(user._id);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUserId(storedUser._id);
    }
  }, [user]);

  // Fetch latest user data from backend
  const { data: fetchedUser, loading } = useFetchData(
    userId ? `http://localhost:8000/api/v1/users/${userId}` : null
  );

  useEffect(() => {
    if (fetchedUser) {
      // Update context with fetched user data
      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser));
      // Update photoURL with cache buster
      if (fetchedUser.photo) {
        const photoWithCb = `${fetchedUser.photo}${fetchedUser.photo.includes("?") ? "&" : "?"}cb=${Date.now()}`;
        updatePhotoURL(photoWithCb);
      }
    }
  }, [fetchedUser, setUser, updatePhotoURL]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          logout();
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          {/* Profile Photo */}
          <div className="mb-6">
            {(photoURL || user?.photo) ? (
              <img
                src={photoURL || user.photo}
                alt={user?.name}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <h2 className="text-3xl font-bold mb-2">{user?.name}</h2>
          <p className="text-gray-600 mb-4">{user?.email}</p>
          {user?.bloodType && <p className="text-gray-600">Blood Type: {user.bloodType}</p>}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8 mb-6">
            <button
              onClick={() => navigate("/dashboard/bookings")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              My Bookings
            </button>
            <button
              onClick={() => navigate("/dashboard/profile-settings")}
              className="border-2 border-gray-600 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Profile Settings
            </button>
          </div>

          {/* Logout & Delete Buttons */}
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button
              onClick={handleLogout}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Delete account
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 font-semibold">Name</p>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Email</p>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Phone</p>
              <p className="text-lg">{user?.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Gender</p>
              <p className="text-lg">{user?.gender || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Blood Type</p>
              <p className="text-lg">{user?.bloodType || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Role</p>
              <p className="text-lg capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

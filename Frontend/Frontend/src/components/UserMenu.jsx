import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserMenu = () => {
  const { user, photoURL, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow">
      <button
        onClick={handleProfileClick}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>
      </button>
      <button
        onClick={handleLogout}
        className="ml-2 px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;

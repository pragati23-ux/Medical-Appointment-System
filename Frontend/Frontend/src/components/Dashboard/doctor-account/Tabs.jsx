import React from "react";

const Tabs = ({ activeTab, setActiveTab, onLogout, onDeleteAccount }) => {
  return (
    <div className="w-full md:w-72 bg-white shadow-lg p-6">
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full text-left px-6 py-3 rounded-lg font-medium transition ${
            activeTab === "overview"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("appointments")}
          className={`w-full text-left px-6 py-3 rounded-lg font-medium transition ${
            activeTab === "appointments"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Appointments
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full text-left px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
            activeTab === "profile"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span>👆</span> Profile
        </button>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button
            onClick={onLogout}
            className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Logout
          </button>
          <button
            onClick={onDeleteAccount}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

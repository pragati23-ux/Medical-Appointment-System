import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DoctorDashboard from "../components/Dashboard/doctor-account/Dashboard";
import MyAccount from "../components/Dashboard/user-account/MyAccount";

const DashboardRoutes = () => {
  const { user } = useContext(AuthContext);

  // Show doctor dashboard if user role is doctor
  if (user?.role === "doctor") {
    return <DoctorDashboard />;
  }

  // Show patient dashboard if user role is patient
  if (user?.role === "patient") {
    return <MyAccount />;
  }

  // Default fallback
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>Access denied</p>
    </div>
  );
};

export default DashboardRoutes;

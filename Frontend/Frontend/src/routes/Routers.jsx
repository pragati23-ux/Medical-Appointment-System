import React from 'react'
import Home from "../pages/Home"
import Signup from "../pages/Signup"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Contact from "../pages/Contact"
import DoctorsDetails from "../pages/Doctors/DoctorsDetails"
import Doctors from "../pages/Doctors/Doctors"
import DashboardRoutes from "./DashboardRoutes"
import ProtectedRoute from "./ProtectedRoute"
import MyBooking from "../components/Dashboard/user-account/MyBooking"
import Profile from "../components/Dashboard/user-account/Profile"
import DoctorDashboard from "../components/Dashboard/doctor-account/Dashboard"
import { Routes, Route } from 'react-router-dom'


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <DashboardRoutes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile/me" 
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <DashboardRoutes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/bookings" 
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyBooking />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/profile-settings" 
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctors/profile/me" 
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <DashboardRoutes />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default Routers
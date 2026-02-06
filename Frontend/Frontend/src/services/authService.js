import { BASE_URL } from "../config";
import { toast } from "react-toastify";

// Register user
export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return { success: true, data };
  } catch (err) {
    toast.error(err.message);
    return { success: false, error: err.message };
  }
};

// Login user
export const loginUser = async (email, password, role) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store token and user data
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { success: true, data };
  } catch (err) {
    toast.error(err.message);
    return { success: false, error: err.message };
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("photoURL");
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

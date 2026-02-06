import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/VerifyToken.js";

const router = express.Router();

// GET user profile (authenticated users - patient or doctor)
router.get("/profile/me", authenticate, getUserProfile);

// GET user appointments (authenticated users - patient or doctor)
router.get("/appointments/my", authenticate, getMyAppointments);

// GET single user (patient only)
router.get(
  "/:id",
  authenticate,
  restrict(["patient"]),
  getSingleUser
);

// GET all users (admin only)
router.get(
  "/",
  authenticate,
  restrict(["admin"]),
  getAllUser
);

// UPDATE user (patient or doctor)
router.put(
  "/:id",
  authenticate,
  restrict(["patient", "doctor"]),
  updateUser
);

// DELETE user (patient or admin)
router.delete(
  "/:id",
  authenticate,
  restrict(["patient", "admin"]),
  deleteUser
);

export default router;

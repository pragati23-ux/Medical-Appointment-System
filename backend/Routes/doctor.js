import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/VerifyToken.js";
import reviewRouter from './review.js'
const router = express.Router();
router.use("/:doctorId/reviews",reviewRouter)

// GET doctor profile (doctor only - authenticated)
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

// GET single doctor (public)
router.get("/:id", getSingleDoctor);

// GET all doctors (public)
router.get("/", getAllDoctor);

// UPDATE doctor (doctor only)
router.put(
  "/:id",
  authenticate,
  restrict(["doctor"]),
  updateDoctor
);

// DELETE doctor (admin only)
router.delete(
  "/:id",
  authenticate,
  restrict(["admin"]),
  deleteDoctor
);

export default router;

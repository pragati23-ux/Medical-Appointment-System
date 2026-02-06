import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// ==========================
// GET ALL REVIEWS
// ==========================
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// ==========================
// CREATE REVIEW
// ==========================
export const createReview = async (req, res) => {
  try {
    // attach doctor & user automatically
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.user.id;

    const savedReview = await Review.create(req.body);

    // push review into doctor model
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};

import Doctor from "../models/DoctorSchema.js";

// =======================
// GET DOCTOR PROFILE
// =======================
export const getDoctorProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const doctor = await Doctor.findById(userId)
      .select("-password")
      .populate("reviews");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor profile retrieved successfully",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor profile",
    });
  }
};

// =======================
// UPDATE DOCTOR
// =======================
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

// =======================
// DELETE DOCTOR
// =======================
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// =======================
// GET SINGLE DOCTOR
// =======================
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }
};

// =======================
// GET ALL DOCTORS
// =======================
export const getAllDoctor = async (req, res) => {
  try {
    const query = req.query.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({
        isApproved: "approved",
      }).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "Users found",
      data: doctors,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

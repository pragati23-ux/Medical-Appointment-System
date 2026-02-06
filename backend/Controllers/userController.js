import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

/**
 * GET ALL USERS
 */
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

/**
 * GET USER BY ID
 */
export const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
    });
  }
};

/**
 * GET SINGLE USER (Alias for getUserById)
 */
export const getSingleUser = getUserById;

/**
 * UPDATE USER
 */
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

/**
 * GET USER PROFILE (for logged-in user - patient or doctor)
 */
export const getUserProfile = async (req, res) => {
  const userId = req.userId; // From auth middleware
  const userRole = req.role; // From auth middleware

  try {
    let user;
    
    if (userRole === "patient") {
      user = await User.findById(userId).select("-password");
    } else if (userRole === "doctor") {
      user = await Doctor.findById(userId).select("-password");
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
};

/**
 * GET USER APPOINTMENTS (for logged-in patient or doctor)
 */
export const getMyAppointments = async (req, res) => {
  const userId = req.userId; // From auth middleware
  const userRole = req.role; // From auth middleware

  try {
    let bookings;

    if (userRole === "patient") {
      // Get appointments for patient - populate doctor details from Doctor schema
      bookings = await Booking.find({ userId })
        .populate({
          path: "doctorId",
          select: "name email specialization photo qualifications experiences bio",
          model: Doctor,
        })
        .sort({ createdAt: -1 });
    } else if (userRole === "doctor") {
      // Get appointments for doctor - populate patient details from User schema
      // Also get doctor's own info
      const doctor = await Doctor.findById(userId);
      
      bookings = await Booking.find({ doctorId: userId })
        .populate({
          path: "userId",
          select: "name email phone gender photo",
          model: User,
        })
        .sort({ createdAt: -1 });

      // Attach doctor info to each booking
      bookings = bookings.map(booking => ({
        ...booking.toObject(),
        doctorInfo: doctor,
      }));
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointments found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
    });
  }
};

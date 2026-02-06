import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    const token = authToken.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');

    // check user role
    if (decoded.role === "patient") {
      req.user = await User.findById(decoded.id).select("-password");
    }

    if (decoded.role === "doctor") {
      req.user = await Doctor.findById(decoded.id).select("-password");
    }

    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  if (!roles.includes(req.role)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized",
    });
  }
  next();
};

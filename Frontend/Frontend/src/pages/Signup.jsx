 import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import signup from "../assets/images/signup(1).gif";
 import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
  const [previewURL, setPreviewURL] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
    gender: "",
    role: "patient",
    agreeTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) return "strong";
    return "medium";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === "weak") return "text-red-600";
    if (passwordStrength === "medium") return "text-yellow-600";
    if (passwordStrength === "strong") return "text-green-600";
    return "";
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      try {
        const cloudinaryData = await uploadImageToCloudinary(file);
        setFormData({ ...formData, photo: cloudinaryData.secure_url });
      } catch (err) {
        console.error("Upload error:", err);
        setFormData({ ...formData, photo: "" });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Valid email is required");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.gender) {
      toast.error("Gender is required");
      return;
    }
    if (!formData.agreeTerms) {
      toast.error("You must agree to terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, agreeTerms, ...dataToSend } = formData;
      const result = await registerUser(dataToSend);

      if (result.success) {
        toast.success("Registration successful! Redirecting to login...");
        // Store photo URL in context
        login(result.data.user, result.data.token, previewURL);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-md grid md:grid-cols-2 overflow-hidden">
        
        {/* LEFT IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-blue-600 p-10">
          <img
            src={signup}
            alt="Signup Illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Create an account
          </h2>

          <form className="space-y-5" onSubmit={submitHandler}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
            />
            {formData.password && (
              <div className={`text-xs ${getPasswordStrengthColor()}`}>
                Password strength: <span className="font-semibold capitalize">{passwordStrength}</span>
              </div>
            )}

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-600 text-xs">Passwords do not match</p>
            )}

            {/* Role & Gender */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="text-sm text-gray-600 block mb-1">
                  Are you a:
                </label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600">
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div className="w-full">
                <label className="text-sm text-gray-600 block mb-1">
                  Gender:
                </label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Upload Photo */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Photo</span>
                )}
              </div>

              <label className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the <span className="text-blue-600 font-medium">terms and conditions</span>
              </label>
            </div>

            {/* Button */}
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <HashLoader size={20} color="#ffffff" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email.includes("@")) {
      toast.error("Valid email is required");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(formData.email, formData.password, formData.role);

      if (result.success) {
        const userData = result.data.user;
        const token = result.data.token;
        
        // Store in context
        login(userData, token, userData.photo || "");
        
        toast.success("Login successful!");
        // Redirect after 1 second
        setTimeout(() => navigate("/home"), 1000);
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
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Hello! <span className="text-blue-600">Welcome Back</span> 👋
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={submitHandler}>
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">Login as:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <HashLoader size={20} color="#ffffff" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

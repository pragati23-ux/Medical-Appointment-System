import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, token, updatePhotoURL, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    bloodType: user?.bloodType || "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Try to get userId from different sources
    let id = null;

    // First check if user has _id
    if (user?._id) {
      id = user._id;
    } else {
      // Try from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      id = storedUser._id;
    }

    setUserId(id);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        setPhotoPreview(reader.result);
        setUploadingPhoto(true);

        try {
          // Upload to Cloudinary
          const formDataCloud = new FormData();
          formDataCloud.append("file", file);
          formDataCloud.append("upload_preset", "medicare_upload");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dw6ihppy0/image/upload",
            {
              method: "POST",
              body: formDataCloud,
            }
          );

          const data = await response.json();

          if (data.secure_url) {
            setPhoto(data.secure_url);
            updatePhotoURL(data.secure_url);
            toast.success("Photo uploaded successfully");
          }
        } catch (error) {
          console.error("Photo upload error:", error);
          toast.error("Failed to upload photo");
        } finally {
          setUploadingPhoto(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      toast.error("User ID not found. Please logout and login again.");
      setLoading(false);
      return;
    }

    try {
      const updateData = { ...formData };
      if (photo) {
        updateData.photo = photo;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update local auth state and stored user so UI reflects the new photo immediately
        const updatedUser = data.data || data;
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          // ensure photoURL in AuthContext is in sync
          if (updatedUser.photo) updatePhotoURL(updatedUser.photo);
        }

        toast.success("Profile updated successfully");
      } else {
        console.error("Update error:", data);
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8">Profile Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Photo
            </label>
            <div className="flex flex-col items-center gap-4">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                  <span className="text-gray-600">No photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                disabled={uploadingPhoto}
                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              />
              {uploadingPhoto && <p className="text-sm text-blue-600">Uploading...</p>}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Blood Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">Select blood type</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

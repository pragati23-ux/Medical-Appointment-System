  const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  if (!file) {
    throw new Error("File is missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary error:", data);
    throw new Error("Cloudinary upload failed");
  }

  return data;
};

export default uploadImageToCloudinary;

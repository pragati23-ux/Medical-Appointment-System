import { createContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true);

  const addCacheBuster = (url) => {
    if (!url) return null;
    return `${url}${url.includes("?") ? "&" : "?"}cb=${Date.now()}`;
  };

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedPhoto = localStorage.getItem("photoURL");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setPhotoURL(savedPhoto ? addCacheBuster(savedPhoto) : null);
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData, authToken, photo) => {
    setUser(userData);
    setToken(authToken);
    const photoWithCb = addCacheBuster(photo);
    setPhotoURL(photoWithCb || null);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    if (photoWithCb) localStorage.setItem("photoURL", photoWithCb);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setPhotoURL(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("photoURL");
  }, []);

  const updatePhotoURL = useCallback((photo) => {
    const photoWithCb = addCacheBuster(photo);
    setPhotoURL(photoWithCb);
    if (photoWithCb) localStorage.setItem("photoURL", photoWithCb);
  }, []);

  const value = {
    user,
    setUser,
    token,
    setToken,
    photoURL,
    updatePhotoURL,
    loading,
    setLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Create Context for Authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null,
    userId: null,
    admin: false,
  });

  // To verify the current user
  useEffect(() => {
    const verifyUser = async () => {
      setAuthState((prev) => ({ ...prev, loading: true }));
      try {
        //Send req to verify and verify-admin at the same time
        axios.defaults.withCredentials = true;
        const [userResponse, adminResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-admin`),
        ]);
        //if it is a general user
        if (userResponse.data.status) {
          const { name, userId } = localStorage;
          if (!name || !userId) {
            return await logout();
          } else {
            setAuthState((prev) => ({
              ...prev,
              user: name,
              userId: userId,
              admin: false,
              isAuthenticated: true,
            }));
          }
        }
        //If it is admin
        else if (adminResponse.data.status) {
          const { name, userId } = localStorage;
          if (!name || !userId) {
            return await logout();
          } else {
            setAuthState((prev) => ({
              ...prev,
              user: name,
              userId: userId,
              admin: true,
              isAuthenticated: true,
            }));
          }
        }
      } catch (e) {
        setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        set;
      } finally {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    verifyUser();
  }, []);

  //Login context
  const login = async (email, password) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email, password }
      );
      //if req is successfull
      if (data.success) {
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.id);
        setAuthState((prev) => ({
          ...prev,
          user: data.name,
          userId: data.id,
          isAuthenticated: true,
        }));
        if (data?.isAdmin) {
          setAuthState((prev) => ({ ...prev, admin: true }));
        }
        toast.success(data.message, {
          className: "toast-message",
          position: "bottom-center",
        });
        return true;
      }
      //if req is failed
      else {
        setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        toast.error(data.message, {
          className: "toast-message",
        });
        return false;
      }
    } catch (e) {
      setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
      toast.error(e.message, {
        className: "toast-message",
      });
      return false;
    } finally {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  };

  //Sign Up Context
  const signUp = async (name, email, password) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        { name, email, password }
      );
      //if req is success
      if (data.success) {
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.id);
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: data.name,
          userId: data.id,
        }));
        toast.success(data.message, {
          className: "toast-message",
          position: "bottom-center",
        });
        return true;
      }
      //if req is failed
      else {
        setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        toast.error(data.message, {
          className: "toast-message",
        });
        return false;
      }
    } catch (e) {
      setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
      toast.error(e.message, {
        className: "toast-message",
      });
      return false;
    } finally {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  };

  //Logout context
  const logout = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      axios.defaults.withCredentials = true;
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      setAuthState((prev) => ({
        ...prev,
        user: null,
        userId: null,
        admin: false,
        isAuthenticated: false,
      }));
      toast.success("Logout successful!", {
        className: "toast-message",
        position: "bottom-center",
      });
      return true;
    } catch (e) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: true,
      }));
      toast.error("Some Error Happened", {
        className: "toast-message",
      });
      return false;
    } finally {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  };

  //Taking all the states from authState
  const { isAuthenticated, loading, user, userId, admin } = authState;
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        signUp,
        loading,
        userId,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//exporting authContext
export const useAuth = () => React.useContext(AuthContext);

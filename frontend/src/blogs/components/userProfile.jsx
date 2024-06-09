import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../components/customHooks/useAuth";

export default function UserPro() {
  //Taking contexts from authContext
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [logoutDropDown, changeLogoutDropDown] = useState(false);

  const logOutDropDownHandler = () => {
    changeLogoutDropDown(!logoutDropDown);
  };

  //What logout will do;
  const logOutHandler = async () => {
    //calling logout context of authContext;
    const result = await logout();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div
      className="user-pro"
      onMouseLeave={logOutDropDownHandler}
      onMouseEnter={logOutDropDownHandler}
    >
      <p>{user}</p>
      {logoutDropDown && (
        <motion.div
          className="logout-tab"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: "0vw" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div onClick={logOutHandler}>Logout... Bye</div>
          <Link to="/" className="visit-link">
            Visit Website
          </Link>
        </motion.div>
      )}
      <PulseLoader
        color="#6c63ff"
        loading={loading}
        cssOverride={{
          marginRight: "20vh",
          zIndex: 10,
        }}
        size="1rem"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

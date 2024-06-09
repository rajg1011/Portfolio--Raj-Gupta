import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { HashLink } from "react-router-hash-link";
import Follow from "./followMe";

const TabletNavBar = ({ change, TabletView, linkhandle, FollowLink }) => {
  const LinkHandlerTablet = () => {
    return linkhandle();
  };
  const closeNavbarTablet = () => {
    return change();
  };
  return (
    <motion.div
      className="tablet-menu"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="home menu-sections tablet-menu-sections"
        onClick={closeNavbarTablet}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-house"></i> Home
        </NavLink>
      </div>
      <div
        className="about menu-sections tablet-menu-sections"
        onClick={closeNavbarTablet}
      >
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-user"></i> About Me
        </NavLink>
      </div>
      <div
        className="projects menu-sections tablet-menu-sections"
        onClick={closeNavbarTablet}
      >
        <HashLink
          to="/#project"
          scroll={(e) => e.scrollIntoView({ behavior: "smooth", block: "end" })}
        >
          <i className="fa-solid fa-list-check"></i> Projects
        </HashLink>
      </div>
      <div
        className="blogs menu-sections tablet-menu-sections"
        onClick={closeNavbarTablet}
      >
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-pen-nib"></i> Blogs
        </NavLink>
      </div>
      <div
        className={`tablet-social-links menu-sections tablet-menu-sections`}
        onMouseEnter={LinkHandlerTablet}
        onMouseLeave={LinkHandlerTablet}
      >
        <i className="fa-solid fa-hashtag"></i>
        Follow Me
        {FollowLink && <Follow tabletView={TabletView} />}
      </div>
    </motion.div>
  );
};

export default TabletNavBar;

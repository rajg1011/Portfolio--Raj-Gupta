import Follow from "./followMe";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { HashLink } from "react-router-hash-link";
import TabletNavBar from "./TabletNavBar";
function NavBarMenu() {
  //check if the device has width <800px
  const isTablet = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const [FollowLink, FollowLinkFunction] = useState(false);
  const [TabletView, TabletViewFunction] = useState(false);
  const LinksHandler = () => {
    FollowLinkFunction((prev) => !prev);
  };
  const closeNavBar = () => {
    TabletViewFunction((prev) => !prev);
  };

  return (
    <div className="header-menu">
      <div className="logo">
        <Link to="/"> Raj Gupta</Link>
      </div>
      {!isTablet ? (
        <div className="header-menu-sections">
          <div className="home menu-sections">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fa-solid fa-house"></i> Home
            </NavLink>
          </div>
          <div className="about menu-sections">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fa-solid fa-user"></i> About Me
            </NavLink>
          </div>
          <div className="projects menu-sections">
          {/* Hashlink to go for #id url within same page*/}
            <HashLink
              to="/#project"
              scroll={(e) =>
                e.scrollIntoView({ behavior: "smooth", block: "end" })
              }
            >
              <i className="fa-solid fa-list-check"></i> Projects
            </HashLink>
          </div>
          <div className="blogs menu-sections">
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fa-solid fa-pen-nib"></i> Blogs
            </NavLink>
          </div>
          <div
            className={`social-links menu-sections`}
            onMouseEnter={LinksHandler}
            onMouseLeave={LinksHandler}
          >
            <i className="fa-solid fa-hashtag"></i>
            Follow Me
            {FollowLink && <Follow />}
          </div>
        </div>
      ) : (
        <div className="tablet-view">
          {!TabletView && (
            <motion.div
              className="burger-icon"
              key="burger"
              initial={{ x: 10 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <i className="fa-solid fa-bars" onClick={closeNavBar} />
            </motion.div>
          )}
          {/* In tablet  */}
          {TabletView && (
            <motion.div
              className="cross-icon"
              initial={{ x: 10 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <i className="fa-solid fa-x" onClick={closeNavBar} />
            </motion.div>
          )}
          {TabletView && (
            <TabletNavBar
              TabletView={TabletView}
              linkhandle={LinksHandler}
              FollowLink={FollowLink}
              change={closeNavBar}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default NavBarMenu;

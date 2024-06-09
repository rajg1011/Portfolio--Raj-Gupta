import FollowData from "./followMeData";
import React from "react";
import { motion } from "framer-motion";

const Follow = ({ tabletView }) => {
  return (
    <motion.div
      className={`${tabletView ? "follow-menu-tablet" : "follow-menu"}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <ul className={`${tabletView ? "follow-list-tablet" : "follow-list"}`}>
        {FollowData.map((item) => {
          return (
            <li>
              <a href={`${item.Link}`} target="_blank">
                <i
                  class={`fa-${item.FontawesomeClass.type} fa-${item.FontawesomeClass.name}`}
                ></i>
                {item.Name}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Follow;

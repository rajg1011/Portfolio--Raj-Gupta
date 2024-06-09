import projectData from "./projectData";
import React from "react";
import { motion } from "framer-motion";
import "./style.css";
export default function ProjectPage() {
  return (
    <motion.div
      className="project-page"
      id="project"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: "0vw" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h1>My Projects</h1>
      <div className="container">
        {projectData.map((project) => {
          return (
            <div className="project-grid-item">
              <img src={`${project.image}`} alt="Project Image" />
              <div className="link">
                <a href={`${project.url}`} target="_blank">
                  <i className="fa-solid fa-link"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

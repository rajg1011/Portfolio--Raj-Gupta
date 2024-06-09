import { useState } from "react";
import Accomplishment from "./accomplishment";
import Education from "./education";
import { motion } from "framer-motion";
import Skills from "./skills";
import "./style.css";

export default function SkillsPage() {
  const [changeAccEdu, changeAccEduFunction] = useState(true);
  const changeEductaionAccomplish = () => {
    changeAccEduFunction((prev) => !prev);
  };
  return (
    <motion.div
      className="skill-page"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: "0vw" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <Skills />
      <div className="education-section">
        <div className="selection-button">
          <div
            className={`education-button ${
              changeAccEdu ? "dynamic-change-edu-acc" : ""
            }`}
            onClick={changeEductaionAccomplish}
          >
            Education
          </div>
          <div
            className={`accomplishment-button ${
              !changeAccEdu ? "dynamic-change-edu-acc" : ""
            }`}
            onClick={changeEductaionAccomplish}
          >
            Accomplishment
          </div>
        </div>
        {changeAccEdu && <Education />}
        {!changeAccEdu && <Accomplishment />}
      </div>
    </motion.div>
  );
}

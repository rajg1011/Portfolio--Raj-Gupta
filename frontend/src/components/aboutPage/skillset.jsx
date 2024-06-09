import React from "react";
import { AboutData } from "./aboutData";
import { motion } from "framer-motion";
function SkillSet() {
  return (
    <motion.div
      className="about-skills"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: "0vw" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h1>Skillset</h1>
      <div className="skill-grid">
        {AboutData.map((item) => {
          return (
            <div className="skill-grid-items" key={item.id}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
//Memo so that not everytime it re-render
export default React.memo(SkillSet);

import React from "react";
import { skillData, skillIntro } from "./skillData";
import { motion } from "framer-motion";

function Skills() {
  return (
    <div className="skills-section">
      <h1>Skills and Education</h1>
      <p>{skillIntro}</p>
      <caption>My Skills</caption>
      <table className="skill-table">
        {skillData.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <div className="heading-skills">
                  <span>{item.data1}</span>
                </div>
                <div className="filler-skills">
                  <motion.div
                    className="filler-skills-inner"
                    style={{ width: `${item.data1Percentage}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.data1Percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
              </td>
              <td>
                <div className="heading-skills">
                  <span>{item.data2}</span>
                </div>
                <div className="filler-skills">
                  <motion.div
                    className="filler-skills-inner"
                    style={{ width: `${item.data2Percentage}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.data1Percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default React.memo(Skills);

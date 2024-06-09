import AboutImage from "../assetComp/aboutImage";
import { motion } from "framer-motion";
import { myself } from "./aboutData";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import Skillset from "./skillset";
export default function AboutPage() {
  // check if the device has width <400px
  const isPhone = useMediaQuery({
    query: "(max-width: 400px)",
  });
  return (
    <motion.div
      className="about-section"
      initial={{ y: 100 }}
      animate={{ y: 60 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-page">
        <div className="about-data">
          <h2>
            Know <span>Who</span> I am 😊
          </h2>
          <p>
            {myself.para1}
            <br />
            {myself.para2}
            <br />
            {myself.para3}
          </p>
        </div>
        {!isPhone && (
          <div className="about-image">
            <AboutImage />
          </div>
        )}
      </div>
      <Skillset />
    </motion.div>
  );
}

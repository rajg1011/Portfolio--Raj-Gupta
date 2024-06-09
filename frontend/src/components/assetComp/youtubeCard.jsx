import { useRef } from "react";
import useClickOutside from "../customHooks/clickOutside";
import { motion } from "framer-motion";

function YoutubeCard({ children, change }) {
  //Set the Youtube card for resume video
  const ref = useRef(null);
  useClickOutside(ref, change);
  return (
    <div className="youtube-card">
      <motion.div
        className="youtube-card-inframe-div"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        ref={ref}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default YoutubeCard;

import { useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import HeaderImage from "../assetComp/headerImage";
import TypeAnimation from "../assetComp/typingAnimation";
import { useMediaQuery } from "react-responsive";
import YoutubeCard from "../assetComp/youtubeCard";
import "./style.css";
export default function FrontPage() {
  //check if device has width >500px
  const isPhone = useMediaQuery({
    query: "(min-width: 500px)",
  });
  const [videoShow, videoShowFunction] = useState(false);
  const ResumeHandler = () => {
    return window.open(
      "https://drive.google.com/file/d/1VfQT7DlN_B4-j8o5NCm0bXRGfaazXQDk/view?usp=sharing"
    );
  };
  const VideoHandler = () => {
    return videoShowFunction((prev) => !prev);
  };
  const YoutubeVideo = () => {
    return window.open("https://www.youtube.com/watch?v=cOF6zJY-Uvc");
  };
  return (
    <div className="front-page">
      <motion.div
        className="front-page-details"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="front-page-my-data">
          <h3>I'm</h3>
          <h1>Raj Gupta</h1>
          <h2>
            <span>S</span>
            <TypeAnimation text="oftware Developer" timeDelay="200" />
          </h2>
          <div className="front-page-buttons">
            <button
              type="button"
              class="btn btn-primary"
              onClick={ResumeHandler}
            >
              Resume
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={isPhone ? VideoHandler : YoutubeVideo}
            >
              Play Video
            </button>
          </div>
        </div>
        <div className="front-page-image">
          <HeaderImage />
        </div>
      </motion.div>
      {ReactDOM.createPortal(
        videoShow && (
          <YoutubeCard change={VideoHandler}>
            <iframe
              src="https://www.youtube.com/embed/cOF6zJY-Uvc?si=7JHag5t5BySeLA_i"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </YoutubeCard>
        ),
        document.getElementById("back-root")
      )}
    </div>
  );
}

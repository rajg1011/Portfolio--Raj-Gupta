import React from "react";
import { useState, useEffect } from "react";

function TypeAnimation({ text, timeDelay }) {
  //Set the typing animation of Software Developer
  const [currentStateWritten, changeCurrentStateWritten] = useState("");
  const [index, indexFunction] = useState(0);
  useEffect(() => {
    if (index < text.length) {
      const timeOut = setTimeout(() => {
        changeCurrentStateWritten((prev) => prev + text[index]);
        indexFunction((prev) => prev + 1);
      }, timeDelay);
      return () => clearInterval(timeOut);
    }
  }, [text, timeDelay, index]);

  return <>{currentStateWritten}</>;
}

export default React.memo(TypeAnimation);

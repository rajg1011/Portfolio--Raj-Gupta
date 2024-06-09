
import { useEffect } from "react";

export default function useClickOutside(ref, fun) {
  useEffect(() => { 
    const listener = (e) => {
      // if click inside
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      //else change state
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}

import React, { useEffect } from "react";

function outFocus( ref, setCurrentState ) {
  const handler = (e) => {
    if (ref) {
      if (!ref?.current?.contains(e.target)) {
        setCurrentState(false);
      }
    }
  };
  document.addEventListener("click", handler);
  return () => document.addEventListener("click", handler); 
}

export default outFocus;

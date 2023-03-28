import React, { useRef } from "react";
import "../style/button.style.css";

function IconOpen({ rotation, setRotation, reset }) {
  const iconRef = useRef();

  const handleIconClick = () => {
    if (reset) {
      reset();
    }
    setRotation(!rotation);
    rotation
      ? (iconRef.current.style.transform = "rotate(90deg)")
      : (iconRef.current.style.transform = "rotate(180deg)");
  };

  return (
    <div id="iconOpen-wrapper">
      <div id="iconOpen" ref={iconRef} onClick={handleIconClick}></div>
    </div>
  );
}
export default IconOpen;

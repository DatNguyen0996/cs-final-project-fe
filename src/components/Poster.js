import React, { useRef, useState } from "react";

function Poster() {
  let timeDelay;
  const [enableAuto, setEnableAuto] = useState(true);
  console.log(enableAuto);
  const slider = useRef();

  const setAttribute = (number) => {
    slider.current.style.transform = `translateX(-${number * 100}%)`;
  };

  return (
    <div className="poster">
      <div className="btn-group">
        <button
          onClick={() => {
            setEnableAuto(false);
            clearInterval(timeDelay);
            setAttribute(0);
          }}
        ></button>
        <button
          onClick={() => {
            setEnableAuto(false);
            clearInterval(timeDelay);

            setAttribute(1);
          }}
        ></button>
        <button
          onClick={() => {
            setEnableAuto(false);
            clearInterval(timeDelay);
            setAttribute(2);
          }}
        ></button>
        <button
          onClick={() => {
            setEnableAuto(false);
            clearInterval(timeDelay);
            setAttribute(3);
          }}
        ></button>
        <button
          onClick={() => {
            setEnableAuto(false);
            clearInterval(timeDelay);
            setAttribute(4);
          }}
        ></button>
      </div>
      <div className="slider" ref={slider}>
        <div className="image">
          <img src="/images/p-one.png" alt="" />
        </div>
        <div className="image">
          <img src="/images/p-two.png" alt="" />
        </div>
        <div className="image">
          <img src="/images/p-three.png" alt="" />
        </div>
        <div className="image">
          <img src="/images/p-four.png" alt="" />
        </div>
        <div className="image">
          <img src="/images/test.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Poster;

import React, { useRef } from "react";
import Card from "./Card";

function CardSlider({ products = [] }) {
  const cardList = useRef();

  let count = 0;
  const handleNextClick = () => {
    count < products.length - 1 ? (count = count + 1) : (count = 0);

    cardList.current.style.marginLeft = `-${count * 200}px`;
  };

  const handlePrevClick = () => {
    count > 0 ? (count = count - 1) : (count = products.length - 1);

    cardList.current.style.marginLeft = `-${count * 200}px`;
  };

  return (
    <div className="card-list-wrapper">
      <div className="options"></div>
      <div className="card-list" ref={cardList}>
        {products.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>

      <svg
        onClick={handlePrevClick}
        xmlns="http://www.w3.org/2000/svg"
        className="prev"
        width="56.898"
        height="91"
        viewBox="0 0 56.898 91"
      >
        <path
          d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z"
          transform="translate(0 91) rotate(-90)"
          fill="#222"
        />
      </svg>

      <svg
        onClick={handleNextClick}
        xmlns="http://www.w3.org/2000/svg"
        className="next"
        width="56.898"
        height="91"
        viewBox="0 0 56.898 91"
      >
        <path
          d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z"
          transform="translate(56.898) rotate(90)"
          fill="#222"
        />
      </svg>
    </div>
  );
}

export default CardSlider;

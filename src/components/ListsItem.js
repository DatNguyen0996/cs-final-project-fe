import React from "react";
import { useNavigate } from "react-router-dom";

function ListsItem() {
  const navitate = useNavigate();
  return (
    <div className="list-item">
      <div
        className="racket item"
        onClick={() => navitate("/listOfItem/racket/1")}
      >
        <div className="wrapper">
          <img src="/images/vot.gif" alt="" />
          <div className="title">
            <p>Vợt cầu lông</p>
          </div>
        </div>
      </div>
      <div className="shoe item" onClick={() => navitate("/listOfItem/shoe/1")}>
        <div className="wrapper">
          <img src="/images/giay.gif" alt="" />
          <div className="title">
            <p>Giày thể thao</p>
          </div>
        </div>
      </div>
      <div
        className="shirt item"
        onClick={() => navitate("/listOfItem/shirt/1")}
      >
        <div className="wrapper">
          <img src="/images/ao.gif" alt="" />
          <div className="title">
            <p>Áo cầu lông</p>
          </div>
        </div>
      </div>
      <div
        className="shorts item"
        onClick={() => navitate("/listOfItem/shorts/1")}
      >
        <div className="wrapper">
          <img src="/images/quan.gif" alt="" />
          <div className="title">
            <p>Quần cầu lông</p>
          </div>
        </div>
      </div>
      <div
        className="sport-dress item"
        onClick={() => navitate("/listOfItem/sportDress/1")}
      >
        <div className="wrapper">
          <img src="/images/vay.gif" alt="" />
          <div className="title">
            <p>Váy cầu lông</p>
          </div>
        </div>
      </div>
      <div
        className="accessory item"
        onClick={() => navitate("/listOfItem/accessory/1")}
      >
        <div className="wrapper">
          <img src="/images/pk.gif" alt="" />
          <div className="title">
            <p>Phụ kiện</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListsItem;

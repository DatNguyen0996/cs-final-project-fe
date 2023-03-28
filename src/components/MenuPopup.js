import React from "react";
import "../style/style.ManuPopup.css";

import { useNavigate } from "react-router-dom";

import IconClose from "./IconClose";

function MenuPopup({ click }) {
  const navitate = useNavigate();
  return (
    <div id="menu-popup">
      <div className="header">
        <p>Menu</p>
        <div className="close-popup" onClick={click}>
          <IconClose />
        </div>
      </div>
      <div>
        <div className="popup-one">
          <input type="text" name="" id="" />
          <ul>
            <li>
              <button>Hotline: 096xxxxxxx</button>
            </li>
            <li>
              <button>Hệ thống cửa hàng</button>
            </li>
          </ul>
        </div>
        <div className="popup-two">
          <ul>
            <li>
              <button onClick={() => navitate("/")}>Trang chủ</button>
            </li>
            <li>
              <button onClick={() => navitate("/listOfItem/all/1")}>
                Sản phẩm
              </button>
            </li>
            <li>
              <button onClick={() => navitate("/saleOff/all/1")}>
                Sale off
              </button>
            </li>
            <li>
              <button onClick={() => navitate("/intro")}>Giới thiệu</button>
            </li>
            <li>
              <button onClick={() => navitate("/contact")}>Liên hệ</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuPopup;

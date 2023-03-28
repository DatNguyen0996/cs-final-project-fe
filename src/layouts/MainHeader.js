import React, { useEffect, useState } from "react";
import "../style/style.Header.css";
import logoImg from "../logoBadminton.png";
import MenuPopup from "../components/MenuPopup";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/userAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { getCurrentUser } from "../features/User/UserSlice";
import { useDispatch } from "react-redux";

const searchSchema = Yup.object().shape({
  search: Yup.string().required("Không có từ khóa tìm kiếm"),
});

function MainHeader() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
  });
  const navitate = useNavigate();
  const [bodyWidth, setBodyWidth] = useState(
    document.querySelector(`body`).offsetWidth
  );
  window.addEventListener("resize", () =>
    setBodyWidth(document.querySelector(`body`).offsetWidth)
  );

  const [visibility, setVisibility] = useState(false);

  const click = () => {
    setVisibility(!visibility);
  };

  // const { user } = useAuth();

  const onSubmit = (data) => {
    navitate(`/search/all/${data.search}/${1}`);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div id="header-container">
      {visibility ? <MenuPopup click={click} /> : <></>}
      <div className="store-infor">
        <div className="store-infor-wrapper">
          {bodyWidth > 850 ? (
            <></>
          ) : (
            <div id="page-menu" onClick={click}>
              <p></p>
              <p></p>
              <p></p>
            </div>
          )}
          <div className="logo-wrapper">
            <Link to={"/"}>
              <img id="store-logo" src={logoImg} alt="Logo" />
            </Link>
          </div>
          {bodyWidth > 850 ? (
            <div className="infor-wrapper">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="search"
                  type="text"
                  placeholder="Tìm kiếm sản phẩm"
                  {...register(`search`)}
                />
              </form>
              <div className="element-box">
                <img src="/images/online-support.png" alt="Online support" />
                <p>HOTLINE: 096xxxxxxx</p>
              </div>

              <div
                className="element-box"
                onClick={() => navitate("/listOfStore")}
              >
                <img src="/images/location.png" alt="Location" />
                <p>Hệ thống cửa hàng</p>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="user-wrapper">
            <div className="element-box" onClick={() => navitate("/account")}>
              <img src="/images/user.png" alt="User" />
              <p>Tài khoản</p>
            </div>

            <div className="element-box" onClick={() => navitate(`/cart`)}>
              <img src="/images/cart.png" alt="Cart" />
              <p>Giỏ hàng</p>
            </div>
          </div>
        </div>
      </div>
      {bodyWidth > 850 ? (
        <div className="list-options">
          <div className="list-options-wrapper">
            <button className="btn" onClick={() => navitate("/")}>
              TRANG CHỦ
            </button>
            <button
              className="btn"
              onClick={() => navitate("/listOfItem/all/1")}
            >
              SẢN PHẨM
            </button>
            <button className="btn" onClick={() => navitate("/saleOff/all/1")}>
              SALE OFF
            </button>
            <button className="btn" onClick={() => navitate("/intro")}>
              GIỚI THIỆU
            </button>
            <button className="btn" onClick={() => navitate("/contact")}>
              LIÊN HỆ
            </button>

            {/* {user?.currentUser.role === undefined ||
            user?.currentUser.role === null ? (
              <></>
            ) : (
              <>
                <button className="btn" onClick={() => navitate("/manager")}>
                  QUẢN LÝ
                </button>
                <button className="btn" onClick={() => navitate("/admin")}>
                  ADMIN
                </button>
              </>
            )} */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MainHeader;

import React, { useEffect, useState } from "react";
import "../../style/accountPage.style.css";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/userAuth";

import { getOrderOfUser } from "../../features/Order/OrderSlice";
import { getCurrentUser } from "../../features/User/UserSlice";

import LoadingScreen from "../../components/LoadingScreen";

import { fCurrency } from "../../utils/numberFormat";

import ManagePage from "../managerPage/ManagePage";
import AdminPage from "../adminPage/AdminPage";

import OrderStatus from "../../components/OrderStatus";
import ProductType from "../../components/ProductType";
import OrderDetail from "./components/OrderDetail";
import EditInformation from "./components/EditInformation";
import MailBox from "./components/MailBox";

function AccountPage() {
  const { logout } = useAuth();

  const dispatch = useDispatch();

  const { orderOfUser, isLoading } = useSelector((state) => state.order);

  const { currentUser, isLoading: loadUserMe } = useSelector(
    (state) => state.user
  );

  const [OpenEdit, setOpenEdit] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [orderInfor, setOrderInfor] = useState({});
  const handleOrder = (order) => {
    setOrderInfor(order);
    setOpenOrder(!openOrder);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderOfUser({ userId: currentUser?.currentUser?._id }));
  }, [dispatch, currentUser]);

  const [ariaSelect, setAriaSelect] = useState(0);

  return isLoading & loadUserMe ? (
    <LoadingScreen />
  ) : (
    <div id="main-page-container">
      {currentUser?.currentUser?.role !== "customer" ? (
        <div className="main-page-header">
          <button
            id={ariaSelect === 0 ? "button-selected" : "button-not-selected"}
            onClick={() => setAriaSelect(0)}
          >
            TÀI KHOẢN
          </button>
          {currentUser?.currentUser?.role === "manager" ? (
            <button
              id={ariaSelect === 1 ? "button-selected" : "button-not-selected"}
              onClick={() => setAriaSelect(1)}
            >
              QUẢN LÝ
            </button>
          ) : (
            <></>
          )}

          <button
            id={ariaSelect === 2 ? "button-selected" : "button-not-selected"}
            onClick={() => setAriaSelect(2)}
          >
            ĐƠN HÀNG & NHẬP KHO
          </button>
          <button
            id={ariaSelect === 3 ? "button-selected" : "button-not-selected"}
            onClick={() => setAriaSelect(3)}
          >
            HỘP THƯ
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="main-page-body">
        {ariaSelect === 0 ? (
          <div className="main-account-area">
            <div id="accountPage-container">
              <EditInformation
                OpenEdit={OpenEdit}
                setOpenEdit={setOpenEdit}
                userId={currentUser?.currentUser?._id}
              />
              <div className="user-infor">
                <h3>THÔNG TIN TÀI KHOẢN</h3>
                <p className="wellcome">
                  <i>
                    Xin Chào,
                    <b> {currentUser?.currentUser?.name}</b>
                  </i>
                </p>
                <p className="infor">THÔNG TIN KHÁCH HÀNG</p>
                <div className="name field">
                  <img src="/images/acc.png" alt="" /> <b>Họ và tên:</b>{" "}
                  <span>{currentUser?.currentUser?.name}</span>
                </div>
                <div className="mail field">
                  <img src="/images/mail.png" alt="" /> <b>Email:</b>{" "}
                  <span>{currentUser?.currentUser?.email}</span>
                </div>
                <div className="phone field">
                  <img src="/images/tell.png" alt="" /> <b>Số điện thoại:</b>{" "}
                  <span>
                    {currentUser?.currentUser?.phone || "Đang cập nhật"}
                  </span>
                </div>
                <div className="address field">
                  <img src="/images/address.png" alt="" /> <b>Địa chỉ:</b>{" "}
                  <span>
                    {currentUser?.currentUser?.address || "Đang cập nhật"}
                  </span>
                </div>
                <div className="gender field">
                  <img src="/images/gender.png" alt="" /> <b>Giới tính:</b>{" "}
                  <span>
                    {currentUser?.currentUser?.gender || "Đang cập nhật"}
                  </span>
                </div>
                <div className="birthday field">
                  <img src="/images/day.png" alt="" /> <b>Ngày sinh:</b>{" "}
                  <span>
                    {currentUser?.currentUser?.dateOfBirth || "Đang cập nhật"}
                  </span>
                </div>
                <div className="btn edit" onClick={() => setOpenEdit(true)}>
                  <button>Chỉnh sửa</button>
                </div>

                <div className="btn logout">
                  <button onClick={logout}>Đăng xuất</button>
                </div>
              </div>

              <div className="user-order">
                {openOrder ? (
                  <OrderDetail
                    order={orderInfor}
                    setOpenOrder={setOpenOrder}
                    openOrder={openOrder}
                  />
                ) : (
                  <></>
                )}
                <h3>ĐƠN HÀNG CỦA BẠN</h3>
                <div className="order-box">
                  {orderOfUser?.orders?.map((order, index) => (
                    <div key={index} className="order-wrapper">
                      <div className="main" onClick={() => handleOrder(order)}>
                        <div className="header">
                          <b>{order.storeId.name}</b>{" "}
                          <i>
                            <OrderStatus value={order.status} />
                          </i>
                        </div>
                        {order.items.map((item, index) => (
                          <div className="body" key={index}>
                            <img src={item.product.image} alt="" />
                            <div className="item-infor">
                              <p>{item.product.name}</p>
                              <p className="field">
                                <i>
                                  Phân loại:{" "}
                                  <b>
                                    <ProductType
                                      value={item.product.productType}
                                    />{" "}
                                  </b>
                                </i>
                              </p>

                              <p className=" price-quantity">
                                <i className="one">
                                  SL: <b>x{item.quantity}</b>
                                </i>
                                <i className="two">
                                  $: <b>{fCurrency(item.totalPrice)}đ</b>
                                </i>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="footer">
                        <img src="/images/price.png" alt="" />
                        <i>
                          <span>Thành tiền:</span>{" "}
                          <b>{fCurrency(order.totalPrice)}đ</b>
                        </i>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <PaginationControlled /> */}
              </div>
            </div>
          </div>
        ) : ariaSelect === 1 ? (
          <div className="main-manager-area">
            <ManagePage />
          </div>
        ) : ariaSelect === 2 ? (
          <div className="main-manager-area">
            <AdminPage />
          </div>
        ) : (
          <div className="main-manager-area">
            <MailBox />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;

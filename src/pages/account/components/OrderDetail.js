import React from "react";
import IconClose from "../../../components/IconClose";

import { fCurrency } from "../../../utils/numberFormat";

function OrderStatus({ value }) {
  return value === "pending" ? (
    <i>Chờ xác nhận</i>
  ) : value === "packing" ? (
    <i>Đang chuẩn bị</i>
  ) : value === "waiting" ? (
    <i>Chờ giao hàng</i>
  ) : value === "delivery" ? (
    <i>đang giao hàng</i>
  ) : value === "paymented" ? (
    <i>đã thanh toán</i>
  ) : value === "success" ? (
    <i>Giao hàng thành công</i>
  ) : value === "cancle" ? (
    <i>Hủy đơn hàng</i>
  ) : (
    <i></i>
  );
}

function OrderDetail({ order, setOpenOrder }) {
  return (
    <div id="order-detail">
      <div className="order-wrapper">
        <div className="close" onClick={() => setOpenOrder(false)}>
          <IconClose />
        </div>
        <div className="order-box">
          <div className="header">
            <div className="image">
              <img src="/images/logoBadminton.png" alt="" />
            </div>
            <div className="infor">
              <h1>BADMINTON STORE</h1>
              <p>
                <b>Mã đơn hàng: </b>
                <i>{order._id}</i>
              </p>
            </div>
          </div>

          <div className="address">
            <div className="from">
              <b>Từ</b>
              <p>{order.storeId.name}</p>
              <p>{order.storeId.phone}</p>
              <p>{order.storeId.address}</p>
            </div>
            <div className="to">
              <b>Đến</b>
              <p>{order.receiver}</p>
              <p>{order.phone}</p>
              <p>{order.address}</p>
            </div>
          </div>
          <div className="order-status">
            <div>
              <b>Trạng thái đơn hàng: </b>
              <span>
                <OrderStatus value={order.status} />
              </span>
            </div>
            <div>
              <b>Hình thức giao hàng: </b>
              <span>
                {" "}
                <i>
                  {order.receiving === "delivery"
                    ? "Giao hàng tận nơi"
                    : "lấy hàng tại shop"}
                </i>
              </span>
            </div>
          </div>

          <div className="order-infomation">
            <b>Nội dung đơn hàng (Tên sản phẩm, SL)</b>
            {order.items.map((item) => {
              return (
                <p>
                  - {item.product.name}, -<b>SL:</b> x{item.quantity}, -
                  <b>$: {fCurrency(item.totalPrice)}đ</b>
                </p>
              );
            })}
          </div>
          <div className="price">
            <p>
              <b>Tổng tiền</b>
            </p>
            <div>
              <b>{fCurrency(order.totalPrice)} VND</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;

import React from "react";

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

export default OrderStatus;

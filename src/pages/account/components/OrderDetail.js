import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

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

function OrderDetail({ order }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        p: "30px 10px",
      }}
    >
      <Box sx={{ bgcolor: "#2222", maxHeight: 600, overflow: "auto" }}>
        <Box sx={{ border: "1px solid #000" }}>
          <Typography sx={{ flexGrow: 1 }} variant="h4" textAlign="center">
            BADMINTON STORE
          </Typography>
          <Typography sx={{ flexGrow: 1 }} variant="body1" textAlign="center">
            <b>Mã đơn hàng:</b> <i>{order._id}</i>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, border: "1px solid #000", p: "10px" }}>
          <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 2 }}>
            <Grid item xs={1} sm={1} md={1}>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                <b>Từ:</b>
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                {order.storeId.name}
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                {order.storeId.phone}
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                {order.storeId.address}
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                <b>Đến:</b>
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                {order.receiver}
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                {order.phone}
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                {order.address}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, border: "1px solid #000", p: "10px" }}>
          <Typography sx={{ flexGrow: 1 }} variant="body1">
            <b>Trạng thái đơn hàng:</b>
            <OrderStatus value={order.status} />
          </Typography>
          <Typography sx={{ flexGrow: 1 }} variant="body1">
            <b>Hình thức giao hàng:</b>
            <i>
              {order.receiving === "delivery"
                ? "Giao hàng tận nơi"
                : "lấy hàng tại shop"}
            </i>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, border: "1px solid #000", p: "10px" }}>
          <Typography sx={{ flexGrow: 1 }} variant="body1">
            <b>Nội dung đơn hàng (Tên sản phẩm, SL)</b>
          </Typography>
          {order.items.map((item) => (
            <Typography sx={{ flexGrow: 1, mt: 2 }} variant="body1">
              -<span>{item.product.name}</span> -{" "}
              <span>
                <b>SL:</b>x{item.quantity}
              </span>{" "}
              -{" "}
              <span>
                <b>$:</b>
                {fCurrency(item.totalPrice)}đ
              </span>
            </Typography>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1, border: "1px solid #000", p: "10px" }}>
          <Typography sx={{ flexGrow: 1 }} variant="body1">
            <b>Tổng tiền</b>
          </Typography>
          <Typography
            sx={{ flexGrow: 1, mt: 2 }}
            variant="h4"
            textAlign="center"
          >
            <b>{fCurrency(order.totalPrice)} VND</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderDetail;

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/userAuth";

import { getOrderOfUser } from "../../features/Order/OrderSlice";
import { getCurrentUser } from "../../features/User/UserSlice";

import CircularProgress from "@mui/material/CircularProgress";

import { fCurrency } from "../../utils/numberFormat";

import ManagePage from "../managerPage/ManagePage";
import AdminPage from "../adminPage/AdminPage";

import OrderStatus from "../../components/OrderStatus";
import ProductType from "../../components/ProductType";
import OrderDetail from "./components/OrderDetail";
import EditInformation from "./components/EditInformation";
import MailBox from "./components/MailBox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TransgenderIcon from "@mui/icons-material/Transgender";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Modal from "@mui/material/Modal";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1,
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};

function AccountPage() {
  const { logout } = useAuth();

  const dispatch = useDispatch();

  const { orderOfUser, isLoading } = useSelector((state) => state.order);

  const { currentUser, isLoading: loadUserMe } = useSelector(
    (state) => state.user
  );

  const [orderInfor, setOrderInfor] = useState({});

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderOfUser({ userId: currentUser?.currentUser?._id }));
  }, [dispatch, currentUser]);

  const [ariaSelect, setAriaSelect] = useState("one");

  const handleChange = (event, newValue) => {
    setAriaSelect(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openOrder, setOpenOrder] = useState(false);
  const handleOpenOrder = () => setOpenOrder(true);
  const handleCloseOrder = () => setOpenOrder(false);

  const handleOrder = (order) => {
    setOrderInfor(order);
    handleOpenOrder();
  };

  return isLoading & loadUserMe ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        p: "0 10px",
      }}
    >
      <Box sx={{ width: 1, maxWidth: 1200 }}>
        <Tabs
          value={ariaSelect}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="one" label="Tài khoản" />
          <Tab value="two" label="Quản lý" />
          <Tab value="three" label="Đơn hàng & Nhập kho" />
          <Tab value="Four" label="Hộp thư" />
        </Tabs>
        {ariaSelect === "one" ? (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={{ xs: 3, sm: 3, md: 7 }}>
                <Grid item xs={2} sm={2} md={2}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    <b>THÔNG TIN TÀI KHOẢN</b>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Xin Chào,
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="#e95220"
                    >
                      <b> {currentUser?.currentUser?.name}</b>
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    THÔNG TIN KHÁCH HÀNG
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    <PersonIcon sx={{ color: "#e95220", mr: 2 }} />
                    <b>Họ và tên:</b>
                    <span> {currentUser?.currentUser?.name}</span>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    <LocalPostOfficeIcon sx={{ color: "#e95220", mr: 2 }} />
                    <b>Email:</b>
                    <span>{currentUser?.currentUser?.email}</span>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    <PhoneInTalkIcon sx={{ color: "#e95220", mr: 2 }} />
                    <b>Số điện thoại:</b>
                    <span>
                      {currentUser?.currentUser?.phone || "Đang cập nhật"}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    <LocationOnIcon sx={{ color: "#e95220", mr: 2 }} />
                    <b>Địa chỉ:</b>
                    <span>
                      {currentUser?.currentUser?.address || "Đang cập nhật"}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    <TransgenderIcon sx={{ color: "#e95220", mr: 2 }} />
                    <b>Giới tính:</b>
                    <span>
                      {currentUser?.currentUser?.gender || "Đang cập nhật"}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    <CalendarMonthIcon sx={{ color: "#e95220", mr: 2 }} />
                    <b>Ngày sinh:</b>
                    <span>
                      {currentUser?.currentUser?.dateOfBirth || "Đang cập nhật"}
                    </span>
                  </Typography>

                  <ColorButton
                    onClick={handleOpen}
                    size="large"
                    variant="contained"
                    sx={{ mt: 2, width: 1 }}
                  >
                    Chỉnh sửa
                  </ColorButton>
                  <ColorButton
                    onClick={logout}
                    size="large"
                    variant="contained"
                    sx={{ mt: 2, width: 1 }}
                  >
                    Đăng xuất
                  </ColorButton>
                </Grid>

                <Grid item xs={3} sm={3} md={5}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    <b>ĐƠN HÀNG CỦA BẠN</b>
                  </Typography>
                  <Box sx={{ maxHeight: 600, overflow: "auto" }}>
                    {orderOfUser?.orders?.map((order, index) => (
                      <Box key={index} sx={{ mt: 2 }}>
                        <Box
                          onClick={() => handleOrder(order)}
                          sx={{
                            bgcolor: "#fff7ea",
                            p: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <Typography variant="subtitle1">
                            <b>{order.storeId.name}</b>{" "}
                            <OrderStatus value={order.status} />
                          </Typography>

                          {order.items.map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                pt: "10px",
                                borderTop: "1px solid #2222",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box sx={{ width: 100 }}>
                                <AspectRatio
                                  ratio="1"
                                  sx={{
                                    width: 100,
                                    borderRadius: 5,
                                    border: "1px solid #2222",
                                  }}
                                >
                                  <img src={item.product.image} alt="product" />
                                </AspectRatio>
                              </Box>
                              <Box
                                sx={{
                                  flexGrow: 1,
                                  p: "0 10px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography variant="subtitle1">
                                  {item.product.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                  <i>
                                    Phân loại:{" "}
                                    <ProductType
                                      value={item.product.productType}
                                    />
                                  </i>
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography variant="subtitle1">
                                    <i>
                                      SL: <b>x{item.quantity}</b>
                                    </i>
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    <i>
                                      $ <b>{fCurrency(item.totalPrice)}đ</b>
                                    </i>
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        <Box
                          sx={{
                            bgcolor: "#faebd7",
                            p: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <MonetizationOnIcon
                            sx={{ color: "#e95220", fontSize: 40 }}
                          />
                          <Typography variant="h5">
                            <i>Thành tiền:</i>
                          </Typography>
                          <Typography variant="h5" color="#e95220">
                            <i> {fCurrency(order.totalPrice)}đ</i>
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : ariaSelect === "two" ? (
          <ManagePage />
        ) : ariaSelect === "three" ? (
          <AdminPage />
        ) : (
          <MailBox />
        )}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <EditInformation
            userId={currentUser?.currentUser?._id}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

      <Modal open={openOrder} onClose={handleCloseOrder}>
        <Box sx={style}>
          <OrderDetail order={orderInfor} handleCloseOrder={handleCloseOrder} />
        </Box>
      </Modal>
    </Box>
  );
}

export default AccountPage;

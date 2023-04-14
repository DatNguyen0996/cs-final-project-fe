import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import TextField from "@mui/material/TextField";

import { FormProvider, FTextField, FRadioGroup } from "../components/form";

import { deleteCart } from "../features/Cart/CartSlice";
import { createOrder } from "../features/Order/OrderSlice";
import { getCurrentUser } from "../features/User/UserSlice";

import { fCurrency } from "../utils/numberFormat";

const orderSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Yêu cầu Email"),
  receiver: Yup.string().required("Yêu cầu Tên người nhận"),
  phone: Yup.string().required("Yêu cầu số điện thoại người nhận"),
  address: Yup.string().required("Yêu cầu địa chỉ nhận hàng"),
  payment: Yup.string().required("Yêu cầu hình nhức thanh toán"),
});

const defaultValues = {
  receiver: "",
  phone: "",
  address: "",
  email: "",
  payment: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function PaymentPage() {
  const dispatch = useDispatch();
  const navitate = useNavigate();
  // const { user } = useAuth();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector((state) => state.user);

  const methods = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues,
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue("email", currentUser?.currentUser?.email);
    setValue("receiver", currentUser?.currentUser?.name);
    setValue("phone", currentUser?.currentUser?.phone);
    setValue("address", currentUser?.currentUser?.address);
  }, [setValue, currentUser, dispatch]);

  const { preOrder } = useSelector((state) => state.cart);

  let totalPrice = 0;
  let items = [];
  preOrder?.map((cart) => {
    let item = {
      product: cart.productId._id,
      quantity: cart.quantity,
      totalPrice: cart.price,
    };
    items.push(item);
    return (totalPrice = cart.price + totalPrice);
  });

  const onSubmit = (data) => {
    const dataSubmit = {
      ...data,
      items,
      totalPrice,
      userId: currentUser.currentUser._id,
      storeId: preOrder[0].storeId._id,
    };
    dispatch(createOrder(dataSubmit));
    preOrder?.map((cart) => dispatch(deleteCart(cart._id)));
    navitate(`/cart`);
  };

  return (
    <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
      <Box sx={{ flexGrow: 1, maxWidth: 1200, p: "10px" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 5, md: 2 }}>
            <Grid item xs={1} sm={2} md={1}>
              <Typography variant="h6" gutterBottom>
                <b>THÔNG TIN NGƯỜI NHẬN</b>
              </Typography>
              <Box sx={{ p: { xs: "5px", sm: "10px", md: "20px" } }}>
                <FTextField
                  name="receiver"
                  sx={{ width: 1, mb: "20px" }}
                  label="Tên người nhận"
                />
                <FTextField
                  name="phone"
                  sx={{ width: 1, mb: "20px" }}
                  label="Số điện thoại người nhận"
                />
                <FTextField
                  name="address"
                  sx={{ width: 1, mb: "20px" }}
                  label="Địa chỉ nhận hàng"
                />

                <FTextField
                  name="email"
                  sx={{ width: 1, mb: "20px" }}
                  label="Email người đặt hàng"
                />

                <Typography variant="h6" gutterBottom>
                  <b>Thanh toán</b>
                </Typography>
                <FRadioGroup
                  name="payment"
                  options={["banking", "cash"]}
                  getOptionLabel={[
                    "Thanh toán qua ngân hàng",
                    "Thanh toán khi nhận hàng",
                  ]}
                />
              </Box>
            </Grid>
            <Grid item xs={1} sm={3} md={1}>
              <Typography variant="h6" gutterBottom>
                <b>THÔNG TIN ĐƠN HÀNG</b>
              </Typography>
              <Box sx={{ p: { xs: "5px", sm: "10px", md: "20px" } }}>
                {preOrder?.map((cart, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 1,
                      border: "1px solid #2222",
                      borderRadius: 2,
                      overflow: "hidden",
                      mb: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 1,
                        bgcolor: "#e95220",
                        color: "#fff",
                        p: "10px",
                      }}
                    >
                      <b>{cart.productId.name}</b>
                    </Box>
                    <Box sx={{ p: "10px" }}>
                      <Grid
                        container
                        spacing={1}
                        columns={{ xs: 3, sm: 3, md: 4 }}
                      >
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            disabled
                            label="Mã SP"
                            type="text"
                            value={cart.productId.code}
                            sx={{ width: 100, m: "10px 5px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            disabled
                            label="Số lượng"
                            type="number"
                            value={cart.quantity}
                            sx={{ width: 100, m: "10px 5px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            disabled
                            label="Giá-VND"
                            type="text"
                            value={fCurrency(cart.price)}
                            sx={{ width: 130, m: "10px 5px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sm={3}
                          md={1}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AspectRatio
                            ratio="1"
                            sx={{
                              width: 100,
                              borderRadius: 5,
                              border: "1px solid #2222",
                            }}
                          >
                            <img src={cart.productId.image} alt="product" />
                          </AspectRatio>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                ))}
              </Box>
              <hr />
              <Box sx={{ display: "flex", p: "5px 20px" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  <b>Tổng tiền</b>
                </Typography>
                <Typography variant="h6" sx={{ color: "red" }}>
                  <b>{fCurrency(totalPrice)}đ</b>
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="text"
                  sx={{ mt: 2 }}
                  onClick={() => navitate(`/cart`)}
                >
                  Quay lại giỏ hàng
                </Button>
                <ColorButton
                  size="large"
                  variant="contained"
                  sx={{ width: 1 }}
                  type="submit"
                >
                  Xác nhận đặt hàng
                </ColorButton>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default PaymentPage;

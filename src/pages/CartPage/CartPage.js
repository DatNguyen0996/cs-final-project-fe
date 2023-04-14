import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Item from "./components/Item";

import { deleteCart, getCart, preOrder } from "../../features/Cart/CartSlice";

import { getCurrentUser } from "../../features/User/UserSlice";

import { getAllStore } from "../../features/Store/StoreSlice";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function CartPage() {
  const navitate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCart({ userId: currentUser?.currentUser?._id }));
    dispatch(getAllStore());
  }, [dispatch, currentUser]);

  const handleDeleteCart = (cartId) => {
    dispatch(deleteCart(cartId));
    dispatch(getCart({ userId: currentUser?.currentUser?._id }));
  };

  const { cart } = useSelector((state) => state.cart);
  let totalPrice = 0;
  cart?.carts?.map((e) => {
    return (totalPrice = e.price * e.quantity + totalPrice);
  });

  const { register, handleSubmit } = useForm();

  const onsubmit = async (data) => {
    await dispatch(preOrder(cart?.carts, data)).then(() =>
      navitate("/order/payment")
    );
  };

  const [selecion, setSelecion] = useState(null);
  const [count, setCount] = useState(0);

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: 1, maxWidth: 1200 }}>
        <Typography
          variant="h5"
          sx={{ width: 1, bgcolor: "#e1f1ff", p: 2, borderRadius: 2, mb: 3 }}
          textAlign="center"
        >
          <b>GIỎ HÀNG CỦA BẠN</b>
        </Typography>
        {cart?.carts?.map((cart, index) => (
          <Item
            key={index}
            index={index}
            cart={cart}
            user={currentUser}
            register={register}
            handleDeleteCart={handleDeleteCart}
            setSelecion={setSelecion}
            selecion={selecion}
            count={count}
            setCount={setCount}
          />
        ))}

        <ColorButton
          onClick={handleSubmit(onsubmit)}
          size="large"
          variant="contained"
          sx={{ mt: 3, width: 1 }}
        >
          Thanh toán
        </ColorButton>
      </Box>
    </Box>
  );
}

export default CartPage;

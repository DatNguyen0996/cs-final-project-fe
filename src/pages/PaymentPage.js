import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../style/paymentPage.style.css";

// import useAuth from "../hooks/userAuth";
import { deleteCart } from "../features/Cart/CartSlice";
import { createOrder } from "../features/Order/OrderSlice";
import { getCurrentUser } from "../features/User/UserSlice";

import LoadingScreen from "../components/LoadingScreen";

import { fCurrency } from "../utils/numberFormat";

const orderSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Yêu cầu Email"),
  receiver: Yup.string().required("Yêu cầu Tên người nhận"),
  phone: Yup.string().required("Yêu cầu số điện thoại người nhận"),
  address: Yup.string().required("Yêu cầu địa chỉ nhận hàng"),
  payment: Yup.string().required("Yêu cầu hình nhức thanh toán"),
});

function PaymentPage() {
  const dispatch = useDispatch();
  const navitate = useNavigate();
  // const { user } = useAuth();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(orderSchema) });

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
    <div id="paymentPage-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="user-infor">
          <h3>THÔNG TIN NGƯỜI NHẬN</h3>
          <div className="field">
            <label htmlFor="">Tên người nhận</label>
            <input type="text" {...register("receiver")} />
            {errors.receiver && (
              <p className="error">{errors.receiver?.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="">Số điện thoại người nhận</label>
            <input type="number" {...register("phone")} />
            {errors.phone && <p className="error">{errors.phone?.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="">Địa chỉ nhận hàng</label>
            <input type="text" {...register("address")} />
            {errors.address && (
              <p className="error">{errors.address?.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="">Email người đặt hàng</label>
            <input type="text" {...register("email")} />
            {errors.email && <p className="error">{errors.email?.message}</p>}
          </div>

          <div className="field-radio">
            <p htmlFor="">Thanh toán</p>
            <div className="box">
              <input
                {...register("payment")}
                value="cash"
                type="radio"
                id="selectone"
              />{" "}
              <label htmlFor="selectone">Thanh toán khi nhận hàng</label>
            </div>
            <div className="box">
              <input
                {...register("payment")}
                value="banking"
                type="radio"
                id="selecttwo"
              />{" "}
              <label htmlFor="selecttwo">Thanh toán qua ngân hàng</label>
            </div>
            {errors.payment && (
              <p className="error">{errors.payment?.message}</p>
            )}
          </div>
        </div>
        <div className="order-infor">
          <h3>THÔNG TIN ĐƠN HÀNG</h3>
          <div className="order-main-wrapper">
            {preOrder?.map((cart, index) => (
              <div key={index} className="order-wrapper">
                <div className="header">{cart.productId.name}</div>
                <div className="infor">
                  <img src={cart.productId.image} alt="img" />
                  <div className="box">
                    <p className="code">{cart.productId.code}</p>
                    <p className="quantity">{`x${cart.quantity}`}</p>
                    <p className="price">{fCurrency(cart.price)}đ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-price">
            <p>Tổng tiền</p>
            <p className="price">{fCurrency(totalPrice)}đ</p>
          </div>
          <div className="confirm">
            <p className="go-back" onClick={() => navitate(`/cart`)}>
              Quay lại giỏ hàng
            </p>
            <button className="done">
              {isSubmitting ? <LoadingScreen /> : "Xác nhận đặt hàng"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentPage;

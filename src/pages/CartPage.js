import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fCurrency } from "../utils/numberFormat";

import "../style/cartPage.style.css";

import {
  deleteCart,
  getCart,
  updateCart,
  preOrder,
} from "../features/Cart/CartSlice";

import { getCurrentUser } from "../features/User/UserSlice";

import { getAllStore } from "../features/Store/StoreSlice";

import IconClose from "../components/IconClose";

function ItemQuantity({ cartId, quantity, user }) {
  const [numberItem, setNumberItem] = useState(quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCart({ quantity: numberItem }, cartId));
    dispatch(getCart({ userId: user?.currentUser?._id }));
  }, [numberItem, dispatch, cartId, user]);

  const handleAdd = () => {
    setNumberItem(numberItem + 1);
  };
  const handleSub = () => {
    if (numberItem > 0) {
      setNumberItem(numberItem - 1);
    } else {
      setNumberItem(0);
    }
  };

  return (
    <div className="quantity">
      <button onClick={handleSub}>-</button>

      <input
        disabled={true}
        type="number"
        value={numberItem}
        onChange={(e) => setNumberItem(e.currentTarget.value)}
      />

      <button onClick={handleAdd}>+</button>
    </div>
  );
}

function CheckInput({ register, index, selecion, cart, setSelecion }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    isChecked ? setSelecion(cart.storeId._id) : setSelecion(null);
  }, [isChecked, cart, setSelecion]);

  return (
    <input
      {...register(`cart${index}`)}
      name={`cart${index}`}
      type="checkbox"
      checked={isChecked}
      disabled={selecion !== null && selecion !== cart.storeId._id}
      onChange={handleOnChange}
      value={cart._id}
    />
  );
}

function CartPage() {
  const navitate = useNavigate();
  // const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.currentUser);

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

  const [selecion, setSelecion] = useState(null);

  const { register, handleSubmit } = useForm();

  const onsubmit = async (data) => {
    await dispatch(preOrder(cart?.carts, data)).then(() =>
      navitate("/order/payment")
    );
  };

  return (
    <div id="cartPage-container">
      {/* <form> */}
      <div className="field">
        <div className="title-wrapper">
          <div className="title">
            <p>Giỏ hàng của bạn</p>
          </div>
        </div>
      </div>
      <div className="body">
        {cart?.carts?.map((cart, index) => (
          <div key={index} className="item">
            <div className="header">
              <p>
                <CheckInput
                  register={register}
                  index={index}
                  selecion={selecion}
                  cart={cart}
                  setSelecion={setSelecion}
                />

                {"  "}
                {cart.productId.name}
              </p>
              <IconClose
                cartId={cart._id}
                handleDeleteCart={handleDeleteCart}
              />
            </div>
            <div className="infor">
              <img src={cart.productId.image} alt="item" />
              <div className="wrapper">
                <ItemQuantity
                  cartId={cart._id}
                  quantity={cart.quantity}
                  user={currentUser}
                />
                <p className="size">{`Size: ${cart.size}`}</p>
                <div className="store">{<p>{`${cart.storeId.name}`}</p>}</div>
                <div className="price">
                  <p>
                    {fCurrency(
                      ((cart.price * (100 - cart.productId.saleOff)) / 100) *
                        cart.quantity
                    )}
                    đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="payment">
        <div className="infor"></div>
        <button onClick={handleSubmit(onsubmit)}>THANH TOÁN</button>
      </div>
      {/* </form> */}
    </div>
  );
}

export default CartPage;

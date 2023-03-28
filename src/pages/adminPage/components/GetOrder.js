/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconOpen from "../../../components/IconOpen";

import {
  getOrderOfStore,
  updateOrder,
} from "../../../features/Order/OrderSlice";

import ProductType from "../../../components/ProductType";

function RenderOrder({ order }) {
  const dispatch = useDispatch();

  return (
    <div className="order-wrapper">
      <div className="main">
        <div className="header">
          <select
            onChange={(e) =>
              dispatch(
                updateOrder({ status: e.currentTarget.value }, order._id)
              )
            }
          >
            <option value="pending">Chờ xác nhận</option>
            <option value="packing">Đang chuẩn bị</option>
            <option value="waiting">Chờ giao hàng</option>
            <option value="delivery">đang giao hàng</option>
            <option value="paymented">đã thanh toán</option>
            <option value="success">Giao hàng thành công</option>
            <option value="cancle">Hủy đơn hàng</option>
          </select>
        </div>
        {order.items.map((item, index) => (
          <div className="body" key={index}>
            <img src={item.product.image} alt="" />
            <div className="item-infor">
              <p>{item.product.name}</p>
              <p className="productType">
                <i>
                  Phân loại:
                  <b>
                    <ProductType value={item.product.productType} />
                  </b>
                </i>
              </p>

              <p className=" price-quantity">
                <i className="one">
                  SL: <b>x{item.quantity}</b>
                </i>
                <i className="two">
                  $: <b>{item.totalPrice}đ</b>
                </i>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <img src="/images/price.png" alt="" />
        <i>
          <span>Thành tiền:</span> <b>{order.totalPrice}đ</b>
        </i>
      </div>
    </div>
  );
}

function GetOrder() {
  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(false);
  const [storeId, setStoreId] = useState("");
  const { stores } = useSelector((state) => state.store);
  const { orderOfStore } = useSelector((state) => state.order);

  useEffect(() => {
    if (storeId !== "") dispatch(getOrderOfStore({ storeId }));
  }, [dispatch, storeId]);
  // console.log(countOrders);

  return (
    <div className="field">
      <div className="title-wrapper">
        <div className="title">
          <p>Đơn Hàng</p>
          <select
            onChange={(e) => setStoreId(e.currentTarget.value)}
            value={storeId}
          >
            <option value={null}>Chọn cửa hàng</option>
            {stores?.stores?.map((store, index) => (
              <option key={index} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
        <IconOpen rotation={rotation} setRotation={setRotation} />
      </div>

      {rotation ? (
        <div id="store-order">
          <div className="order-box">
            <p>
              {orderOfStore?.countOrders === 0 ? "Không có đơn hàng nào" : ""}
            </p>
            {orderOfStore?.orders?.map((order, index) => (
              <RenderOrder order={order} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GetOrder;

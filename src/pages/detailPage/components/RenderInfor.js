import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllProductStore } from "../../../features/ProductsOfStore/ProductsOfStoreSlice";
import { createCart } from "../../../features/Cart/CartSlice";

import LoadingScreen from "../../../components/LoadingScreen";

import { fCurrency } from "../../../utils/numberFormat";

function RenderInfor({ productId, userId }) {
  const navitate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [isSelected, setIsSelected] = useState();
  const [quantityMax, setQuantityMax] = useState(0);

  const [noti, setNoti] = useState(null);

  const { singleProduct, isLoading: loadingProduct } = useSelector(
    (state) => state.product
  );

  const { allProductStore, isLoading: loadingStore } = useSelector(
    (state) => state.productsOfStore
  );

  let checkWeight;

  if (allProductStore.countProductOfOneStore === undefined) {
    checkWeight = 0;
  } else {
    checkWeight = allProductStore.countProductOfOneStore;
  }

  const { isLoading: addCart } = useSelector((state) => state.cart);
  const { stores } = useSelector((state) => state.store);

  const [storeId, setStoreId] = useState();

  const handleAdd = () => {
    if (quantity >= quantityMax) {
      setQuantity(quantityMax);
    } else setQuantity(quantity + 1);
  };
  const handlesub = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else setQuantity(quantity - 1);
  };

  const dispatch = useDispatch();

  const handleStoreSelect = (storeId) => {
    setStoreId(storeId);
  };

  useEffect(() => {
    dispatch(
      getAllProductStore({
        storeId: storeId,
        productCode: singleProduct?.product?.code,
      })
    );
  }, [dispatch, storeId, singleProduct]);

  const handleAddToCart = () => {
    if (quantity === 0 && isSelected === undefined) {
      setNoti("Chưa chọn kích thuớc và số lượng");
    } else if (quantity === 0) {
      setNoti("Chưa chọn số lượng");
    } else if (isSelected === undefined) {
      setNoti("Chưa chọn kích thước");
    } else {
      dispatch(
        createCart({
          userId: userId,
          productId: productId,
          productCode: singleProduct?.product?.code,
          size: isSelected,
          quantity: quantity,
          storeId: storeId,
          price: singleProduct?.product?.price,
        })
      );
      setIsSelected(null);
      setNoti(null);
      setQuantity(0);
    }
  };

  return loadingProduct && loadingStore ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="detail-wrapper">
        <div className="image">
          <img src={singleProduct?.product?.image} alt="product" />
        </div>
        <div className="infor">
          <div className="general-infor">
            <h1>{singleProduct?.product?.name}</h1>
            <p>
              Mã sản phẩm: <span>{singleProduct?.product?.code}</span>
            </p>
            <p>
              Thương hiệu: <span>{singleProduct?.product?.brand}</span>
            </p>

            <p>
              KHUYẾN MÃI:{" "}
              <span>
                <b>-{singleProduct?.product?.saleOff}%</b>
              </span>
            </p>
            <p className="price">
              Giá Thành:{"  "}
              {singleProduct?.product?.special ? (
                <>
                  <del>
                    <span>{fCurrency(singleProduct?.product?.price)}đ</span>
                  </del>{" "}
                  <span>
                    <b>
                      {fCurrency(
                        singleProduct?.product?.price *
                          ((100 - singleProduct?.product?.saleOff) / 100)
                      )}
                      đ
                    </b>
                  </span>
                </>
              ) : (
                <span>{fCurrency(singleProduct?.product?.price)}đ</span>
              )}
            </p>
          </div>
          <hr />
          <div className="stock-infor">
            <h4>HỆ THỐNG CỬA HÀNG</h4>

            {stores?.stores?.map((store, index) => (
              <p
                onClick={() => handleStoreSelect(store._id)}
                key={index}
                className={
                  storeId === store._id
                    ? "store-selected"
                    : "store-not-selected"
                }
              >
                {store.name}
              </p>
            ))}
          </div>
          <hr />
          <div className="select-item">
            <h4>THÊM VÀO GIỎ HÀNG</h4>
            <div className="select-size">
              <p>Lựa chọn kích thước/ trọng lượng</p>

              {checkWeight !== 0 &&
              singleProduct?.product?.productType === "racket" ? (
                allProductStore?.productOfOneStore?.map((product, index) => (
                  <button
                    key={index}
                    className={
                      isSelected === singleProduct?.product?.weight
                        ? "productSizeIsSelected"
                        : "productSizeIsNotSelected"
                    }
                    onClick={() => {
                      setIsSelected(singleProduct?.product?.weight);
                      setQuantityMax(product.quantity);
                    }}
                  >
                    {singleProduct?.product?.weight}
                  </button>
                ))
              ) : singleProduct?.product?.productType === "accessory" ? (
                <></>
              ) : (
                allProductStore?.productOfOneStore?.map((product, index) => (
                  <button
                    key={index}
                    className={
                      isSelected === product.productSize
                        ? "productSizeIsSelected"
                        : "productSizeIsNotSelected"
                    }
                    onClick={() => {
                      setIsSelected(product.productSize);
                      setQuantityMax(product.quantity);
                    }}
                  >
                    {product.productSize}
                  </button>
                ))
              )}
            </div>
            <div className="add-cart-box">
              <div className="add-cart">
                <div className="quantity-select">
                  <button onClick={handlesub}>-</button>{" "}
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.currentTarget.value)}
                  />
                  <button onClick={handleAdd}>+</button>
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>
                  {addCart ? <LoadingScreen /> : "THÊM"}
                </button>
              </div>
              {noti ? <p>{noti}</p> : <></>}
            </div>
          </div>
          <hr />
          <div className="product-list">
            <h4>DANH SÁCH SẢN PHẨM</h4>
            <p onClick={() => navitate("/listOfItem/racket/1")}>Vợt cầu lông</p>
            <p onClick={() => navitate("/listOfItem/shoe/1")}>Giày cầu lông</p>
            <p onClick={() => navitate("/listOfItem/shirt/1")}>Áo cầu lông</p>
            <p onClick={() => navitate("/listOfItem/shorts/1")}>
              Quần cầu lông
            </p>
            <p onClick={() => navitate("/listOfItem/sportDress/1")}>
              Váy cầu lông
            </p>
            <p onClick={() => navitate("/listOfItem/accessory/1")}>
              Phụ kiện cầu lông
            </p>
          </div>
        </div>
      </div>
      <div className="description-wrapper">
        <h2>Mô tả sản phẩm</h2>
        <hr />
        <div className="intro">
          <h3>{singleProduct?.product?.name}</h3>
          <p>{singleProduct?.product?.description}</p>
        </div>
      </div>
      <div className="description-wrapper">
        <h2>Thông số kỹ thuật</h2>
        <hr />
        <div className="spec">
          <div className="field">
            <h4>Trình Độ Chơi:</h4>
            <p>{singleProduct?.product?.levelOfPlay}</p>
          </div>
          <div className="field">
            <h4>Nội Dung Chơi:</h4>
            <p>{singleProduct?.product?.formality}</p>
          </div>
          <div className="field">
            <h4>Phong Cách Chơi:</h4>
            <p>{singleProduct?.product?.playStyle}</p>
          </div>
          <div className="field">
            <h4>Độ Cứng Đũa:</h4>
            <p>{singleProduct?.product?.hardness}</p>
          </div>
          <div className="field">
            <h4>Điểm Cân Bằng:</h4>
            <p>{singleProduct?.product?.balancedPoint}</p>
          </div>
          <div className="field">
            <h4>Trọng Lượng:</h4>
            <p>{singleProduct?.product?.weight}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default RenderInfor;

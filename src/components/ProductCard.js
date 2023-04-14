import React from "react";
import { useNavigate } from "react-router-dom";

import { fCurrency } from "../utils/numberFormat";

import "../style/style.Card.css";

function ProductCard({ product }) {
  const navitate = useNavigate();
  return (
    <div className="card" onClick={() => navitate(`/detail/${product._id}`)}>
      <div className="img-box">
        {product.special ? (
          <>
            <div className="saleOff">
              <img src="/images/sale.png" alt="" />
              <i>{product.saleOff}%</i>
            </div>
            <div className="priceSale">
              {fCurrency(product.price * ((100 - product.saleOff) / 100))}đ
            </div>
          </>
        ) : (
          <></>
        )}

        <img src={`${product.image}`} alt="" />
        <div className="infor">
          <div className="name">{product.name}</div>
          <div className="price">
            {product.special ? (
              <del>{fCurrency(product.price)}đ</del>
            ) : (
              <p>{fCurrency(product.price)}đ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
//
export default ProductCard;

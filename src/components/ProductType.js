import React from "react";

function ProductType({ value }) {
  return value === "racket" ? (
    <i>Vợt cầu lông</i>
  ) : value === "shoe" ? (
    <i>Giày cầu lông</i>
  ) : value === "shirt" ? (
    <i>Áo cầu lông</i>
  ) : value === "shorts" ? (
    <i>Quần cầu lông</i>
  ) : value === "sportDress" ? (
    <i>Váy cầu lông</i>
  ) : value === "accessory" ? (
    <i>Phụ kiện cầu lông</i>
  ) : (
    <i></i>
  );
}

export default ProductType;

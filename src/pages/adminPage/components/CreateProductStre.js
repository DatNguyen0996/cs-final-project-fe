import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
  getAllProductStore,
  creatProductOfStore,
} from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

import defaultProductCode from "./DefaultProductCode";

function CreateProductStre({ storeId }) {
  const dispatch = useDispatch();
  const [productType, setProductType] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    await dispatch(
      creatProductOfStore({
        productType: productType,
        productCode: data.productCode,
        store: storeId,
        quantity: data.quantity,
        productSize: data.productSize,
      })
    ).then(() => dispatch(getAllProductStore({ storeId: storeId })));
  };

  const { error } = useSelector((state) => state.productsOfStore);

  return (
    <div className="table">
      <table id="table-custom">
        <thead>
          <tr>
            <th width="25%">Kiểu sản phẩm</th>
            <th width="15%">Mã sản phẩm</th>
            <th width="15%">Kích thước</th>
            <th width="15%">Số lượng nhập</th>
            <th width="15%">Nhập kho</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select
                className="selection"
                onChange={(e) => {
                  setProductType(e.currentTarget.value);
                  defaultProductCode({
                    code: e.currentTarget.value,
                    setValue: setValue,
                  });
                }}
                value={productType}
              >
                <option value={""}>Chọn loại sản phẩm</option>
                <option value={"racket"}>Vợt cầu lông</option>
                <option value={"shoe"}>Giày cầu lông</option>
                <option value={"shirt"}>Áo cầu lông</option>
                <option value={"shorts"}>Quần cầu lông</option>
                <option value={"sportDress"}>Váy cầu lông</option>
                <option value={"accessory"}>Phụ kiện cầu lông</option>
              </select>
            </td>
            <td>
              <input
                disabled={productType === ""}
                type="text"
                {...register("productCode", { required: "Nhập Mã sản phẩm" })}
              />
              <p className="input-error">{errors.productCode?.message}</p>
            </td>
            <td>
              {productType === "racket" || productType === "accessory" ? (
                <p>-</p>
              ) : (
                <>
                  <input
                    disabled={productType === ""}
                    type="text"
                    {...register("productSize", {
                      required: "Nhập kích thước",
                    })}
                  />
                  <p className="input-error">{errors.productSize?.message}</p>
                </>
              )}
            </td>
            <td>
              <input
                type="number"
                {...register("quantity")}
                disabled={productType === ""}
              />
            </td>
            <td>
              <div className="edit">
                <button onClick={handleSubmit(onsubmit)}>
                  <img src="/images/add.png" alt="" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-notification">{error ? <p>{error}</p> : <></>}</div>
    </div>
  );
}

export default CreateProductStre;

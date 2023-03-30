import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import CreateProductFields from "./CreateProductFields";
import IconClose from "../../../components/IconClose";
import IconOpen from "../../../components/IconOpen";
import defaultProductCode from "./DefaultProductCode";

import {
  createProduct,
  updateProduct,
  getAllProduct,
} from "../../../features/Product/ProductSlice";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu tên sản phẩm"),
  code: Yup.string().required("Yêu cầu mã sản phẩm"),
  brand: Yup.string().required("Yêu cầu thương hiệu"),
  price: Yup.number("Giá sản phẩm phải là số").required("Yêu cầu giá sản phẩm"),
  saleOff: Yup.number("Phần trăm ưu đãi phải là số"),
});

function ProductForm({
  page,
  name,
  popup = false,
  setPopupEdit,
  formType = "create",
  product = {
    _id: "",
    productType: "",
    name: "",
    code: "",
    brand: "",
    price: "",
    gender: "",
    description: "",
    levelOfPlay: "",
    playStyle: "",
    formality: "",
    hardness: "",
    balancedPoint: "",
    weight: "",
    size: "",
    saleOff: "",
  },
}) {
  const [rotation, setRotation] = useState(false);
  const [productTypeLogic, setProductTypeLogic] = useState("");
  const fileInput = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(productSchema) });

  useEffect(() => {
    if (formType !== "create") {
      if (product.productType !== "") setProductTypeLogic(product.productType);
      setValue(`name`, product.name);
      setValue(`code`, product.code);
      setValue(`brand`, product.brand);
      setValue(`price`, product.price || 0);
      setValue(`gender`, product.gender);
      setValue(`description`, product.description);
      setValue(`levelOfPlay`, product.levelOfPlay);
      setValue(`playStyle`, product.playStyle);
      setValue(`formality`, product.formality);
      setValue(`hardness`, product.hardness);
      setValue(`balancedPoint`, product.balancedPoint);
      setValue(`weight`, product.weight);
      setValue(`size`, product.size);
      setValue(`saleOff`, product.saleOff || 0);
    } else {
      setValue(`price`, product.price || 0);
      setValue(`saleOff`, product.saleOff || 0);
    }
  }, [product, setValue, formType]);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const createInfor = {
      ...data,
      productType: productTypeLogic,
      special: data.saleOff > 0 ? true : false,
    };
    if (formType === "create") {
      await dispatch(createProduct(createInfor)).then(() => {
        reset();
        setProductTypeLogic("");
      });
      dispatch(getAllProduct({ page: 1, limit: 10 }));
    } else {
      dispatch(updateProduct(createInfor, product._id));
      dispatch(getAllProduct({ page: page, limit: 10 }));
      setPopupEdit({});
    }
  };

  const handleFile = (e) => {
    const file = fileInput.current.files[0];
    if (file) {
      setValue("image", file);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="create-product field">
        <div className="title-wrapper">
          <div className="title">
            <p>{name}</p>

            <select
              value={productTypeLogic}
              onChange={(e) => {
                setProductTypeLogic(e.currentTarget.value);
                defaultProductCode({
                  code: e.currentTarget.value,
                  setValue: setValue,
                });
              }}
            >
              <option value={""}>Chọn kiểu sản phẩm</option>
              <option value={"racket"}>Vợt cầu lông</option>
              <option value={"shoe"}>Giày cầu lông</option>
              <option value={"shirt"}>Áo cầu lông</option>
              <option value={"shorts"}>Quần cầu lông</option>
              <option value={"sportDress"}>Váy cầu lông</option>
              <option value={"accessory"}>Phụ kiện cầu lông</option>
            </select>
          </div>

          {popup ? (
            <IconClose setPopupInfor={setPopupEdit} />
          ) : (
            <IconOpen rotation={rotation} setRotation={setRotation} />
          )}
        </div>

        {popup ? (
          <CreateProductFields
            register={register}
            fileInput={fileInput}
            handleFile={handleFile}
            productTypeLogic={productTypeLogic}
            isSubmitting={isSubmitting}
            name={name}
            errors={errors}
          />
        ) : rotation ? (
          <CreateProductFields
            register={register}
            fileInput={fileInput}
            handleFile={handleFile}
            productTypeLogic={productTypeLogic}
            isSubmitting={isSubmitting}
            name={name}
            errors={errors}
          />
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}

export default ProductForm;

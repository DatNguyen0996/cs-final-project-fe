import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getAllProductStore,
  updateProductOfStore,
} from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

function UpdateQuantity({ quantity, id, storeId, setEnable }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity, setValue]);

  const onsubmit = async (data) => {
    await dispatch(updateProductOfStore(data, id)).then(() =>
      dispatch(getAllProductStore({ storeId: storeId }))
    );
    setEnable(true);
  };
  return (
    <div className="update-quantity">
      <input type="number" {...register("quantity")} />
      <button onClick={handleSubmit(onsubmit)}>
        <img src="/images/send.png" alt="" />
      </button>
    </div>
  );
}

export default UpdateQuantity;

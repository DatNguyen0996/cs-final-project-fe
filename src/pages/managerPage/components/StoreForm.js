import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  getAllStore,
  updateStore,
  createStore,
} from "../../../features/Store/StoreSlice";
import IconClose from "../../../components/IconClose";
import IconOpen from "../../../components/IconOpen";
import CreateStoreFields from "./CreateStoreFields";

const storeSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu tên chi nhánh"),
  phone: Yup.string().required("Yêu cầu số điện thoại"),
  address: Yup.string().required("Yêu cầu địa chỉ"),
});

function StoreForm({
  page,
  name,
  popup = false,
  setPopupEdit,
  formType = "create",
  store = {
    _id: "",
    address: "",
    administrator: "",
    entityType: "",
    name: "",
    phone: "",
    popup: false,
  },
  admins,
}) {
  const [rotation, setRotation] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(storeSchema) });

  let administrator = "";
  if (store.administrator !== null) {
    administrator = store.administrator._id;
  } else {
    administrator = "";
  }

  useEffect(() => {
    if (formType !== "create") {
      setValue(`name`, store.name);
      setValue(`phone`, store.phone);
      setValue(`administrator`, administrator);
      setValue(`address`, store.address);
    }
  }, [setValue, store, administrator, formType]);

  // console.log(store);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (formType === "create") {
      dispatch(createStore(data)).then(() => reset());
      dispatch(getAllStore({ page: page, limit: 10 }));
    } else {
      dispatch(updateStore(data, store._id)).then(() => reset());
      dispatch(getAllStore({ page: page, limit: 10 }));
      setPopupEdit({});
    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="create-product field">
        <div className="title-wrapper">
          <div className="title">
            <p>{name}</p>
          </div>
          {popup ? (
            <IconClose setPopupInfor={setPopupEdit} />
          ) : (
            <IconOpen rotation={rotation} setRotation={setRotation} />
          )}
        </div>

        {popup ? (
          <CreateStoreFields
            register={register}
            store={store}
            isSubmitting={isSubmitting}
            name={name}
            admins={admins}
            errors={errors}
          />
        ) : rotation ? (
          <CreateStoreFields
            register={register}
            store={store}
            isSubmitting={isSubmitting}
            name={name}
            admins={admins}
            errors={errors}
          />
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}

export default StoreForm;

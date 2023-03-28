import React, { useState } from "react";
import { useForm } from "react-hook-form";

import IconClose from "../../../components/IconClose";
import IconOpen from "../../../components/IconOpen";
import CreateUserFields from "./CreateUserFields";

import { createUser, getAllUsers } from "../../../features/User/UserSlice";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const createSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu nhập tên tài khoản"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập thông tin Email"),
  password: Yup.string().required("Yêu cầu nhập mật khẩu"),
  passwordConfirm: Yup.string()
    .required("Yêu cầu xác nhận mật khẩu")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
});

function UserForm({ name, popup = false, setPopupEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    let { name, email, password, role, address } = data;
    await dispatch(createUser({ name, email, password, role, address })).then(
      () => reset()
    );
    dispatch(getAllUsers());
  };

  const [rotation, setRotation] = useState(false);

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className=" field">
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

        {rotation ? (
          <CreateUserFields
            register={register}
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

export default UserForm;

import React, { useEffect } from "react";
import IconClose from "../../../components/IconClose";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import LoadingScreen from "../../../components/LoadingScreen";

import { updateUser, getCurrentUser } from "../../../features/User/UserSlice";

const editSchema = Yup.object().shape({
  name: Yup.string().required("Tên không được để trống"),
});

function EditInformation({ OpenEdit, setOpenEdit, userId }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(editSchema) });

  const dispatch = useDispatch();

  const { currentUser, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    setValue("name", currentUser?.currentUser?.name);
    setValue("email", currentUser?.currentUser?.email);
    setValue("phone", currentUser?.currentUser?.phone);
    setValue("address", currentUser?.currentUser?.address);
    setValue("gender", currentUser?.currentUser?.gender);
    setValue("dateOfBirth", currentUser?.currentUser?.dateOfBirth);
  }, [setValue, currentUser]);

  const onSubmit = async (data) => {
    await dispatch(updateUser(data, userId)).then(() => {
      dispatch(getCurrentUser());
      setOpenEdit(false);
    });
  };

  return !OpenEdit ? (
    <></>
  ) : isLoading ? (
    <LoadingScreen />
  ) : (
    <div id="edit-container">
      <div className="edit-wrapper">
        <div className="edit-box">
          <div className="header">
            <p>Chỉnh sửa thông tin</p>
            <div
              className="close"
              onClick={() => {
                setOpenEdit(false);
              }}
            >
              <IconClose />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="body">
              <div className="field">
                <label htmlFor="">Name:</label>
                <input type="text" {...register("name")} />
              </div>
              <div className="field">
                <label htmlFor="">Email:</label>
                <input type="text" disabled={true} {...register("email")} />
              </div>
              <div className="field">
                <label htmlFor="">Số điện thoại:</label>
                <input type="number" {...register("phone")} />
              </div>
              <div className="field">
                <label htmlFor="">địa chỉ:</label>
                <input type="text" {...register("address")} />
              </div>
              <div className="field radio">
                <label>Giới tính:</label>
                <div className="select">
                  <div>
                    <input
                      type="radio"
                      id="male"
                      {...register("gender")}
                      value={"Nam"}
                    />{" "}
                    <label htmlFor="male">Nam</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      {...register("gender")}
                      value={"Nữ"}
                    />{" "}
                    <label htmlFor="female">Nữ</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="empty"
                      {...register("gender")}
                      value={""}
                    />{" "}
                    <label htmlFor="empty">Để trống</label>
                  </div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="">Ngày sinh:</label>
                <input type="date" {...register("dateOfBirth")} />
              </div>
            </div>
            <div className="error">
              {errors.name && <p>Tên không được để trống</p>}
            </div>
            <div className="btn">
              <button>
                {isSubmitting ? <LoadingScreen /> : "Cập nhật thông tin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditInformation;

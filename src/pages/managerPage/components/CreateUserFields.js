import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function CreateUserFields({ register, isSubmitting = false, name, errors }) {
  return (
    <>
      <div className="body">
        <div className="common-infor wrapper">
          <p>Thông tin chung</p>
          <div className="box-input">
            <div className="field-wrapper">
              <label htmlFor="inputUserName">Tên:</label>

              <input id="inputUserName" type="text" {...register(`name`)} />
            </div>

            <div className="field-wrapper">
              <label htmlFor="inputEmail">Email:</label>
              <input id="inputEmail" type="text" {...register(`email`)} />
            </div>

            <div className="field-wrapper">
              <label htmlFor="inputPassword">Mật Khẩu:</label>
              <input
                id="inputPassword"
                type="password"
                {...register(`password`)}
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="inputPasswordConfirm">Nhập lại mật khẩu:</label>
              <input
                id="inputPasswordConfirm"
                type="password"
                {...register(`passwordConfirm`)}
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="inputRole">Vai trò:</label>
              <select id="inputRole" {...register(`role`)}>
                <option value="">---</option>
                <option value="customer">Tài khoản khách</option>
                <option value="employee">Tài khoản nhân viên</option>
              </select>
            </div>
            <div className="field-wrapper">
              <label htmlFor="inputUserAddress">Địa chỉ:</label>
              <input
                id="inputUserAddress"
                type="text"
                {...register(`address`)}
              />
            </div>
          </div>
        </div>
      </div>
      <Stack sx={{ width: "100%" }} spacing={1}>
        {errors.name && (
          <Alert severity="warning">{errors.name?.message}</Alert>
        )}
        {errors.email && (
          <Alert severity="warning">{errors.email?.message}</Alert>
        )}
        {errors.password && (
          <Alert severity="warning">{errors.password?.message}</Alert>
        )}
        {errors.passwordConfirm && (
          <Alert severity="warning">{errors.passwordConfirm?.message}</Alert>
        )}
      </Stack>
      <div className="btn">
        <button>{isSubmitting ? "Đang gửi..." : name}</button>
      </div>
    </>
  );
}

export default CreateUserFields;

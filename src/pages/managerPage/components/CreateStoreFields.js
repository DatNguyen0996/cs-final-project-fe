import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function CreateStoreFields({
  register,
  isSubmitting,
  name,
  admins = [],
  errors,
}) {
  return (
    <>
      <div className="body">
        <div className="common-infor wrapper">
          <p>Thông tin chung</p>
          <div className="box-input">
            <div className="field-wrapper">
              <label htmlFor="inputStoreName">Tên Cửa hàng:</label>

              <input id="inputStoreName" type="text" {...register(`name`)} />
            </div>

            <div className="field-wrapper">
              <label htmlFor="inputPhone">Hotline:</label>
              <input id="inputPhone" type="text" {...register(`phone`)} />
            </div>

            <div className="field-wrapper">
              <label htmlFor="inputAdmin">Quản lý:</label>
              <select {...register(`administrator`)}>
                <option value={""}>Chọn quản lý</option>
                {admins.map((admin, index) => (
                  <option key={index} value={admin._id}>
                    {admin.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-wrapper">
              <label htmlFor="inputStoreAddress">Địa chỉ:</label>
              <input
                id="inputStoreAddress"
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
        {errors.phone && (
          <Alert severity="warning">{errors.phone?.message}</Alert>
        )}
        {errors.address && (
          <Alert severity="warning">{errors.address?.message}</Alert>
        )}
      </Stack>
      <div className="btn">
        <button>{isSubmitting ? "Đang gửi..." : name}</button>
      </div>
    </>
  );
}

export default CreateStoreFields;

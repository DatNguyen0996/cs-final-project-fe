import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  FormProvider,
  FTextField,
  FRadioGroup,
} from "../../../components/form";

import { updateUser, getCurrentUser } from "../../../features/User/UserSlice";

const editSchema = Yup.object().shape({
  name: Yup.string().required("Tên không được để trống"),
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function EditInformation({ handleClose, userId }) {
  const methods = useForm({
    resolver: yupResolver(editSchema),
  });

  const { handleSubmit, setValue } = methods;

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

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
      handleClose();
    });
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#e95220",
          height: 50,
          display: "flex",
          alignItems: "center",
          p: "0 10px",
        }}
      >
        <Typography sx={{ flexGrow: 1, color: "#fff" }} variant="h6">
          Chỉnh sửa thông tin
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ bgcolor: "#fff", p: "10px" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FTextField
            name="name"
            sx={{ width: 1, mb: "20px" }}
            label="Họ và tên"
          />
          <FTextField
            name="email"
            sx={{ width: 1, mb: "20px" }}
            label="Email"
            disabled
          />
          <FTextField
            type="number"
            name="phone"
            sx={{ width: 1, mb: "20px" }}
            label="Số điện thoại"
          />
          <FTextField
            name="address"
            sx={{ width: 1, mb: "20px" }}
            label="Địa chỉ"
          />

          <FRadioGroup
            sx={{ width: 1, mb: "20px" }}
            name="gender"
            options={["Nam", "Nữ", ""]}
            getOptionLabel={["Nam", "Nữ", "Để trống"]}
          />

          <FTextField
            type="date"
            name="dateOfBirth"
            sx={{ width: 1, mb: "20px" }}
            label="Ngày sinh"
          />

          <ColorButton
            type="submit"
            size="large"
            variant="contained"
            sx={{ width: 1 }}
          >
            Cập Nhật Thông Tin
          </ColorButton>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default EditInformation;

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormProvider, FTextField, FSelect } from "../../../components/form";

import { getAllStore, updateStore } from "../../../features/Store/StoreSlice";
import { useDispatch } from "react-redux";

const storeSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu tên chi nhánh"),
  phone: Yup.string().required("Yêu cầu số điện thoại"),
  address: Yup.string().required("Yêu cầu địa chỉ"),
});

const defaultValues = {
  name: "",
  phone: "",
  address: "",
  administrator: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function UpdateStore({ store, page, handleCloseEditBox, admins = [] }) {
  const dispatch = useDispatch();
  let adminOption = [
    {
      value: "",
      label: "Chọn quản lý",
    },
  ];
  admins.forEach((admin) => {
    adminOption = [...adminOption, { value: admin._id, label: admin.email }];
  });

  const methods = useForm({
    resolver: yupResolver(storeSchema),
    defaultValues,
  });
  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (data) => {
    await dispatch(updateStore(data, store._id)).then(() => reset());
    dispatch(getAllStore({ page: page, limit: 10 }));
    handleCloseEditBox();
  };

  useEffect(() => {
    setValue(`name`, store.name);
    setValue(`phone`, store.phone);
    setValue(`administrator`, store.administrator._id);
    setValue(`address`, store.address);
  }, [setValue, store]);
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: "20px",
        borderRadius: 2,
        minWidth: 350,
        maxWidth: 1200,
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: 1,
            border: "1px solid #222222",
            p: "30px 10px 10px 10px",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} sm={1} md={1}>
              <FTextField
                name="name"
                sx={{ width: 1, mb: "20px" }}
                label="Tên cửa hàng"
              />
            </Grid>

            <Grid item xs={1} sm={1} md={1}>
              <FTextField
                name="phone"
                sx={{ width: 1, mb: "20px" }}
                label="Hotline"
              />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <FSelect
                name="administrator"
                sx={{ width: 1, mb: "20px" }}
                label="Chọn quản lý"
                children={adminOption}
              />
            </Grid>

            <Grid item xs={1} sm={1} md={3}>
              <FTextField
                name="address"
                sx={{ width: 1, mb: "20px" }}
                label="Địa chỉ"
              />
            </Grid>
          </Grid>
        </Box>

        <ColorButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ width: 1, mt: 3 }}
        >
          Cập nhật cửa hàng
        </ColorButton>
      </FormProvider>
    </Box>
  );
}

export default UpdateStore;

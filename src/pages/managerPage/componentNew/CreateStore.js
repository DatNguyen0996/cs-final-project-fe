import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormProvider, FTextField, FSelect } from "../../../components/form";

import { getAllStore, createStore } from "../../../features/Store/StoreSlice";
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

function CreateStore({ expanded, handleChange, panel1, tabName, admins = [] }) {
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
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    await dispatch(createStore(data)).then(() => reset());
    dispatch(getAllStore({ page: 1, limit: 10 }));
  };

  return (
    <Accordion
      expanded={expanded === panel1}
      onChange={handleChange(panel1)}
      sx={{ mb: "20px" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: "80%", flexShrink: 0 }}>{tabName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
            Tạo cửa hàng mới
          </ColorButton>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
}

export default CreateStore;

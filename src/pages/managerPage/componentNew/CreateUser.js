import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormProvider, FTextField, FSelect } from "../../../components/form";

import { getAllUsers, createUser } from "../../../features/User/UserSlice";
import { useDispatch } from "react-redux";

const createSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu nhập tên tài khoản"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập thông tin Email"),
  password: Yup.string().required("Yêu cầu nhập mật khẩu"),
  passwordConfirm: Yup.string()
    .required("Yêu cầu xác nhận mật khẩu")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
  role: Yup.string().required("Yêu cầu chọn vai trò cho TK"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: "",
  address: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function CreateUser({ expanded, handleChange, panel1, tabName }) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    let { name, email, password, role, address } = data;
    await dispatch(createUser({ name, email, password, role, address })).then(
      () => reset()
    );
    dispatch(getAllUsers({ page: 1, limit: 10 }));
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
                  label="Tên tài khoản"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  name="email"
                  sx={{ width: 1, mb: "20px" }}
                  label="Email"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  name="password"
                  label="Mật khẩu"
                  sx={{ width: 1, mb: "20px" }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  sx={{ width: 1, mb: "20px" }}
                  name="passwordConfirm"
                  label="Xác nhận mật khẩu"
                  type={showPasswordConfirmation ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirmation(
                              !showPasswordConfirmation
                            )
                          }
                          edge="end"
                        >
                          {showPasswordConfirmation ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FSelect
                  name="role"
                  sx={{ width: 1, mb: "20px" }}
                  label="Vai trò"
                  children={[
                    { value: "customer", label: "Tài khoản khách" },
                    { value: "employee", label: "Tài khoản nhân viên" },
                  ]}
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
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
            Tạo tài khoản mới
          </ColorButton>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
}

export default CreateUser;

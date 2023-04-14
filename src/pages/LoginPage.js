import React, { useState } from "react";
import logoImg from "../logoBadminton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/userAuth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { FormProvider, FTextField } from "../components/form";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Yêu cầu Email"),
  password: Yup.string().required("Yêu cầu mật khẩu"),
});
const defaultValues = {
  email: "",
  password: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function LoginPage(local) {
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    const form = location.state?.from?.pathname || "/" || local;
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(form, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="sign-in-up-container">
      <img id="store-logo" src={logoImg} alt="Logo" />
      <div className="form-wrapper">
        <p className="title">Login</p>
        <div className="registerBox">
          <label htmlFor="register">Don't have an account? </label>
          <Link to="/register">
            <button id="register">Register</button>
          </Link>
        </div>
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField
              name="email"
              sx={{ width: 1, m: "20px 0" }}
              label="Email"
            />
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
            <ColorButton
              type="submit"
              size="large"
              variant="contained"
              sx={{ width: 1, m: "20px 0" }}
            >
              Gửi đánh giá
            </ColorButton>
          </FormProvider>

          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
        </Box>
      </div>
    </div>
  );
}

export default LoginPage;

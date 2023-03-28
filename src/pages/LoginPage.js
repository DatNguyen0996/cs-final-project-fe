import React from "react";
import logoImg from "../logoBadminton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/userAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const auth = useAuth();

  const method = useForm({ resolver: yupResolver(LoginSchema), defaultValues });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = method;

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    const form = location.state?.from?.pathname || "/";
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {!!errors.responseError && (
            <p className="error">
              <img src="images/error.png" alt="error" />
              {errors.responseError.message}
            </p>
          )}

          <div className="btn-remember-login">
            <div>
              <label htmlFor="remember">Remember me</label>
              <input type="checkBox" id="remember" {...register("remember")} />
            </div>
            <button className="login">
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        <button className="forget-pasword">Forget password</button>
      </div>
    </div>
  );
}

export default LoginPage;

import React from "react";
import logoImg from "../logoBadminton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/userAuth";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password not match"),
});
const defaultValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};

function RegisterPage() {
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
    let { name, email, password } = data;

    try {
      await auth.register({ name, email, password }, () => {
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
        <p className="title">Register</p>
        <div className="registerBox">
          <label htmlFor="register">Already have an account? </label>
          <Link to="/login">
            <button id="register">Login</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input type="text" name="" id="email" {...register("email")} />
          <label htmlFor="username">Username</label>
          <input type="text" name="" id="username" {...register("name")} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name=""
            id="password"
            {...register("password")}
          />
          <label htmlFor="password-confirm">Password confirmation:</label>
          <input
            type="password"
            name=""
            id="password-confirm"
            {...register("passwordConfirm")}
          />
          {!!errors.responseError && (
            <p className="error">
              <img src="images/error.png" alt="error" />
              {errors.responseError.message}
            </p>
          )}

          <div className="btn-remember-login">
            <button className="login">
              {isSubmitting ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useDispatch } from "react-redux";
import { createContact } from "../features/Contact/ContactSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "../style/contactPage.style.css";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu họ và tên"),
  email: Yup.string().email("email không hợp lệ").required("Yêu cầu email"),
  content: Yup.string().required("Yêu cầu nội dung tin nhắn"),
});

function ContactPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(contactSchema) });

  const onSubmit = async (data) => {
    await dispatch(createContact(data)).then(() => reset());
  };

  return (
    <div id="contactPage-container">
      <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h3>NƠI GIẢI ĐÁP TOÀN BỘ MỌI THẮC MẮC CỦA BẠN?</h3>
        <p>
          <b>Hotline:</b> 09xxxxxxxx
        </p>
        <p>
          <b>Email:</b> badmintonstore@gmail.com
        </p>
        <h3>LIÊN HỆ VỚI CHÚNG TÔI?</h3>
        <input type="text" placeholder="Họ và tên" {...register(`name`)} />
        <input type="text" placeholder="Email" {...register(`email`)} />
        <input
          type="number"
          placeholder="Số điện thoại"
          {...register(`phone`)}
        />
        <textarea placeholder="Nội dung" {...register(`content`)}></textarea>
        <Stack sx={{ width: "100%" }} spacing={1}>
          {errors.name && (
            <Alert severity="warning">{errors.name?.message}</Alert>
          )}
          {errors.email && (
            <Alert severity="warning">{errors.email?.message}</Alert>
          )}
          {errors.content && (
            <Alert severity="warning">{errors.content?.message}</Alert>
          )}
        </Stack>
        <button>{isSubmitting ? "Đang gửi..." : "Gửi thông tin"}</button>
      </form>
    </div>
  );
}

export default ContactPage;

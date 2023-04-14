import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { createContact } from "../features/Contact/ContactSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { FormProvider, FTextField } from "../components/form";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu họ và tên"),
  email: Yup.string().email("email không hợp lệ").required("Yêu cầu email"),
  content: Yup.string().required("Yêu cầu nội dung tin nhắn"),
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

const defaultValues = {
  name: "",
  email: "",
  content: "",
  phone: "",
};

function ContactPage() {
  const methods = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(createContact(data)).then(() => reset());
  };

  return (
    <>
      <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: 1,
            maxWidth: 800,
            mt: 3,
          }}
        >
          <Typography variant="h6">
            <b>NƠI GIẢI ĐÁP TOÀN BỘ MỌI THẮC MẮC CỦA BẠN</b>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>HotLine:</b> <span>09xxxxxxxx</span>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>Email:</b> <span>badmintonstore@gmail.com</span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <b>LIÊN HỆ VỚI CHÚNG TÔI?</b>
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField
              name="name"
              sx={{ width: 1, mb: "20px" }}
              label="Họ và tên"
            />
            <FTextField
              name="email"
              sx={{ width: 1, mb: "20px" }}
              label="Địa chỉ Email"
            />
            <FTextField
              type="number"
              name="phone"
              sx={{ width: 1, mb: "20px" }}
              label="Số điện thoại"
            />
            <FTextField
              name="content"
              sx={{ width: 1, mb: "20px" }}
              label="Nội dung tin nhắn"
              multiline
              maxRows={5}
            />
            <ColorButton
              type="submit"
              size="small"
              variant="contained"
              sx={{ width: 1 }}
            >
              Gửi thông tin
            </ColorButton>
          </FormProvider>
        </Box>
      </Box>
      {/* <div id="contactPage-container">
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
      </div> */}
    </>
  );
}

export default ContactPage;

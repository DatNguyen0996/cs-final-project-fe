import React, { useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  createProduct,
  getAllProduct,
} from "../../../features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { FormProvider, FTextField, FSelect } from "../../../components/form";
import defaultProductCode from "../components/DefaultProductCode";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Yêu cầu tên sản phẩm"),
  code: Yup.string().required("Yêu cầu mã sản phẩm"),
  brand: Yup.string().required("Yêu cầu thương hiệu"),
  price: Yup.number("Giá sản phẩm phải là số").required("Yêu cầu giá sản phẩm"),
  saleOff: Yup.number("Phần trăm ưu đãi phải là số"),
});

const defaultValues = {
  name: "",
  code: "",
  brand: "",
  gender: "",
  price: 0,
  saleOff: 0,
  description: "",
  levelOfPlay: "",
  playStyle: "",
  formality: "",
  hardness: "",
  balancedPoint: "",
  weight: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

const productTypeRender = [
  {
    value: "",
    label: "Chọn kiểu sản phẩm",
  },
  {
    value: "racket",
    label: "Vợt cầu lông",
  },
  {
    value: "shoe",
    label: "Giày cầu lông",
  },
  {
    value: "shirt",
    label: "Áo cầu lông",
  },
  {
    value: "shorts",
    label: "Quần cầu lông",
  },
  {
    value: "sportDress",
    label: "Váy cầu lông",
  },
  {
    value: "accessory",
    label: "Phụ kiện cầu lông",
  },
];

const levelOfPlayOption = [
  {
    value: "",
    label: "Chọn trình độ chơi",
  },
  {
    value: "Nhập môn",
    label: "Nhập môn",
  },
  {
    value: "Nghiệp dư",
    label: "Nghiệp dư",
  },
  {
    value: "Bán chuyên",
    label: "Bán chuyên",
  },
  {
    value: "Chuyên Nhiệp",
    label: "Chuyên Nhiệp",
  },
  {
    value: "Cao thủ",
    label: "Cao thủ",
  },
];
const playStyleOption = [
  {
    value: "",
    label: "Chọn phong cách chơi",
  },
  {
    value: "Công thủ toàn diện",
    label: "Công thủ toàn diện",
  },
  {
    value: "Tấn Công",
    label: "Tấn Công",
  },
  {
    value: "Phòng thủ",
    label: "Phòng thủ",
  },
];
const formalityOption = [
  {
    value: "",
    label: "Chọn nội dung chơi",
  },
  {
    value: "Cả đơn và đôi",
    label: "Cả đơn và đôi",
  },
  {
    value: "Đánh đơn",
    label: "Đánh đơn",
  },
  {
    value: "Đánh đôi",
    label: "Đánh đôi",
  },
];
const hardnessOption = [
  {
    value: "",
    label: "Chọn độ cứng đũa",
  },
  {
    value: "Yếu",
    label: "Yếu",
  },
  {
    value: "Trung bình",
    label: "Trung bình",
  },
  {
    value: "Cứng",
    label: "Cứng",
  },
  {
    value: "Siêu cứng",
    label: "Siêu cứng",
  },
];
const balancedPointOption = [
  {
    value: "",
    label: "Chọn điểm cân bằng",
  },
  {
    value: "Nhẹ đầu",
    label: "Nhẹ đầu",
  },
  {
    value: "Hơi nhẹ đầu",
    label: "Hơi nhẹ đầu",
  },
  {
    value: "Cân bằng",
    label: "Cân bằng",
  },
  {
    value: "Hơi nặng đầu",
    label: "Hơi nặng đầu",
  },
  {
    value: "Nặng đầu",
    label: "Nặng đầu",
  },
];
const weightOption = [
  {
    value: "",
    label: "Chọn trọng lượng",
  },
  {
    value: "2U",
    label: "2U",
  },
  {
    value: "2U5",
    label: "2U5",
  },
  {
    value: "3U",
    label: "3U",
  },
  {
    value: "3U5",
    label: "3U5",
  },
  {
    value: "4U",
    label: "4U",
  },
  {
    value: "4U5",
    label: "4U5",
  },
  {
    value: "5U",
    label: "5U",
  },
];

function CreateProduct({ expanded, handleChange, panel1, tabName }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllProduct({ page: 1, limit: 10 }));
  // }, [dispatch]);

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const createInfor = {
      ...data,
      special: data.saleOff > 0 ? true : false,
    };
    await dispatch(createProduct(createInfor)).then(() => {
      reset();
    });
    dispatch(getAllProduct({ page: 1, limit: 10 }));
  };

  const { handleSubmit, reset, setValue } = methods;

  const fileInput = useRef();

  const [fileName, setFileName] = useState("chọn hình ảnh");

  const handleFile = (e) => {
    const file = fileInput.current.files[0];

    if (file) {
      setValue("image", file);
      setFileName(file.name);
    }
  };

  const [nameProductType, setNameProductType] = useState("");
  const handleChangeType = (e) => {
    setNameProductType(e);
    if (e) {
      setValue("productType", e);
      defaultProductCode({
        code: e,
        setValue: setValue,
      });
    }
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
              p: "50px 10px 10px 10px",
              mt: "30px",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === ""}
                  name="name"
                  sx={{ width: 1, mb: "20px" }}
                  label="Tên sản phẩm"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === ""}
                  name="code"
                  sx={{ width: 1, mb: "20px" }}
                  label="Mã sản phẩm"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === ""}
                  name="brand"
                  sx={{ width: 1, mb: "20px" }}
                  label="Thương hiệu"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === ""}
                  type="number"
                  name="price"
                  sx={{ width: 1, mb: "20px" }}
                  label="Giá thành"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FSelect
                  disabled={nameProductType === ""}
                  name="gender"
                  sx={{ width: 1, mb: "20px" }}
                  label="Giới tính"
                  children={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" },
                    { value: "", label: "Cập nhật sau" },
                  ]}
                />
              </Grid>

              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === ""}
                  type="number"
                  name="saleOff"
                  sx={{ width: 1, mb: "20px" }}
                  label="Khuyến mãi (%)"
                />
              </Grid>
              <Grid item xs={1} sm={2} md={3}>
                <Button
                  disabled={nameProductType === ""}
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{ width: 1, height: 60, mb: "20px" }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={fileInput}
                    onChange={handleFile}
                  />
                  {fileName}
                </Button>
              </Grid>

              <Grid item xs={1} sm={2} md={3}>
                <FTextField
                  disabled={nameProductType === ""}
                  name="description"
                  sx={{ width: 1, mb: "20px" }}
                  label="Mô tả sản phẩm"
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
            <TextField
              sx={{
                width: 200,
                position: "absolute",
                bgcolor: "#fff",
                top: "-30px",
              }}
              select
              label="Chọn kiểu sản phẩm"
              value={nameProductType}
              onChange={(event) => {
                handleChangeType(event.target.value);
              }}
            >
              {productTypeRender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {nameProductType === "racket" ? (
            <Box
              sx={{
                width: 1,
                border: "1px solid #222222",
                p: "50px 10px 10px 10px",
                mt: "50px",
                borderRadius: 2,
                position: "relative",
                height: 200,
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.1rem",
                  bgcolor: "#e95220",
                  color: "#fff",
                  position: "absolute",
                  top: "-20px",
                }}
              >
                Thông số kỹ thuật
              </Box>
              <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={1} sm={1} md={1}>
                  <FSelect
                    disabled={nameProductType === ""}
                    name="levelOfPlay"
                    sx={{ width: 1, mb: "20px" }}
                    label="Trình độ chơi"
                    children={levelOfPlayOption}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <FSelect
                    disabled={nameProductType === ""}
                    name="playStyle"
                    sx={{ width: 1, mb: "20px" }}
                    label="Phong cách chơi"
                    children={playStyleOption}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <FSelect
                    disabled={nameProductType === ""}
                    name="formality"
                    sx={{ width: 1, mb: "20px" }}
                    label="Nộp dụng chơi"
                    children={formalityOption}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <FSelect
                    disabled={nameProductType === ""}
                    name="hardness"
                    sx={{ width: 1, mb: "20px" }}
                    label="Độ cứng đũa"
                    children={hardnessOption}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <FSelect
                    disabled={nameProductType === ""}
                    name="balancedPoint"
                    sx={{ width: 1, mb: "20px" }}
                    label="Điểm cân bằng"
                    children={balancedPointOption}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <FSelect
                    disabled={nameProductType === ""}
                    name="weight"
                    sx={{ width: 1, mb: "20px" }}
                    label="Trọng lượng"
                    children={weightOption}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <></>
          )}
          <ColorButton
            disabled={nameProductType === ""}
            type="submit"
            size="large"
            variant="contained"
            sx={{ width: 1, mt: 3 }}
          >
            Tạo sản phẩm mới
          </ColorButton>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
}

export default CreateProduct;

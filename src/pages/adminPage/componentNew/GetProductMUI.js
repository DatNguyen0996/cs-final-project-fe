import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormProvider, FTextField } from "../../../components/form";

import defaultProductCode from "../components/DefaultProductCode";
import RenderProduct from "./RenderProduct";

import {
  getAllProductStore,
  creatProductOfStore,
} from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

const productSchema = Yup.object().shape({
  productType: Yup.string().required("Yêu cầu chọn kiểu sản phẩm"),
  code: Yup.string().required("Yêu cầu mã sản phẩm"),
  storeId: Yup.string().required("Yêu cầu chọn cửa hàng"),
  productSize: Yup.string().required("Yêu cầu kích thước sản phẩm"),
  quantity: Yup.string().required("Yêu cầu số lượng sản phẩm"),
});

const defaultValues = {
  productType: "",
  code: "",
  storeId: "",
  quantity: "",
  productSize: "",
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

function GetProductMUI({ expanded, handleChange, panel, tabName }) {
  const dispatch = useDispatch();
  const [pageSelect, setPageSelect] = useState(1);
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
  });
  const { handleSubmit, reset, setValue } = methods;
  const { stores } = useSelector((state) => state.store);
  let storeOption = [
    {
      value: "",
      label: "Chọn cửa hàng",
    },
  ];
  stores?.stores?.forEach((store) => {
    storeOption = [...storeOption, { value: store._id, label: store.name }];
  });

  const [storeId, setStoreId] = useState("");
  const handleChangeStore = (e) => {
    setStoreId(e);
    setValue("storeId", e);
    if (e === "") {
      reset();
      setNameProductType("");
    }
    setPageSelect(1);
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
    } else {
      reset();
    }
    if (e === "racket" || e === "accessory") {
      setValue("productSize", 0);
    } else {
      setValue("productSize", "");
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(
      creatProductOfStore({
        productType: data.productType,
        productCode: data.code,
        store: data.storeId,
        quantity: data.quantity,
        productSize: data.productSize,
      })
    ).then(() =>
      dispatch(
        getAllProductStore({ storeId: storeId, page: pageSelect, limit: 10 })
      )
    );
  };

  return (
    <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
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
            <TextField
              sx={{
                width: 250,
                position: "absolute",
                bgcolor: "#fff",
                top: "-30px",
              }}
              select
              label="Chọn cửa hàng"
              value={storeId}
              onChange={(event) => {
                handleChangeStore(event.target.value);
              }}
            >
              {storeOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
              <Grid item xs={1} sm={1} md={1}>
                <TextField
                  disabled={storeId === ""}
                  fullWidth
                  select
                  label="Chọn cửa hàng"
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
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === "" || storeId === ""}
                  name="code"
                  sx={{ width: 1, mb: "20px" }}
                  label="Mã sản phẩm"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={
                    nameProductType === "" ||
                    nameProductType === "racket" ||
                    nameProductType === "accessory" ||
                    storeId === ""
                  }
                  name="productSize"
                  sx={{ width: 1, mb: "20px" }}
                  label="Kích thước"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <FTextField
                  disabled={nameProductType === "" || storeId === ""}
                  type="number"
                  name="quantity"
                  sx={{ width: 1, mb: "20px" }}
                  label="Số lượng nhập"
                />
              </Grid>
            </Grid>
          </Box>
          <ColorButton
            disabled={nameProductType === "" || storeId === ""}
            type="submit"
            size="large"
            variant="contained"
            sx={{ width: 1, mt: 3 }}
          >
            Nhập kho
          </ColorButton>
        </FormProvider>
        <RenderProduct
          storeId={storeId}
          pageSelect={pageSelect}
          setPageSelect={setPageSelect}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default GetProductMUI;

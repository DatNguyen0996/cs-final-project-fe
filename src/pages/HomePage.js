import React, { useEffect } from "react";
import Poster from "../components/Poster";
import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";

import ListsItem from "../components/ListsItem";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ProductCardSlider from "../components/ProductCardSlider";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllProduct,
  getSaleOfflProduct,
} from "../features/Product/ProductSlice";

import "../style/style.HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getSaleOfflProduct());
  }, [dispatch]);

  const { products, saleOff, isLoading, error } = useSelector(
    (state) => state.product
  );

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : error === "unknown-error" ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Không thể kết nối đến máy chủ!!!</Alert>
        </Stack>
      ) : (
        <>
          <Poster />
          <ProductCardSlider
            products={products.products}
            name={"SẢN PHẨM MỚI"}
          />

          <ListsItem />
          <ProductCardSlider products={saleOff.products} name={"SALE OFF"} />
        </>
      )}
    </Box>
  );
}

export default HomePage;

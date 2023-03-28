import React, { useEffect } from "react";
import Poster from "../components/Poster";
import ListsItem from "../components/ListsItem";
import CardSlider from "../components/CardSlider";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

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
    <div className="homePage-container">
      {isLoading ? (
        <div id="loading-screen-custom">
          <LoadingScreen />
        </div>
      ) : error === "unknown-error" ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Không thể kết nối đến máy chủ!!!</Alert>
        </Stack>
      ) : (
        <>
          <Poster />
          <p className="homePage-title">SẢN PHẨM MỚI</p>
          <CardSlider products={products.products} />
          <p className="homePage-title">DANH SÁCH SẢN PHẨM</p>
          <ListsItem />
          <p className="homePage-title">SALE OFF</p>
          <CardSlider products={saleOff.products} />
        </>
      )}
    </div>
  );
}

export default HomePage;

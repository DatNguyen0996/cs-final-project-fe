import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { getSingleProduct } from "../../features/Product/ProductSlice";
import { getReview } from "../../features/Review/ReviewSlice";
import { getAllStore } from "../../features/Store/StoreSlice";

import { getCurrentUser } from "../../features/User/UserSlice";

import useAuth from "../../hooks/userAuth";

import LoadingScreen from "../../components/LoadingScreen";
import RenderComment from "./components/RenderComment";
import RenderInfor from "./components/RenderInfor";
import RenderReview from "./components/RenderReview";

import "../../style/detailPage.style.css";

function DetailPage() {
  let { productId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    dispatch(getAllStore());
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getReview({ productId: productId, email: user?.currentUser?.email })
    );
  }, [dispatch, productId, user]);

  const { isLoading, error } = useSelector((state) => state.product);

  return (
    <div id="detailPage-container">
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
          <RenderInfor
            productId={productId}
            userId={currentUser?.currentUser?._id}
          />
          <RenderReview setIsOpen={setIsOpen} productId={productId} />
          {isOpen ? (
            <RenderComment setIsOpen={setIsOpen} productId={productId} />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default DetailPage;

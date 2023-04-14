import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { FormProvider, FTextField } from "../../../components/form";

import {
  getAllProductStore,
  updateProductOfStore,
} from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

const defaultValues = {
  quantity: 0,
};

function UpdateProduct({ product, page, handleCloseEditBox, storeId }) {
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (data) => {
    await dispatch(updateProductOfStore(data, product._id)).then(() => {
      reset();
    });
    dispatch(getAllProductStore({ storeId: storeId, page: page, limit: 10 }));
    handleCloseEditBox();
  };
  useEffect(() => {
    setValue(`quantity`, product.quantity);
  }, [product, setValue]);

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: "20px",
        borderRadius: 2,
        width: 350,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FTextField
          type="number"
          name="quantity"
          sx={{ width: 1 }}
          label="Cập nhật số lượng SP"
        />
        <ColorButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ width: 1, mt: 3 }}
        >
          Cập nhật số lượng SP
        </ColorButton>
      </FormProvider>
    </Box>
  );
}

export default UpdateProduct;

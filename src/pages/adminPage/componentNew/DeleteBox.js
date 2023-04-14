import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";

import {
  getAllProductStore,
  deleteProductOfStore,
} from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

function DeleteBox({ id, handleCloseDeleteBox, page, storeId }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteProductOfStore(id)).then(() =>
      dispatch(getAllProductStore({ storeId: storeId, page: page, limit: 10 }))
    );

    handleCloseDeleteBox();
  };

  return (
    <Box
      sx={{
        maxWidth: 300,
        bgcolor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" sx={{ m: 2, color: "red" }}>
        Xác nhận xóa
      </Typography>
      <Stack direction="row" spacing={5} sx={{ m: 3 }}>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Xóa
        </Button>
        <Button
          onClick={handleCloseDeleteBox}
          color="success"
          variant="contained"
          startIcon={<ClearIcon />}
        >
          Hủy
        </Button>
      </Stack>
    </Box>
  );
}

export default DeleteBox;

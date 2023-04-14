import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";

import {
  getAllProduct,
  deleteProduct,
} from "../../../features/Product/ProductSlice";
import { getAllStore, deleteStore } from "../../../features/Store/StoreSlice";

function DeleteBox({ select, id, handleCloseDeleteBox, page }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (select === "store") {
      await dispatch(deleteStore(id)).then(() =>
        dispatch(getAllStore({ page: page, limit: 10 }))
      );
    } else {
      await dispatch(deleteProduct(id)).then(() =>
        dispatch(getAllProduct({ page: page, limit: 10 }))
      );
    }
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

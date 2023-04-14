import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

import { getAllProductStore } from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

import DeleteBox from "./DeleteBox";
import UpdateProduct from "./UpdateProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  with: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function RenderProduct({ storeId = "", pageSelect, setPageSelect }) {
  const dispatch = useDispatch();
  const handleChangePage = (event, value) => {
    setPageSelect(value);
  };
  useEffect(() => {
    dispatch(
      getAllProductStore({ storeId: storeId, page: pageSelect, limit: 10 })
    );
  }, [storeId, dispatch, pageSelect]);
  const { allProductStore, isLoading } = useSelector(
    (state) => state.productsOfStore
  );
  const { totalPage } = allProductStore;

  const [productId, setProductId] = useState("");
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const handleOpenDeleteBox = (id) => {
    setOpenDeleteBox(true);
    setProductId(id);
  };
  const handleCloseDeleteBox = () => {
    setOpenDeleteBox(false);
    setProductId("");
  };

  const [productSelect, setProductSelect] = useState({});
  const [openEditBox, setOpenEditBox] = useState(false);
  const handleOpenEditBox = (product) => {
    setOpenEditBox(true);
    setProductSelect(product);
  };
  const handleCloseEditBox = () => {
    setOpenEditBox(false);
    setProductSelect({});
  };

  return storeId ? (
    isLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    ) : (
      <Box component={"div"} sx={{ width: 1, overflow: "auto", mt: 5 }}>
        <Box component={"table"} sx={{ width: 1, minWidth: 600 }}>
          <Box component={"thead"} sx={{ bgcolor: "#e95220", height: 40 }}>
            <Box component={"tr"} color={"#fff"}>
              <Box component={"th"} width="25%">
                Tên sản phẩm
              </Box>
              <Box component={"th"} width="15%">
                Mã sản phẩm
              </Box>
              <Box component={"th"} width="15%">
                kích thước
              </Box>
              <Box component={"th"} width="15%">
                Tồn kho
              </Box>
              <Box component={"th"} width="15%">
                Tùy Chỉnh
              </Box>
            </Box>
          </Box>

          <Box component={"tbody"}>
            {allProductStore?.productOfOneStore?.map((product, index) => (
              <Box
                key={index}
                component={"tr"}
                sx={{
                  color: "#000",
                  bgcolor: index % 2 === 0 ? "#3131310f" : "#2222",
                  minHeight: 50,
                }}
              >
                <Box component={"td"} width="25%" sx={{ p: "10px 5px" }}>
                  {product?.product?.name}
                </Box>
                <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                  {product?.product?.code}
                </Box>
                <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                  {product.productSize}
                </Box>
                <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                  {product.quantity}
                </Box>

                <Box
                  component={"td"}
                  width="15%"
                  sx={{
                    width: 1,
                    p: "10px 5px",
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <IconButton onClick={() => handleOpenEditBox(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteBox(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        {totalPage <= 1 || totalPage === undefined ? (
          <></>
        ) : (
          <div className="pagination">
            <Stack
              spacing={2}
              m={3}
              justifyContent="center"
              alignItems="center"
            >
              <Pagination
                count={totalPage}
                page={Number(pageSelect)}
                onChange={handleChangePage}
              />
            </Stack>
          </div>
        )}
        <Modal open={openDeleteBox} onClose={handleCloseDeleteBox}>
          <Box sx={style}>
            <DeleteBox
              id={productId}
              page={pageSelect}
              storeId={storeId}
              handleCloseDeleteBox={handleCloseDeleteBox}
            />
          </Box>
        </Modal>
        <Modal open={openEditBox} onClose={handleCloseEditBox}>
          <Box sx={style}>
            <UpdateProduct
              product={productSelect}
              page={pageSelect}
              storeId={storeId}
              handleCloseEditBox={handleCloseEditBox}
            />
          </Box>
        </Modal>
      </Box>
    )
  ) : (
    <></>
  );
}

export default RenderProduct;

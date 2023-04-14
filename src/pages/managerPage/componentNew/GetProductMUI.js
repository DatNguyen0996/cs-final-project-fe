import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { getAllProduct } from "../../../features/Product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
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

function GetProductMUI({ expanded, handleChange, panel1, tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { products, isLoading } = useSelector((state) => state.product);

  const { totalPage } = products;
  const [pageSelect, setPageSelect] = useState(1);
  const handleChangePage = (event, value) => {
    setPageSelect(value);
    dispatch(getAllProduct({ page: value, limit: 10 }));
  };

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

  return (
    <Accordion
      sx={{ bgcolor: "#f0f8ff" }}
      expanded={expanded === panel1}
      onChange={handleChange(panel1)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: "80%", flexShrink: 0 }}>{tabName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component={"div"} sx={{ width: 1, overflow: "auto" }}>
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
                    Thương hiệu
                  </Box>
                  <Box component={"th"} width="15%">
                    Giá thành
                  </Box>
                  <Box component={"th"} width="15%">
                    Ưu đãi
                  </Box>
                  <Box component={"th"} width="15%">
                    Tùy Chỉnh
                  </Box>
                </Box>
              </Box>
              <Box component={"tbody"}>
                {products.products.map((product, index) => (
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
                      {product.name}
                    </Box>
                    <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                      {product.code}
                    </Box>
                    <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                      {product.brand}
                    </Box>
                    <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                      {product.price}
                    </Box>
                    <Box component={"td"} width="15%" sx={{ p: "10px 5px" }}>
                      {product.saleOff}
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
                      <IconButton
                        onClick={() => handleOpenDeleteBox(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {totalPage <= 1 ? (
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
          </Box>
        )}
        <Modal open={openDeleteBox} onClose={handleCloseDeleteBox}>
          <Box sx={style}>
            <DeleteBox
              select={"product"}
              id={productId}
              page={pageSelect}
              handleCloseDeleteBox={handleCloseDeleteBox}
            />
          </Box>
        </Modal>
        <Modal open={openEditBox} onClose={handleCloseEditBox}>
          <Box sx={style}>
            <UpdateProduct
              product={productSelect}
              page={pageSelect}
              handleCloseEditBox={handleCloseEditBox}
            />
          </Box>
        </Modal>
      </AccordionDetails>
    </Accordion>
  );
}

export default GetProductMUI;

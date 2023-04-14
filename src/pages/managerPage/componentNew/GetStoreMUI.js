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

import { getAllStore } from "../../../features/Store/StoreSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteBox from "./DeleteBox";
import UpdateStore from "./UpdateStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1,
  p: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function GetStoreMUI({ expanded, handleChange, panel1, tabName, admins }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStore({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { stores, isLoading } = useSelector((state) => state.store);

  const { totalPage } = stores;
  const [pageSelect, setPageSelect] = useState(1);
  const handleChangePage = (event, value) => {
    setPageSelect(value);
    dispatch(getAllStore({ page: value, limit: 10 }));
  };

  const [storetId, setStoretId] = useState("");
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const handleOpenDeleteBox = (id) => {
    setOpenDeleteBox(true);
    setStoretId(id);
  };
  const handleCloseDeleteBox = () => {
    setOpenDeleteBox(false);
    setStoretId("");
  };

  const [storeSelect, setstoreSelect] = useState({});
  const [openEditBox, setOpenEditBox] = useState(false);
  const handleOpenEditBox = (store) => {
    setOpenEditBox(true);
    setstoreSelect(store);
  };
  const handleCloseEditBox = () => {
    setOpenEditBox(false);
    setstoreSelect({});
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
                  <Box component={"th"} width="20%">
                    Tên cửa hàng
                  </Box>
                  <Box component={"th"} width="20%">
                    Hotline
                  </Box>
                  <Box component={"th"} width="20%">
                    Địa chỉ
                  </Box>
                  <Box component={"th"} width="20%">
                    Quản lý
                  </Box>
                  <Box component={"th"} width="20%">
                    Tùy chỉnh
                  </Box>
                </Box>
              </Box>
              <Box component={"tbody"}>
                {stores?.stores?.map((store, index) => (
                  <Box
                    key={index}
                    component={"tr"}
                    sx={{
                      color: "#000",
                      bgcolor: index % 2 === 0 ? "#3131310f" : "#2222",
                      minHeight: 50,
                    }}
                  >
                    <Box component={"td"} width="20%" sx={{ p: "10px 5px" }}>
                      {store.name}
                    </Box>
                    <Box component={"td"} width="20%" sx={{ p: "10px 5px" }}>
                      {store.phone}
                    </Box>
                    <Box component={"td"} width="20%" sx={{ p: "10px 5px" }}>
                      {store.address}
                    </Box>
                    <Box component={"td"} width="20%" sx={{ p: "10px 5px" }}>
                      {store.administrator !== null
                        ? store.administrator.email
                        : ""}
                    </Box>
                    <Box
                      component={"td"}
                      width="20%"
                      sx={{
                        width: 1,
                        p: "10px 5px",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                      }}
                    >
                      <IconButton onClick={() => handleOpenEditBox(store)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteBox(store._id)}
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
              select={"store"}
              id={storetId}
              page={pageSelect}
              handleCloseDeleteBox={handleCloseDeleteBox}
            />
          </Box>
        </Modal>
        <Modal open={openEditBox} onClose={handleCloseEditBox}>
          <Box sx={style}>
            <UpdateStore
              store={storeSelect}
              page={pageSelect}
              handleCloseEditBox={handleCloseEditBox}
              admins={admins}
            />
          </Box>
        </Modal>
      </AccordionDetails>
    </Accordion>
  );
}

export default GetStoreMUI;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getAllStore } from "../features/Store/StoreSlice";

function ListOfStore() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);
  const { stores, isLoading } = useSelector((state) => state.store);
  console.log(stores, isLoading);
  return (
    <>
      <Box
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 1,
            maxWidth: 1200,
            mt: 3,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" textAlign="center">
            <b>DANH SÁCH TẤT CẢ CÁC CỬA HÀNG</b>
          </Typography>

          <Box component={"table"} sx={{ width: 1, minWidth: 600 }}>
            <Box component={"thead"} sx={{ bgcolor: "#e95220", height: 40 }}>
              <Box component={"tr"} color={"#fff"}>
                <Box component={"th"} width="40%">
                  Tên cửa hàng
                </Box>

                <Box component={"th"} width="40%">
                  Địa chỉ
                </Box>
                <Box component={"th"} width="20%">
                  Hotline
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
                    {store.address}
                  </Box>
                  <Box component={"td"} width="20%" sx={{ p: "10px 5px" }}>
                    {store.phone}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ListOfStore;

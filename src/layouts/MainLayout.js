import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import AlertMsg from "../components/AlertMsg";
import Box from "@mui/material/Box";

function MainLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MainHeader />
      <AlertMsg />
      <Box
        sx={{
          flexGrow: 1,
          width: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "20px 10px",
        }}
      >
        <Outlet />
      </Box>
      <MainFooter />
    </Box>
  );
}

export default MainLayout;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";

import GetProductMUI from "./componentNew/GetProductMUI";
import GetOrderMUI from "./componentNew/GetOrderMUI";

import { getAllStore } from "../../features/Store/StoreSlice";

function AdminPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <GetProductMUI
        expanded={expanded}
        handleChange={handleChange}
        panel={"panel1"}
        tabName={"Cửa hàng"}
      />

      <GetOrderMUI
        expanded={expanded}
        handleChange={handleChange}
        panel={"panel2"}
        tabName={"Đơn hàng"}
      />
    </Box>
  );
}

export default AdminPage;

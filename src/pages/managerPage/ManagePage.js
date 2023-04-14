import React, { useEffect } from "react";

import GetProductMUI from "./componentNew/GetProductMUI";
import GetStoreMUI from "./componentNew/GetStoreMUI";
import GetUsersMUI from "./componentNew/GetUsersMUI";
import CreateProduct from "./componentNew/CreateProduct";
import CreateStore from "./componentNew/CreateStore";
import CreateUser from "./componentNew/CreateUser";

import Box from "@mui/material/Box";

import { getAllUsers, getAllAdmins } from "../../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function ManagePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 10 }));
    dispatch(getAllAdmins());
  }, [dispatch]);

  const { admins } = useSelector((state) => state.user);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ width: 1, pt: 3 }}>
      <GetProductMUI
        expanded={expanded}
        handleChange={handleChange}
        panel1={"panel1"}
        tabName={"Thông tin tất cả sản phẩm"}
      />
      <CreateProduct
        expanded={expanded}
        handleChange={handleChange}
        panel1={"panel2"}
        tabName={"Tạo sản phẩm mới"}
      />
      <GetStoreMUI
        expanded={expanded}
        handleChange={handleChange}
        panel1={"panel3"}
        tabName={"Thông tin tất cả cửa hàng"}
        admins={admins.users}
      />
      <CreateStore
        expanded={expanded}
        handleChange={handleChange}
        panel1={"panel4"}
        tabName={"Tạo cửa hàng mới"}
        admins={admins.users}
      />
      <GetUsersMUI
        expanded={expanded}
        handleChange={handleChange}
        panel1={"panel5"}
        tabName={"Thông tin tất cả tài khoản"}
      />
      <CreateUser
        expanded={expanded}
        handleChange={handleChange}
        panel1={"panel6"}
        tabName={"Tạo tài khoản mới"}
      />
    </Box>
  );
}

export default ManagePage;

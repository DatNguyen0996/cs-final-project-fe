import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../style/adminPage.style.css";

import GetOrder from "./components/GetOrder";
import GetProduct from "./components/GetProduct";

import { getAllStore } from "../../features/Store/StoreSlice";

function AdminPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);

  return (
    <div id="adminPage-container">
      <GetProduct />
      <GetOrder />
    </div>
  );
}

export default AdminPage;

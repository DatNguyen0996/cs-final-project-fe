import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/listOfStorePage.style.css";

import { getAllStore } from "../features/Store/StoreSlice";

function ListOfStore() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);
  const { stores, isLoading } = useSelector((state) => state.store);
  console.log(stores, isLoading);
  return (
    <div id="listOfStore-container">
      <h1>DANH SÁCH TẤT CẢ CÁC CỬA HÀNG</h1>
      {isLoading ? (
        <></>
      ) : (
        <table id="table-custom">
          <thead>
            <tr>
              <th width="40%">Tên sản cửa hàng</th>
              <th width="40%">Địa chỉ</th>
              <th width="20%">Hot line</th>
            </tr>
          </thead>
          <tbody>
            {stores?.stores?.map((store) => (
              <tr>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{store.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListOfStore;

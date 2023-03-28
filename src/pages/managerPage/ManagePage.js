import React, { useEffect, useState } from "react";
import "../../style/managerPage.Style.css";
import "../../style/ProductForm.Style.css";

import {
  getAllProduct,
  deleteProduct,
} from "../../features/Product/ProductSlice";
import { getAllStore, deleteStore } from "../../features/Store/StoreSlice";
import { getAllUsers, getAllAdmins } from "../../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "../managerPage/components/ProductForm";
import StoreForm from "../managerPage/components/StoreForm";
import GetStores from "./components/GetStores";
import UserForm from "./components/UserForm";
import GetUsers from "./components/GetUsers";
import GetProduct from "./components/GetProduct";

function Editfield({ form }) {
  return <div className="edit-popup">{form}</div>;
}

function Deletefield({ setPopupDelete, handleDelete }) {
  return (
    <div id="delete-popup">
      <div className="wrapper">
        <p>XÁC NHẬN XÓA?</p>
        <div className="btn">
          <button className="confirm" onClick={handleDelete}>
            Xóa
          </button>
          <button
            className="cancel"
            onClick={() => {
              setPopupDelete({});
            }}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

function ManagePage() {
  const [popupEdit, setPopupEdit] = useState({});

  const [popupDelete, setPopupDelete] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 10 }));
    dispatch(getAllAdmins());
  }, [dispatch]);

  const { users, admins } = useSelector((state) => state.user);

  const handleDelete = async () => {
    if (popupDelete.entityType === "store") {
      await dispatch(deleteStore(popupDelete._id));
      dispatch(getAllStore({ page: popupDelete.pageSelect, limit: 10 }));
    } else {
      await dispatch(deleteProduct(popupDelete._id));
      dispatch(getAllProduct({ page: popupDelete.pageSelect, limit: 10 }));
    }
    setPopupDelete({});
  };

  return (
    <div className="manager-container">
      {Object.values(popupEdit).length === 0 ? (
        <></>
      ) : (
        <Editfield
          form={
            popupEdit.entityType === "store" ? (
              <StoreForm
                popup={popupEdit.popup}
                name={`Update ${popupEdit.name}`}
                page={popupEdit.pageSelect}
                setPopupEdit={setPopupEdit}
                formType="update"
                store={popupEdit}
                admins={admins.users}
              />
            ) : (
              <ProductForm
                popup={popupEdit.popup}
                name={`Update ${popupEdit.name}`}
                page={popupEdit.pageSelect}
                setPopupEdit={setPopupEdit}
                formType="update"
                product={popupEdit}
              />
            )
          }
        />
      )}
      {Object.values(popupDelete).length === 0 ? (
        <></>
      ) : (
        <Deletefield
          setPopupDelete={setPopupDelete}
          handleDelete={handleDelete}
        />
      )}

      <GetProduct
        name={"Tất cả sản phẩm:"}
        popup={false}
        setPopupEdit={setPopupEdit}
        setPopupDelete={setPopupDelete}
      />

      <ProductForm name={"Tạo sản phẩm:"} popup={false} />

      <GetStores
        name={"Tất cả cửa hàng:"}
        // stores={stores.stores}
        popup={false}
        setPopupEdit={setPopupEdit}
        setPopupDelete={setPopupDelete}
        admins={admins.users}
        // totalPage={stores.totalPage}
      />

      <StoreForm name={"Tạo cửa hàng: "} popup={false} admins={admins.users} />

      <GetUsers
        name={"Thông tin tất cả tài khoản:"}
        popup={false}
        users={users}
      />

      <UserForm name={"Tạo tài khoản: "} popup={false} />
    </div>
  );
}

export default ManagePage;

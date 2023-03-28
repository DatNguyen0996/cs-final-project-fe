import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import IconClose from "../../../components/IconClose";
import IconOpen from "../../../components/IconOpen";

import { getAllStore } from "../../../features/Store/StoreSlice";

function StoreInforField({
  handleEditBtn,
  handleDeleteBtn,
  setPageSelect,
  pageSelect,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStore({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { stores, isLoading } = useSelector((state) => state.store);

  const { totalPage } = stores;

  const handleChange = (event, value) => {
    setPageSelect(value);
    dispatch(getAllStore({ page: value, limit: 10 }));
  };

  return (
    <div className="body">
      <div className="table">
        <table id="customers">
          <thead>
            <tr>
              <th width="20%">Tên cửa hàng</th>
              <th width="20%">Hotline</th>
              <th width="20%">Địa chỉ</th>
              <th width="20%">Quản lý</th>
              <th width="20%">Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <></>
            ) : (
              stores?.stores?.map((store, index) => {
                let admin = "";
                if (store.administrator !== null) {
                  admin = store.administrator.email;
                } else {
                  admin = "";
                }
                return (
                  <tr key={index}>
                    <td>{store.name}</td>
                    <td>{store.phone}</td>
                    <td>{store.address}</td>
                    <td>{admin}</td>
                    <td>
                      <div className="edit">
                        <button
                          onClick={() => {
                            handleEditBtn(store);
                          }}
                        >
                          <img src="/images/edit.png" alt="" />
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteBtn(store);
                          }}
                        >
                          <img src="/images/delete.png" alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {totalPage === 0 ? (
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
                onChange={handleChange}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}

function GetStores({
  name,
  popup = false,
  setPopupEdit,
  setPopupDelete,
  // admins = [],
}) {
  const [rotation, setRotation] = useState(false);
  const [pageSelect, setPageSelect] = useState(1);

  const handleEditBtn = (store) => {
    setPopupEdit({
      ...store,
      entityType: "store",
      popup: true,
      pageSelect: pageSelect,
    });
  };

  const handleDeleteBtn = (store) => {
    setPopupDelete({
      ...store,
      entityType: "store",
      popup: true,
      pageSelect: pageSelect,
    });
  };

  return (
    <div className="form-container">
      <div className="field">
        <div className="title-wrapper">
          <div className="title">
            <p>{name}</p>
          </div>
          {popup ? (
            <IconClose />
          ) : (
            <>
              <IconOpen rotation={rotation} setRotation={setRotation} />
            </>
          )}
        </div>

        {popup ? (
          <StoreInforField
            // stores={stores}
            handleEditBtn={handleEditBtn}
            handleDeleteBtn={handleDeleteBtn}
            pageSelect={pageSelect}
            setPageSelect={setPageSelect}
            // admins={admins}
          />
        ) : rotation ? (
          <StoreInforField
            // stores={stores}
            handleEditBtn={handleEditBtn}
            handleDeleteBtn={handleDeleteBtn}
            pageSelect={pageSelect}
            setPageSelect={setPageSelect}
            // admins={admins}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default GetStores;

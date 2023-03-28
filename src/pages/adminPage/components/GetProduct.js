import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import IconOpen from "../../../components/IconOpen";

import CreateProductStre from "./CreateProductStre";
import UpdateQuantity from "./UpdateQuantity";

import {
  getAllProductStore,
  deleteProductOfStore,
} from "../../../features/ProductsOfStore/ProductsOfStoreSlice";

function GetProduct() {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);
  const { allProductStore } = useSelector((state) => state.productsOfStore);
  const [rotation, setRotation] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [enable, setEnable] = useState(true);
  const [pageSelect, setPageSelect] = useState(1);

  const handleEdit = () => {
    setEnable(false);
  };

  const handleCancel = () => {
    setEnable(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductOfStore(id));
    dispatch(getAllProductStore({ storeId: storeId }));
  };

  const handleChange = (event, value) => {
    console.log(value);
    setPageSelect(value);
  };

  useEffect(() => {
    dispatch(getAllProductStore({ storeId: storeId, page: pageSelect }));
  }, [storeId, dispatch, pageSelect]);

  return (
    <div className="field">
      <div className="title-wrapper">
        <div className="title">
          <p>Cửa Hàng</p>
          <select
            onChange={(e) => setStoreId(e.currentTarget.value)}
            value={storeId}
          >
            <option value={null}>Chọn cửa hàng</option>
            {stores?.stores?.map((store, index) => (
              <option key={index} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
        <IconOpen rotation={rotation} setRotation={setRotation} />
      </div>
      {rotation ? (
        <div className="body">
          <CreateProductStre storeId={storeId} />

          <div className="table">
            <table id="table-custom">
              <thead>
                <tr>
                  <th width="25%">Tên sản phẩm</th>
                  <th width="15%">Mã sản phẩm</th>
                  <th width="15%">Kích thước</th>
                  <th width="15%">Tồn kho</th>
                  <th width="15%">Tùy chỉnh</th>
                </tr>
              </thead>
              <tbody>
                {allProductStore?.productOfOneStore?.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product.name}</td>
                    <td>{product.product.code}</td>
                    {product.product.productType === "racket" ? (
                      <td>-</td>
                    ) : (
                      <td>{product.productSize}</td>
                    )}

                    <td>
                      {enable ? (
                        product.quantity
                      ) : (
                        <UpdateQuantity
                          quantity={product.quantity}
                          id={product._id}
                          storeId={storeId}
                          setEnable={setEnable}
                        />
                      )}
                    </td>

                    <td>
                      <div className="edit">
                        {!enable ? (
                          <button onClick={handleCancel}>
                            <img src="/images/cancel.png" alt="" />
                          </button>
                        ) : (
                          <button onClick={handleEdit}>
                            <img src="/images/edit.png" alt="" />
                          </button>
                        )}

                        <button onClick={() => handleDelete(product._id)}>
                          <img src="/images/delete.png" alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {Number(allProductStore.totalPage) <= 1 ? (
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
                    count={Number(allProductStore.totalPage)}
                    page={Number(pageSelect)}
                    onChange={handleChange}
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GetProduct;

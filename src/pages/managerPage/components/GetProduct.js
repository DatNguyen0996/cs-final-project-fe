import React, { useEffect, useState } from "react";
import IconClose from "../../../components/IconClose";
import IconOpen from "../../../components/IconOpen";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { getAllProduct } from "../../../features/Product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductInforField({
  handleEditBtn,
  handleDeleteBtn,
  pageSelect,
  setPageSelect,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { products, isLoading } = useSelector((state) => state.product);

  const { totalPage } = products;

  const handleChange = (event, value) => {
    setPageSelect(value);
    dispatch(getAllProduct({ page: value, limit: 10 }));
  };

  return (
    <div className="body">
      <div className="table">
        <table id="customers">
          <thead>
            <tr>
              <th width="25%">Tên sản phẩm</th>
              <th width="15%">Mã sản phẩm</th>
              <th width="15%">Thương hiệu</th>
              <th width="15%">Giá thành</th>
              <th width="15%">Ưu đãi</th>
              <th width="15%">Tùy Chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <></>
            ) : (
              products.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.code}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.saleOff}</td>
                    <td>
                      <div className="edit">
                        <button
                          onClick={() => {
                            handleEditBtn(product);
                          }}
                        >
                          <img src="/images/edit.png" alt="" />
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteBtn(product);
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

function GetProduct({ name, popup = false, setPopupEdit, setPopupDelete }) {
  const [rotation, setRotation] = useState(false);

  const [pageSelect, setPageSelect] = useState(1);

  const handleEditBtn = (product) => {
    setPopupEdit({
      ...product,
      entityType: "product",
      popup: true,
      pageSelect: pageSelect,
    });
  };

  const handleDeleteBtn = (product) => {
    setPopupDelete({
      ...product,
      entityType: "product",
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
          <ProductInforField
            handleEditBtn={handleEditBtn}
            handleDeleteBtn={handleDeleteBtn}
            pageSelect={pageSelect}
            setPageSelect={setPageSelect}
          />
        ) : rotation ? (
          <ProductInforField
            handleEditBtn={handleEditBtn}
            handleDeleteBtn={handleDeleteBtn}
            pageSelect={pageSelect}
            setPageSelect={setPageSelect}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default GetProduct;

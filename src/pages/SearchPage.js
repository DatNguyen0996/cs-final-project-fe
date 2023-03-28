import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import "../style/style.ListOfItem.css";
import LoadingScreen from "../components/LoadingScreen";
import { filterProduct } from "../features/Product/ProductSlice";

import Card from "../components/Card";

function ListOfItemsPage() {
  const navitate = useNavigate();
  const { register, handleSubmit } = useForm();

  let { productTypeParam, pageParam, search } = useParams();

  const { products, isLoading, error } = useSelector((state) => state.product);

  const filter = useRef();

  const [filterField, setFilterField] = useState({});

  const [bodyWidth, setBodyWidth] = useState(
    document.querySelector(`body`).offsetWidth
  );
  window.addEventListener("resize", () =>
    setBodyWidth(document.querySelector(`body`).offsetWidth)
  );

  const [visibility, setVisibility] = useState();

  const dispatch = useDispatch();

  const handleFilterClick = () => {
    setVisibility(!visibility);
  };

  if (filter.current !== undefined) {
    visibility
      ? (filter.current.style.right = "0px")
      : (filter.current.style.right = "-250px");
    if (bodyWidth < 960) {
      filter.current.classList.add("responsive");
    } else {
      filter.current.classList.remove("responsive");
      filter.current.style.right = "0px";
    }
  }

  const [productType, setProductType] = useState(productTypeParam);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    setProductType(productTypeParam);
    setPage(Number(pageParam));
  }, [productTypeParam, pageParam]);

  useEffect(() => {
    dispatch(
      filterProduct({ page: page, data: { ...filterField, name: search } })
    );
  }, [dispatch, productType, filterField, page, search]);

  const onSubmit = (data) => {
    setFilterField({ ...data, name: search });
    navitate(`/search/filter/${search}/${1}`);
    dispatch(filterProduct({ data: { ...data, name: search } }));
  };

  const handleChange = (event, value) => {
    navitate(`/search/filter/${search}/${value}`);
  };

  return (
    <div className="list-item-page-container">
      <div className="list-item-wrapper">
        <div className="list-item-header">
          {bodyWidth < 960 ? (
            <div className="filter-icon" onClick={handleFilterClick}>
              <img src="/images/filter.png" alt="" />
            </div>
          ) : (
            <></>
          )}
        </div>

        {isLoading ? (
          <LoadingScreen />
        ) : error === "unknown-error" ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">Không thể kết nối đến máy chủ!!!</Alert>
          </Stack>
        ) : (
          <div className="list-item">
            {products?.products?.map((product, index) => (
              <div key={index} className="card-box">
                <Card product={product} />
              </div>
            ))}
          </div>
        )}
        {products.totalPage <= 1 || products.totalPage === undefined ? (
          <></>
        ) : (
          <Stack spacing={2} m={3} justifyContent="center" alignItems="center">
            <Pagination
              count={products.totalPage}
              page={Number(page)}
              onChange={handleChange}
            />
          </Stack>
        )}
      </div>

      <div className="filter" ref={filter}>
        <div className="filter-header">
          <p>BỘ LỌC</p>
          <button onClick={handleSubmit(onSubmit)}>
            <img src="/images/filter.png" alt="filter icon" />
          </button>
        </div>

        <form>
          <div className="field-store field-container ">
            <p className="title">LOẠI SẢN PHẨM</p>

            <div className="field">
              <input
                {...register(`productType`)}
                id="store-one"
                type="checkBox"
                value={"racket"}
              />{" "}
              <label htmlFor="store-one">Vợt cầu lông</label>
            </div>
            <div className="field">
              <input
                {...register(`productType`)}
                id="store-one"
                type="checkBox"
                value={"shoe"}
              />{" "}
              <label htmlFor="store-one">Giày cầu lông</label>
            </div>
            <div className="field">
              <input
                {...register(`productType`)}
                id="store-one"
                type="checkBox"
                value={"shirt"}
              />{" "}
              <label htmlFor="store-one">Áo cầu lông</label>
            </div>
            <div className="field">
              <input
                {...register(`productType`)}
                id="store-one"
                type="checkBox"
                value={"shorts"}
              />{" "}
              <label htmlFor="store-one">Quần cầu lông</label>
            </div>
            <div className="field">
              <input
                {...register(`productType`)}
                id="store-one"
                type="checkBox"
                value={"sportDress"}
              />{" "}
              <label htmlFor="store-one">Váy cầu lông</label>
            </div>
            <div className="field">
              <input
                {...register(`productType`)}
                id="store-one"
                type="checkBox"
                value={"accessory"}
              />{" "}
              <label htmlFor="store-one">Phụ kiện cầu lông</label>
            </div>
          </div>

          <div className="field-price field-container ">
            <p className="title">CHỌN MỨC GIÁ</p>
            <div className="field">
              <input
                id="price-one"
                type="checkBox"
                {...register(`price`)}
                value={"priceLevelOne"}
              />{" "}
              <label htmlFor="price-one"> Dưới 500.000đ</label>
            </div>
            <div className="field">
              <input
                id="price-two"
                type="checkBox"
                {...register(`price`)}
                value={"priceLevelTwo"}
              />{" "}
              <label htmlFor="price-two"> 500.000đ - 1 triệu</label>
            </div>
            <div className="field">
              <input
                id="price-three"
                type="checkBox"
                {...register(`price`)}
                value={"priceLevelThree"}
              />{" "}
              <label htmlFor="price-three"> 1 - 2 triệu</label>
            </div>
            <div className="field">
              <input
                id="price-four"
                type="checkBox"
                {...register(`price`)}
                value={"priceLevelFour"}
              />{" "}
              <label htmlFor="price-four"> 2 - 3 triệu</label>
            </div>
            <div className="field">
              <input
                id="price-five"
                type="checkBox"
                {...register(`price`)}
                value={"priceLevelFive"}
              />{" "}
              <label htmlFor="price-five"> Trên 3 triệu</label>
            </div>
          </div>

          <div className="field-brand field-container ">
            <p className="title">THƯƠNG HIỆU</p>
            <div className="field">
              <input
                id="brand-one"
                type="checkBox"
                {...register(`brand`)}
                value={"Yonex"}
              />{" "}
              <label htmlFor="brand-one">Yonex</label>
            </div>
            <div className="field">
              <input
                id="brand-two"
                type="checkBox"
                {...register(`brand`)}
                value={"Lining"}
              />{" "}
              <label htmlFor="brand-two">Lining</label>
            </div>
            <div className="field">
              <input
                id="brand-three"
                type="checkBox"
                {...register(`brand`)}
                value={"Victor"}
              />{" "}
              <label htmlFor="brand-three">Victor</label>
            </div>
            <div className="field">
              <input
                id="brand-four"
                type="checkBox"
                {...register(`brand`)}
                value={"Mizuno"}
              />{" "}
              <label htmlFor="brand-four">Mizuno</label>
            </div>
            <div className="field">
              <input
                id="brand-five"
                type="checkBox"
                {...register(`brand`)}
                value={"Proace"}
              />{" "}
              <label htmlFor="brand-five">Proace</label>
            </div>
            <div className="field">
              <input
                id="brand-six"
                type="checkBox"
                {...register(`brand`)}
                value={"Fleet"}
              />{" "}
              <label htmlFor="brand-six">Fleet</label>
            </div>
            <div className="field">
              <input
                id="brand-seven"
                type="checkBox"
                {...register(`brand`)}
                value={"Flypower"}
              />{" "}
              <label htmlFor="brand-seven">Flypower</label>
            </div>
            <div className="field">
              <input
                id="brand-eight"
                type="checkBox"
                {...register(`brand`)}
                value={"Apacs"}
              />{" "}
              <label htmlFor="brand-eight">Apacs</label>
            </div>
            <div className="field">
              <input
                id="brand-nine"
                type="checkBox"
                {...register(`brand`)}
                value={"VS"}
              />{" "}
              <label htmlFor="brand-nine">VS</label>
            </div>
            <div className="field">
              <input
                id="brand-ten"
                type="checkBox"
                {...register(`brand`)}
                value={"Kumpoo"}
              />{" "}
              <label htmlFor="brand-ten">Kumpoo</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListOfItemsPage;

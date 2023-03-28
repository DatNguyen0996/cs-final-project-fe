import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createReview, getReview } from "../../../features/Review/ReviewSlice";

import StarIsonSVG from "../../../components/StarIsonSVG";
import IconClose from "../../../components/IconClose";
import LoadingScreen from "../../../components/LoadingScreen";

const ReviewSchema = Yup.object().shape({
  username: Yup.string().required("Họ và tên được yêu cầu"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email được yêu cầu"),
  star: Yup.string().required("Vui lòng đánh giá sản phẩm"),
});

const defaultValues = {
  username: "",
  email: "",
};

function RenderComment({ setIsOpen, productId }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(ReviewSchema), defaultValues });
  const [starSelection, setstarSelection] = useState(0);

  const { isLoading, error } = useSelector((state) => state.review);

  const onSubmit = (data) => {
    dispatch(createReview({ ...data, productId: productId }));
    if (!error && !isLoading) {
      dispatch(getReview({ productId: productId }));
      reset();
      setIsOpen(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div id="popup-review-container">
        <div className="popup-wrapper">
          <div className="header">
            <p>Đánh giá và nhận xét sản phẩm</p>
            <IconClose setIsOpen={setIsOpen} />
          </div>
          <div className="body">
            <input
              type="text"
              placeholder="Họ và tên"
              {...register("username")}
            />
            <input
              type="text"
              placeholder="Địa chỉ Email"
              {...register("email")}
            />
            <textarea
              placeholder="Ý kiến, cảm nhận về sản phẩm"
              {...register("comment")}
            ></textarea>
          </div>
          <div className="selection">
            <div className="box">
              <p>Bạn thấy sản phẩm này như thế nào?</p>
              <div className="box-star">
                <input
                  name="star"
                  {...register("star")}
                  className="dontDisplay"
                  type="radio"
                  id="one"
                  value={1}
                  onClick={(e) => setstarSelection(e.currentTarget.value)}
                />
                <label className="reviewStar" htmlFor="one">
                  <StarIsonSVG selection={starSelection >= 1 ? true : false} />
                  <span>Rất tệ</span>
                </label>

                <input
                  name="star"
                  {...register("star")}
                  className="dontDisplay"
                  type="radio"
                  id="two"
                  value={2}
                  onClick={(e) => setstarSelection(e.currentTarget.value)}
                />
                <label className="reviewStar" htmlFor="two">
                  <StarIsonSVG selection={starSelection >= 2 ? true : false} />
                  <span>Tệ</span>
                </label>

                <input
                  name="star"
                  {...register("star")}
                  className="dontDisplay"
                  type="radio"
                  id="three"
                  value={3}
                  onClick={(e) => setstarSelection(e.currentTarget.value)}
                />
                <label className="reviewStar" htmlFor="three">
                  <StarIsonSVG selection={starSelection >= 3 ? true : false} />
                  <span>Bình thường</span>
                </label>

                <input
                  name="star"
                  {...register("star")}
                  className="dontDisplay"
                  type="radio"
                  id="four"
                  value={4}
                  onClick={(e) => setstarSelection(e.currentTarget.value)}
                />
                <label className="reviewStar" htmlFor="four">
                  <StarIsonSVG selection={starSelection >= 4 ? true : false} />
                  <span>Tốt</span>
                </label>

                <input
                  name="star"
                  {...register("star")}
                  className="dontDisplay"
                  type="radio"
                  id="five"
                  value={5}
                  onClick={(e) => setstarSelection(e.currentTarget.value)}
                />
                <label className="reviewStar" htmlFor="five">
                  <StarIsonSVG selection={starSelection >= 5 ? true : false} />
                  <span>Rất tốt</span>
                </label>
              </div>
            </div>
          </div>
          <div className="submitReview">
            <button>{isSubmitting ? <LoadingScreen /> : "GỬI ĐÁNH GIÁ"}</button>
          </div>

          <div className="review-error">
            {errors.email && <p>{errors.email?.message}</p>}
            {errors.username && <p>{errors.username?.message}</p>}
            {errors.star && <p>{errors.star?.message}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default RenderComment;

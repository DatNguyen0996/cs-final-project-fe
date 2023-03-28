import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import StarIsonSVG from "../../../components/StarIsonSVG";
import { getReview } from "../../../features/Review/ReviewSlice";

function RenderReview({ setIsOpen, productId }) {
  const { reviews } = useSelector((state) => state.review);

  const [averageStar, setAverageStar] = useState(0);

  useEffect(() => {
    setAverageStar(
      (reviews?.countFiveStar * 5 +
        reviews?.countFourStar * 4 +
        reviews?.countThreeStar * 3 +
        reviews?.countTwoStar * 2 +
        reviews?.countOneStar * 1) /
        reviews?.countTotalReview || 0
    );
  }, [reviews]);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReview({ page: page, productId: productId }));
  }, [dispatch, page, productId]);

  return (
    <>
      <div className="review-wrapper">
        <h2>Đánh giá & nhận xét</h2>
        <div className="review">
          <div className="average">
            <h2>{`${averageStar.toFixed(1)}/5`}</h2>
            <div className="star">
              <StarIsonSVG
                selection={Math.round(averageStar) >= 1 ? true : false}
              />
              <StarIsonSVG
                selection={Math.round(averageStar) >= 2 ? true : false}
              />
              <StarIsonSVG
                selection={Math.round(averageStar) >= 3 ? true : false}
              />
              <StarIsonSVG
                selection={Math.round(averageStar) >= 4 ? true : false}
              />
              <StarIsonSVG
                selection={Math.round(averageStar) >= 5 ? true : false}
              />
            </div>
            <p>{`${reviews?.countTotalReview} đánh giá và nhận xét`}</p>
          </div>
          <div className="count">
            <div className="count-field">
              <p>5</p>
              <StarIsonSVG selection={true} />
              <div className="slice">
                <div className="five-star"></div>
              </div>
              <p>{`${reviews?.countFiveStar} đánh giá`}</p>
            </div>
            <div className="count-field">
              <p>4</p>
              <StarIsonSVG selection={true} />
              <div className="slice">
                <div className="four-star"></div>
              </div>
              <p>{`${reviews?.countFourStar} đánh giá`}</p>
            </div>
            <div className="count-field">
              <p>3</p>
              <StarIsonSVG selection={true} />
              <div className="slice">
                <div className="three-star"></div>
              </div>
              <p>{`${reviews?.countThreeStar} đánh giá`}</p>
            </div>
            <div className="count-field">
              <p>2</p>
              <StarIsonSVG selection={true} />
              <div className="slice">
                <div className="two-star"></div>
              </div>
              <p>{`${reviews?.countTwoStar} đánh giá`}</p>
            </div>
            <div className="count-field">
              <p>1</p>
              <StarIsonSVG selection={true} />
              <div className="slice">
                <div className="one-star"></div>
              </div>
              <p>{`${reviews?.countOneStar} đánh giá`}</p>
            </div>
          </div>
        </div>

        <div className="submit-review">
          <p>Bạn nghĩ sao về sản phẩm này?</p>
          <button onClick={() => setIsOpen(true)}>Đánh giá ngay</button>
        </div>

        {reviews?.reviews?.map((review, index) => (
          <div key={index} className="comment-wrapper">
            <p className="name">{review.username}</p>
            <div className="box">
              <div className="single-review">
                <p>
                  <b>Đánh giá:</b>
                </p>
                <StarIsonSVG
                  selection={Number(review.star) >= 1 ? true : false}
                />
                <StarIsonSVG
                  selection={Number(review.star) >= 1 ? true : false}
                />
                <StarIsonSVG
                  selection={Number(review.star) >= 1 ? true : false}
                />
                <StarIsonSVG
                  selection={Number(review.star) >= 1 ? true : false}
                />
                <StarIsonSVG
                  selection={Number(review.star) >= 1 ? true : false}
                />
              </div>
              <div className="comment">
                <p>
                  <b>Nhận xét:</b> {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}

        <Stack spacing={2}>
          <Pagination
            count={reviews?.totalPage}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
}

export default RenderReview;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createReview, getReview } from "../../../features/Review/ReviewSlice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

import { FormProvider, FTextField } from "../../../components/form";

const ReviewSchema = Yup.object().shape({
  username: Yup.string().required("Họ và tên được yêu cầu"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email được yêu cầu"),
});

const defaultValues = {
  username: "",
  email: "",
  comment: "",
  star: 0,
};

const labels = {
  null: "Mời đánh giá",
  0: "Mời đánh giá",
  1: "Rất tệ",
  2: "Tệ",
  3: "Bình thường",
  4: "Tốt",
  5: "Rất tốt",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

function RenderComment({ productId, handleClose }) {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.review);

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [ratingError, setRatingError] = useState(false);

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    if (value === 0 || value === null) {
      setRatingError(true);
    } else {
      setRatingError(false);
      dispatch(createReview({ ...data, star: value, productId: productId }));
      if (!error && !isLoading) {
        dispatch(getReview({ productId: productId }));
        reset();
      }
    }
  };

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: "600px",
        bgcolor: "#fff",
        borderRadius: 5,
        overflow: "hidden",
        border: "1px solid #2222 ",
      }}
    >
      <Box
        sx={{
          bgcolor: "#e95220",
          height: 50,
          display: "flex",
          alignItems: "center",
          p: "0 10px",
        }}
      >
        <Typography sx={{ flexGrow: 1, color: "#fff" }} variant="h6">
          Đánh giá và nhận xét sản phẩm
        </Typography>
        <IconButton onClick={handleClose} sx={{ bgcolor: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: "20px" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FTextField
            name="username"
            sx={{ width: 1, mb: "20px" }}
            label="Họ và tên"
          />
          <FTextField
            name="email"
            sx={{ width: 1, mb: "20px" }}
            label="Địa chỉ Email"
          />
          <FTextField
            name="comment"
            sx={{ width: 1, mb: "20px" }}
            label="Ý kiến, cảm nhận về sản phẩm"
            multiline
            maxRows={5}
          />

          <Box
            sx={{
              width: 1,
              border: "1px solid #22222255",
              borderRadius: 2,
              p: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Typography variant="subtitle1">
              <b>Bạn thấy sản phẩm này như thế nào?</b>
            </Typography>

            <Rating
              value={value}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon />}
            />

            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>

            {ratingError ? (
              <Alert severity="warning">Mời bạn đánh giá về sản phẩm</Alert>
            ) : (
              <></>
            )}
          </Box>

          <ColorButton
            type="submit"
            size="small"
            variant="contained"
            sx={{ width: 1 }}
          >
            Gửi đánh giá
          </ColorButton>
        </FormProvider>
      </Box>
    </Box>

    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div id="popup-review-container">
    //     <div className="popup-wrapper">
    //       <div className="header">
    //         <p>Đánh giá và nhận xét sản phẩm</p>
    //         <IconClose setIsOpen={setIsOpen} />
    //       </div>
    //       <div className="body">
    //         <input
    //           type="text"
    //           placeholder="Họ và tên"
    //           {...register("username")}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Địa chỉ Email"
    //           {...register("email")}
    //         />
    //         <textarea
    //           placeholder="Ý kiến, cảm nhận về sản phẩm"
    //           {...register("comment")}
    //         ></textarea>
    //       </div>
    //       <div className="selection">
    //         <div className="box">
    //           <p>Bạn thấy sản phẩm này như thế nào?</p>
    //           <div className="box-star">
    //             <input
    //               name="star"
    //               {...register("star")}
    //               className="dontDisplay"
    //               type="radio"
    //               id="one"
    //               value={1}
    //               onClick={(e) => setstarSelection(e.currentTarget.value)}
    //             />
    //             <label className="reviewStar" htmlFor="one">
    //               <StarIsonSVG selection={starSelection >= 1 ? true : false} />
    //               <span>Rất tệ</span>
    //             </label>

    //             <input
    //               name="star"
    //               {...register("star")}
    //               className="dontDisplay"
    //               type="radio"
    //               id="two"
    //               value={2}
    //               onClick={(e) => setstarSelection(e.currentTarget.value)}
    //             />
    //             <label className="reviewStar" htmlFor="two">
    //               <StarIsonSVG selection={starSelection >= 2 ? true : false} />
    //               <span>Tệ</span>
    //             </label>

    //             <input
    //               name="star"
    //               {...register("star")}
    //               className="dontDisplay"
    //               type="radio"
    //               id="three"
    //               value={3}
    //               onClick={(e) => setstarSelection(e.currentTarget.value)}
    //             />
    //             <label className="reviewStar" htmlFor="three">
    //               <StarIsonSVG selection={starSelection >= 3 ? true : false} />
    //               <span>Bình thường</span>
    //             </label>

    //             <input
    //               name="star"
    //               {...register("star")}
    //               className="dontDisplay"
    //               type="radio"
    //               id="four"
    //               value={4}
    //               onClick={(e) => setstarSelection(e.currentTarget.value)}
    //             />
    //             <label className="reviewStar" htmlFor="four">
    //               <StarIsonSVG selection={starSelection >= 4 ? true : false} />
    //               <span>Tốt</span>
    //             </label>

    //             <input
    //               name="star"
    //               {...register("star")}
    //               className="dontDisplay"
    //               type="radio"
    //               id="five"
    //               value={5}
    //               onClick={(e) => setstarSelection(e.currentTarget.value)}
    //             />
    //             <label className="reviewStar" htmlFor="five">
    //               <StarIsonSVG selection={starSelection >= 5 ? true : false} />
    //               <span>Rất tốt</span>
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="submitReview">
    //         <button>{isSubmitting ? <LoadingScreen /> : "GỬI ĐÁNH GIÁ"}</button>
    //       </div>

    //       <div className="review-error">
    //         {errors.email && <p>{errors.email?.message}</p>}
    //         {errors.username && <p>{errors.username?.message}</p>}
    //         {errors.star && <p>{errors.star?.message}</p>}
    //       </div>
    //     </div>
    //   </div>
    // </form>
  );
}

export default RenderComment;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderComment from "./RenderComment";

import { getReview } from "../../../features/Review/ReviewSlice";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: 5,
};

function RenderReview({ setIsOpen, productId }) {
  const { reviews } = useSelector((state) => state.review);

  const [averageStar, setAverageStar] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <Box sx={{ width: 1, display: "flex", justifyContent: "center", mt: 10 }}>
      <Box
        sx={{
          width: 1,
          bgcolor: "#fff",
          maxWidth: "1200px",
          borderRadius: 3,
          boxShadow: "0 0 5px 2px #bababa",
          p: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Đánh giá & nhận xét
        </Typography>
        <Box
          sx={{
            width: 1,
            border: "1px solid #222",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Grid container spacing={0} columns={{ xs: 1, sm: 1, md: 5 }}>
            <Grid item xs={1} sm={1} md={2}>
              <Box
                sx={{
                  width: 1,
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {`${averageStar.toFixed(1)}/5`}
                </Typography>
                <Rating
                  name="read-only"
                  value={Math.round(averageStar)}
                  readOnly
                />
                <Typography variant="h6" gutterBottom>
                  {`${reviews?.countTotalReview} đánh giá và nhận xét`}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={1} sm={1} md={3}>
              <Box
                sx={{
                  width: 1,
                  minHeight: 200,
                  borderLeft: { xs: "none", sm: "none", md: "1px solid #222" },
                  borderTop: {
                    xs: "1px solid #222",
                    sm: "1px solid #222",
                    md: "none",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px 10px",
                  }}
                >
                  <Typography variant="subtitle1">5</Typography>
                  <StarIcon sx={{ color: "#FAAF00", ml: "10px" }} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      m: "0 10px",
                      borderRadius: 5,
                      overflow: "hidden",
                      border: "1px solid #e95220",
                    }}
                  >
                    <Box
                      sx={{ width: "100%", height: "10px", bgcolor: "#e95220" }}
                    ></Box>
                  </Box>
                  <Typography variant="subtitle1">{`${reviews?.countFiveStar} đánh giá`}</Typography>
                </Box>
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px 10px",
                  }}
                >
                  <Typography variant="subtitle1">4</Typography>
                  <StarIcon sx={{ color: "#FAAF00", ml: "10px" }} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      m: "0 10px",
                      borderRadius: 5,
                      overflow: "hidden",
                      border: "1px solid #e95220",
                    }}
                  >
                    <Box
                      sx={{ width: "80%", height: "10px", bgcolor: "#e95220" }}
                    ></Box>
                  </Box>
                  <Typography variant="subtitle1">{`${reviews?.countFourStar} đánh giá`}</Typography>
                </Box>
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px 10px",
                  }}
                >
                  <Typography variant="subtitle1">3</Typography>
                  <StarIcon sx={{ color: "#FAAF00", ml: "10px" }} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      m: "0 10px",
                      borderRadius: 5,
                      overflow: "hidden",
                      border: "1px solid #e95220",
                    }}
                  >
                    <Box
                      sx={{ width: "60%", height: "10px", bgcolor: "#e95220" }}
                    ></Box>
                  </Box>
                  <Typography variant="subtitle1">{`${reviews?.countThreeStar} đánh giá`}</Typography>
                </Box>
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px 10px",
                  }}
                >
                  <Typography variant="subtitle1">2</Typography>
                  <StarIcon sx={{ color: "#FAAF00", ml: "10px" }} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      m: "0 10px",
                      borderRadius: 5,
                      overflow: "hidden",
                      border: "1px solid #e95220",
                    }}
                  >
                    <Box
                      sx={{ width: "40%", height: "10px", bgcolor: "#e95220" }}
                    ></Box>
                  </Box>
                  <Typography variant="subtitle1">{`${reviews?.countTwoStar} đánh giá`}</Typography>
                </Box>
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px 10px",
                  }}
                >
                  <Typography variant="subtitle1">1</Typography>
                  <StarIcon sx={{ color: "#FAAF00", ml: "10px" }} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      m: "0 10px",
                      borderRadius: 5,
                      overflow: "hidden",
                      border: "1px solid #e95220",
                    }}
                  >
                    <Box
                      sx={{ width: "20%", height: "10px", bgcolor: "#e95220" }}
                    ></Box>
                  </Box>
                  <Typography variant="subtitle1">{`${reviews?.countOneStar} đánh giá`}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Bạn nghĩ sao về sản phẩm này?
          </Typography>
          <ColorButton
            onClick={handleOpen}
            size="small"
            variant="contained"
            sx={{ width: 1 }}
          >
            Đánh giá ngay
          </ColorButton>
        </Box>

        <Box sx={{ width: 1, mt: 5 }}>
          {reviews?.reviews?.map((review, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ ml: 5 }}>
                {review.username}
              </Typography>
              <Box sx={{ p: "10px", bgcolor: "#2222", borderRadius: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, mr: 1, fontSize: "1rem" }}
                  >
                    <b>Đánh giá:</b>
                  </Typography>
                  <Rating
                    name="read-only"
                    value={Number(review.star)}
                    readOnly
                  />
                </Box>
                <Typography variant="subtitle2" sx={{ fontSize: "1rem" }}>
                  <b>Nhận xét:</b> <span>{review.comment}</span>
                </Typography>
              </Box>
            </Box>
          ))}
          <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <Pagination
              count={reviews?.totalPage}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <RenderComment handleClose={handleClose} productId={productId} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default RenderReview;

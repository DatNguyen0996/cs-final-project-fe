import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MainFooter() {
  return (
    <>
      <Box sx={{ width: 1, bgcolor: "#222222" }}>
        <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 4 }}>
          <Grid item xs={1} sm={1} md={1}>
            <Box sx={{ width: 1, height: 200 }}>
              <Typography variant="h5" color={"#fff"} m={"20px 0"}>
                <b>THÔNG TIN CHUNG</b>
              </Typography>
              <Typography variant="subtitle2" color={"#fff"} pl={3}>
                <Box component="b" color={"#e95220"}>
                  <i>Bedminton Shop </i>
                </Box>{" "}
                <span>
                  là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn
                  quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong
                  trào tới chuyên nghiệp
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Box sx={{ width: 1, height: 200 }}>
              <Typography variant="h5" color={"#fff"} m={"20px 0"}>
                <b>THÔNG TIN LIÊN HỆ</b>
              </Typography>
              <Box component="ul" color={"#fff"}>
                <Box component="li">
                  Hotline:{" "}
                  <Box color={"#e95220"} component="span">
                    {" "}
                    096xxxxxxx
                  </Box>
                </Box>

                <Box component="li">
                  Email:{" "}
                  <Box color={"#e95220"} component="span">
                    {" "}
                    bedminton.store@gmail.com
                  </Box>
                </Box>

                <Box component="li">
                  Phản ánh dịch vụ:{" "}
                  <Box color={"#e95220"} component="span">
                    {" "}
                    096xxxxxxx
                  </Box>
                </Box>

                <Box component="li">
                  Hợp tác kinh doanh:{" "}
                  <Box color={"#e95220"} component="span">
                    {" "}
                    096xxxxxxx
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Box sx={{ width: 1, height: 200 }}>
              <Typography variant="h5" color={"#fff"} m={"20px 0"}>
                <b>DỊCH VỤ</b>
              </Typography>
              <Box component="ul" color={"#fff"}>
                <Box component="li">
                  Cung cấp các mặt hàng, dụng cụ càu lông
                </Box>

                <Box component="li">Bảo hành thiết bị/dụng cụ</Box>

                <Box component="li">Sửa chửa thiết bị/dụng cụ</Box>

                <Box component="li">Tổ chức giải thi đấu</Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Box sx={{ width: 1, height: 200 }}>
              <Typography variant="h5" color={"#fff"} m={"20px 0"}>
                <b>HỆ THỐNG CỬA HÀNG</b>
              </Typography>
              <Typography
                variant="h6"
                sx={{ pl: 3, color: "#e95220", cursor: "pointer" }}
              >
                <b>Xem tất cả các cửa hàng</b>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MainFooter;

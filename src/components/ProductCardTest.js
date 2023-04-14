import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import { fCurrency } from "../utils/numberFormat";

function ProductCard({ product }) {
  const navitate = useNavigate();
  return (
    <Card
      sx={{
        height: 1,
        aspectRatio: "2/3",
        position: "relative",
        p: "5px",
        bgcolor: "transparent",
      }}
    >
      <CardActionArea
        onClick={() => navitate(`/detail/${product._id}`)}
        sx={{
          bgcolor: "#e95220",
          borderRadius: "5px",
          height: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        {/* sale off */}
        {product.special ? (
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
          >
            <CardMedia
              component="img"
              image="/images/saleOff.png"
              height={"40px"}
            />

            <Typography
              sx={{
                color: "#fff",
                position: "absolute",
                top: 10,
                right: 0,
                width: 1,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              {product.saleOff}%
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                bgcolor: "#f44336ff",
                position: "absolute",
                top: 45,
                right: 2,
                p: "0 5px",
                borderRadius: "5px",
              }}
            >
              {fCurrency(product.price * ((100 - product.saleOff) / 100))}đ
            </Typography>
          </Box>
        ) : (
          <></>
        )}

        <Box
          component="div"
          sx={{
            m: "5px",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <CardMedia component="img" image={product.image} />
        </Box>
        <Box
          component="div"
          sx={{
            width: 1,
            flexGrow: 1,
            overflow: "hidden",
            p: "0px 5px 5px 5px",
          }}
        >
          <Stack
            spacing={0}
            sx={{
              borderRadius: "5px",
              height: 1,
              bgcolor: "#282a36",
              p: "5px",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                height: "50px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{
                color: "#ffff00",
                mt: "5px",
                textDecoration: product.special ? "line-through" : "none",
              }}
            >
              {fCurrency(product.price)}đ
            </Typography>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
export default ProductCard;

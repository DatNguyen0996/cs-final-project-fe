import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Button from "@mui/material/Button";

import ProductCard from "./ProductCardTest";

function ProductCardSlider({ products = [], name }) {
  const [marginLeft, setMarginLeft] = useState("0px");
  const [step, setStep] = useState(0);
  const boxWidth = useRef();

  const handleLeft = () => {
    const totalCard =
      products.length - Math.floor(boxWidth.current.offsetWidth / 200);
    if (step > 0) {
      setStep(step - 1);
      setMarginLeft(`-${(step - 1) * 400}px`);
    } else {
      setStep(totalCard);
      setMarginLeft(`-${totalCard * 400}px`);
    }
  };

  const handleRight = () => {
    const totalCard =
      products.length - Math.floor(boxWidth.current.offsetWidth / 200);
    if (step < totalCard) {
      setStep(step + 1);
      setMarginLeft(`-${(step + 1) * 400}px`);
    } else {
      setStep(0);
      setMarginLeft(`0px`);
    }
  };

  return (
    <Box
      ref={boxWidth}
      component="div"
      sx={{
        maxWidth: "1200px",
        width: 1,
        mt: "50px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          color: "#e95220",
          borderBottom: "1px solid #e95220",
          borderRadius: "10px",
          p: "0 20px",
          mb: 1,
        }}
      >
        {name}
      </Typography>
      <Box
        component="div"
        sx={{
          width: 1,
          height: "50px",
          bgcolor: "#e95220",
          borderRadius: "10px 10px 0 0",
        }}
      ></Box>
      <Box
        component="div"
        sx={{
          width: 1,
          height: "300px",
          bgcolor: "#22222216",
          display: "flex",
          position: "relative",
          marginLeft: marginLeft,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {products.map((product, index) => (
          <Box key={index} sx={{ width: "200px", height: "300px" }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      <Button
        onClick={handleLeft}
        size="large"
        sx={{
          position: "absolute",
          top: "60%",
          left: 0,
          transform: "translateY(-50%)",
          color: "#4e4e4e",
        }}
      >
        <ArrowCircleLeftIcon sx={{ fontSize: 50 }} />
      </Button>
      <Button
        onClick={handleRight}
        size="large"
        sx={{
          position: "absolute",
          top: "60%",
          right: 0,
          transform: "translateY(-50%)",
          color: "#4e4e4e",
        }}
      >
        <ArrowCircleRightIcon sx={{ fontSize: 50 }} />
      </Button>
    </Box>
  );
}

export default ProductCardSlider;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/userAuth";
import { useLocation, Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TextField from "@mui/material/TextField";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

import { getAllProductStore } from "../../../features/ProductsOfStore/ProductsOfStoreSlice";
import { createCart } from "../../../features/Cart/CartSlice";

import { fCurrency } from "../../../utils/numberFormat";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e95220"),
  backgroundColor: "#e95220",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#e95220",
  },
}));

const typeRender = {
  racket: "Vợt cầu lông",
  shoe: "Giày cầu lông",
  shirt: "Áo cầu lông",
  shorts: "Quần cầu lông",
  sportDress: "Váy cầu lông",
  accessory: "Phụ kiện cầu lông",
};

function RenderInfor({ productId, userId }) {
  const navitate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [isSelected, setIsSelected] = useState();
  const [quantityMax, setQuantityMax] = useState(0);

  const [noti, setNoti] = useState(null);

  const { singleProduct, isLoading: loadingProduct } = useSelector(
    (state) => state.product
  );

  const { allProductStore, isLoading: loadingStore } = useSelector(
    (state) => state.productsOfStore
  );

  let checkWeight;

  if (allProductStore.countProductOfOneStore === undefined) {
    checkWeight = 0;
  } else if (allProductStore.countProductOfOneStore === 0) {
    checkWeight = -1;
  } else {
    checkWeight = allProductStore.countProductOfOneStore;
  }

  // const { isLoading: addCart } = useSelector((state) => state.cart);
  const { stores } = useSelector((state) => state.store);

  const [storeId, setStoreId] = useState();

  const handleAdd = () => {
    if (quantity >= quantityMax) {
      setQuantity(quantityMax);
    } else setQuantity(quantity + 1);
  };
  const handlesub = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else setQuantity(quantity - 1);
  };

  const dispatch = useDispatch();

  const handleStoreSelect = (storeId) => {
    setStoreId(storeId);
  };

  useEffect(() => {
    dispatch(
      getAllProductStore({
        storeId: storeId,
        productCode: singleProduct?.product?.code,
      })
    );
  }, [dispatch, storeId, singleProduct]);

  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const handleAddToCart = () => {
    if (quantity === 0 && isSelected === undefined) {
      setNoti("Chưa chọn kích thuớc/số lượng");
    } else if (quantity === 0) {
      setNoti("Chưa chọn số lượng");
    } else if (isSelected === undefined) {
      setNoti("Chưa chọn kích thước");
    } else {
      dispatch(
        createCart({
          userId: userId,
          productId: productId,
          productCode: singleProduct?.product?.code,
          size: isSelected,
          quantity: quantity,
          storeId: storeId,
          price: singleProduct?.product?.price,
        })
      );
      setIsSelected(null);
      setNoti(null);
      setQuantity(0);
    }
  };

  return loadingProduct && loadingStore ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        width: "95vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // bgcolor: "#222",
      }}
    >
      <Box sx={{ width: 1, maxWidth: "1200px" }}>
        <Grid container spacing={1} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid item xs={6} sm={6} md={5}>
            <Box sx={{ width: 1 }}>
              <AspectRatio ratio="1">
                <img src={singleProduct?.product?.image} alt="product" />
              </AspectRatio>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={7}>
            <Box sx={{ width: 1 }}>
              <Typography level="h2" sx={{ mb: "20px" }}>
                {singleProduct?.product?.name}
              </Typography>
              <Typography level="body1" sx={{ ml: "20px" }}>
                Mã sản phẩm:{" "}
                <Typography
                  component={"span"}
                  level="h6"
                  sx={{ color: "#e95220" }}
                >
                  {singleProduct?.product?.code}
                </Typography>
              </Typography>
              <Typography level="body1" sx={{ ml: "20px" }}>
                Thương hiệu:{" "}
                <Typography
                  component={"span"}
                  level="h6"
                  sx={{ color: "#e95220" }}
                >
                  {singleProduct?.product?.brand}
                </Typography>
              </Typography>
              <Typography level="body1" sx={{ ml: "20px" }}>
                KHUYẾN MÃI:{" "}
                <Typography
                  component={"span"}
                  level="h6"
                  sx={{ color: "#e95220" }}
                >
                  -{singleProduct?.product?.saleOff}%
                </Typography>
              </Typography>
              <Typography level="body1" sx={{ ml: "20px", fontSize: "1.5rem" }}>
                Giá Thành:{" "}
                {singleProduct?.product?.special ? (
                  <>
                    <Typography
                      component={"span"}
                      level="h6"
                      sx={{
                        color: "#e95220",
                        fontSize: "1.5rem",
                        textDecoration: "line-through",
                        ml: "10px",
                      }}
                    >
                      {fCurrency(singleProduct?.product?.price)}đ
                    </Typography>
                    <Typography
                      component={"span"}
                      level="h6"
                      sx={{
                        color: "#fff",
                        bgcolor: "#e95220",
                        p: " 0 15px",
                        ml: "30px",
                        fontSize: "1.5rem",
                        borderRadius: "10px",
                      }}
                    >
                      {fCurrency(
                        singleProduct?.product?.price *
                          ((100 - singleProduct?.product?.saleOff) / 100)
                      )}
                      đ
                    </Typography>
                  </>
                ) : (
                  <Typography
                    component={"span"}
                    level="h6"
                    sx={{ color: "#e95220", fontSize: "1.5rem" }}
                  >
                    {fCurrency(singleProduct?.product?.price)}đ
                  </Typography>
                )}
              </Typography>
              <hr />
              <Box
                sx={{
                  width: 1,
                  border: "1px dashed #e95220 ",
                  borderRadius: 5,
                  mt: 5,
                  position: "relative",
                  p: "30px 10px 20px 10px",
                }}
              >
                <Typography
                  level="h6"
                  sx={{
                    p: "3px 10px",
                    border: "1px solid #e95220 ",
                    bgcolor: "#fff",
                    color: "#e95220",
                    width: 250,
                    borderRadius: 5,
                    position: "absolute",
                    top: -20,
                    left: 20,
                  }}
                >
                  HỆ THỐNG CỬA HÀNG
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={1}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {stores?.stores?.map((store, index) => (
                      <Grid item xs={4} sm={4} md={4} key={index}>
                        <ColorButton
                          onClick={() => handleStoreSelect(store._id)}
                          size="small"
                          variant="contained"
                          sx={{
                            // border: " 1px solid #e95220",
                            width: 1,
                            bgcolor: storeId === store._id ? "#fff" : "#e95220",
                            color: storeId === store._id ? "#e95220" : "#fff",
                          }}
                        >
                          {store.name}
                        </ColorButton>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
              <hr />
              <Box
                sx={{
                  width: 1,
                  border: "1px dashed #e95220 ",
                  borderRadius: 5,
                  mt: 5,
                  position: "relative",
                  p: "30px 10px 20px 10px",
                }}
              >
                <Typography
                  level="h6"
                  sx={{
                    p: "3px 10px",
                    border: "1px solid #e95220 ",
                    bgcolor: "#fff",
                    color: "#e95220",
                    width: 250,
                    borderRadius: 5,
                    position: "absolute",
                    top: -20,
                    left: 20,
                  }}
                >
                  THÊM VÀO GIỎ HÀNG
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1} columns={{ xs: 1, sm: 1, md: 2 }}>
                    <Grid item xs={1} sm={1} md={1}>
                      <Box
                        sx={{
                          borderRadius: 2,
                          width: 1,
                          height: 100,
                          bgcolor: "#2222",
                          p: 1,
                        }}
                      >
                        {checkWeight === 0 ? (
                          <Typography level="h6">LỰA CHỌN CỬA HÀNG</Typography>
                        ) : checkWeight === -1 ? (
                          <Typography level="h6">HẾT HÀNG</Typography>
                        ) : checkWeight >= 1 &&
                          singleProduct?.product?.productType === "racket" ? (
                          <>
                            <Typography level="body1">
                              Lựa chọn kích thước/ trọng lượng
                            </Typography>
                            {allProductStore?.productOfOneStore?.map(
                              (product, index) => (
                                <ColorButton
                                  key={index}
                                  onClick={() => {
                                    setIsSelected(
                                      singleProduct?.product?.weight
                                    );
                                    setQuantityMax(product.quantity);
                                  }}
                                  variant="contained"
                                  sx={{
                                    bgcolor:
                                      isSelected ===
                                      singleProduct?.product?.weight
                                        ? "#fff"
                                        : "#e95220",
                                    color:
                                      isSelected ===
                                      singleProduct?.product?.weight
                                        ? "#e95220"
                                        : "#fff",
                                  }}
                                >
                                  {singleProduct?.product?.weight}
                                </ColorButton>
                              )
                            )}
                          </>
                        ) : singleProduct?.product?.productType ===
                          "accessory" ? (
                          <></>
                        ) : (
                          <>
                            <Typography level="body1">
                              Lựa chọn kích thước/ trọng lượng
                            </Typography>
                            {allProductStore?.productOfOneStore?.map(
                              (product, index) => (
                                <ColorButton
                                  key={index}
                                  onClick={() => {
                                    setIsSelected(product.productSize);
                                    setQuantityMax(product.quantity);
                                  }}
                                  variant="contained"
                                  sx={{
                                    bgcolor:
                                      isSelected === product.productSize
                                        ? "#fff"
                                        : "#e95220",
                                    color:
                                      isSelected === product.productSize
                                        ? "#e95220"
                                        : "#fff",
                                  }}
                                >
                                  {product.productSize}
                                </ColorButton>
                              )
                            )}
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}>
                      <Box
                        sx={{
                          borderRadius: 2,
                          width: 1,
                          height: 100,
                          bgcolor: "#2222",
                          p: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2} columns={16}>
                            <Grid item xs={10}>
                              <Box
                                sx={{
                                  height: 1,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <IconButton
                                  onClick={handlesub}
                                  aria-label="delete"
                                  sx={{
                                    bgcolor: "#fff",
                                    border: "1px solid #e95220 ",
                                  }}
                                >
                                  <HorizontalRuleIcon />
                                </IconButton>

                                <FormControl error variant="standard">
                                  <TextField
                                    size="small"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(e.currentTarget.value)
                                    }
                                    type="number"
                                    sx={{
                                      bgcolor: "#ffff",
                                      flexGrow: 1,
                                      m: "0 5px",
                                    }}
                                  />
                                  <FormHelperText>{noti}</FormHelperText>
                                </FormControl>
                                <IconButton
                                  onClick={handleAdd}
                                  aria-label="delete"
                                  sx={{
                                    bgcolor: "#fff",
                                    border: "1px solid #e95220 ",
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              {!isAuthenticated ? (
                                <Box
                                  sx={{
                                    height: 1,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Link
                                    to="/login"
                                    state={{ from: location }}
                                    id="link-router"
                                  >
                                    <IconButton sx={{ bgcolor: "#ffff" }}>
                                      <AddShoppingCartIcon
                                        sx={{ fontSize: 40 }}
                                      />
                                    </IconButton>
                                  </Link>
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    height: 1,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                  }}
                                >
                                  <IconButton
                                    onClick={handleAddToCart}
                                    sx={{ bgcolor: "#ffff" }}
                                  >
                                    <AddShoppingCartIcon
                                      sx={{ fontSize: 40 }}
                                    />
                                  </IconButton>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <hr />
              <Box
                sx={{
                  width: 1,
                  border: "1px dashed #e95220 ",
                  borderRadius: 5,
                  mt: 5,
                  position: "relative",
                  p: "30px 10px 20px 10px",
                }}
              >
                <Typography
                  level="h6"
                  sx={{
                    p: "3px 10px",
                    border: "1px solid #e95220 ",
                    bgcolor: "#fff",
                    color: "#e95220",
                    width: 250,
                    borderRadius: 5,
                    position: "absolute",
                    top: -20,
                    left: 20,
                  }}
                >
                  DANH SÁCH SẢN PHẨM
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={1}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {Object.keys(typeRender).map((type, index) => (
                      <Grid item xs={4} sm={4} md={4} key={index}>
                        <ColorButton
                          onClick={() => navitate(`/listOfItem/${type}/1`)}
                          size="small"
                          variant="contained"
                          sx={{ width: 1 }}
                        >
                          {Object.values(typeRender)[index]}
                        </ColorButton>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: 1, maxWidth: "1200px", mt: 5 }}>
        <Typography level="h3">Mô tả sản phẩm</Typography>
        <hr />
        <Typography level="h4">{singleProduct?.product?.name}</Typography>
        <Typography level="body1">
          {singleProduct?.product?.description}
        </Typography>
      </Box>

      {singleProduct?.product?.productType === "racket" ? (
        <Box sx={{ width: 1, maxWidth: "1200px", mt: 5 }}>
          <Typography level="h3">Thông số kỹ thuật</Typography>
          <hr />

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={1}
              columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}
            >
              <Grid item xs={4} sm={4} md={4} sx={{ width: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #222",
                    display: "flex",
                    height: "50px",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      width: "180px",
                      bgcolor: "#e95220",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    Trình Độ Chơi:
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    {singleProduct?.product?.levelOfPlay}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ width: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #222",
                    display: "flex",
                    height: "50px",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      width: "180px",
                      bgcolor: "#e95220",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    Nội Dung Chơi:
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    {singleProduct?.product?.formality}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ width: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #222",
                    display: "flex",
                    height: "50px",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      width: "180px",
                      bgcolor: "#e95220",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    Phong Cách Chơi:
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    {singleProduct?.product?.playStyle}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ width: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #222",
                    display: "flex",
                    height: "50px",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      width: "180px",
                      bgcolor: "#e95220",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    Độ Cứng Đũa:
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    {singleProduct?.product?.hardness}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ width: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #222",
                    display: "flex",
                    height: "50px",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      width: "180px",
                      bgcolor: "#e95220",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    Điểm Cân Bằng:
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    {singleProduct?.product?.balancedPoint}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} sx={{ width: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #222",
                    display: "flex",
                    height: "50px",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      width: "180px",
                      bgcolor: "#e95220",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    Trọng Lượng:
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: "10px",
                    }}
                    level="h6"
                  >
                    {singleProduct?.product?.weight}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
export default RenderInfor;

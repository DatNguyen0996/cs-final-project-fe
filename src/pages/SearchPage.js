import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";

import { filterProduct } from "../features/Product/ProductSlice";

import ProductCard from "../components/ProductCardTest";

const typeRender = {
  racket: "Vợt cầu lông",
  shoe: "Giày cầu lông",
  shirt: "Áo cầu lông",
  shorts: "Quần cầu lông",
  sportDress: "Váy cầu lông",
  accessory: "Phụ kiện cầu lông",
};

const priceRender = {
  priceLevelOne: "Dưới 500.000đ",
  priceLevelTwo: "500.000đ - 1 triệu",
  priceLevelThree: "1 - 2 triệu",
  priceLevelFour: "2 - 3 triệu",
  priceLevelFive: "Trên 3 triệu",
};
const brandRender = [
  "Yonex",
  "Lining",
  "Victor",
  "Mizuno",
  "Proace",
  "Fleet",
  "Flypower",
  "Apacs",
  "VS",
  "Kumpoo",
];

function ListOfItemsPage() {
  const navitate = useNavigate();
  const { register, handleSubmit } = useForm();

  let { productTypeParam, pageParam, search } = useParams();

  const { products, isLoading, error } = useSelector((state) => state.product);

  const [filterField, setFilterField] = useState({});

  const dispatch = useDispatch();

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Box sx={{ width: 1, maxWidth: "1100px", p: "0 10px" }}>
      <Stack
        direction="row"
        spacing={{ xs: 0, sm: 0, md: 1 }}
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "300px",
            position: { xs: "absolute", sm: "absolute", md: "relative" },
            left: {
              xs: open ? "5px" : "-300px",
              sm: open ? "5px" : "-300px",
              md: "0px",
            },
            border: "1px solid #2222",
            borderRadius: "5px",
            bgcolor: "#fff",
            transition: "all 1s ease-in-out",
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              bgcolor: "#e1f1ff",
              height: "50px",
              borderRadius: "5px 5px 0 0",
              p: "0 5px",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ height: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  height: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "#e95220",
                  flexGrow: 1,
                }}
              >
                Bộ lọc
              </Typography>
              <Button onClick={handleSubmit(onSubmit)}>
                <FilterAltIcon
                  sx={{ height: 1, fontSize: 35, color: "#e95220" }}
                />
              </Button>
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                m: "10px 10px",
                bgcolor: "#e1f1ff",
                p: "5px 10px",
                color: "#e95220",
                fontSize: "1.2rem",
              }}
            >
              Loại sản phẩm
            </Typography>
            <FormGroup sx={{ pl: "20px" }}>
              {Object.keys(typeRender).map((type, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox {...register(`productType`)} />}
                  label={Object.values(typeRender)[index]}
                  value={type}
                />
              ))}
            </FormGroup>
          </Box>

          <Box>
            <Typography
              sx={{
                m: "10px 10px",
                bgcolor: "#e1f1ff",
                p: "5px 10px",
                color: "#e95220",
                fontSize: "1.2rem",
              }}
            >
              Chọn mức giá
            </Typography>
            <FormGroup sx={{ pl: "20px" }}>
              {Object.keys(priceRender).map((type, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox {...register(`price`)} />}
                  label={Object.values(priceRender)[index]}
                  value={type}
                />
              ))}
            </FormGroup>
          </Box>

          <Box>
            <Typography
              sx={{
                m: "10px 10px",
                bgcolor: "#e1f1ff",
                p: "5px 10px",
                color: "#e95220",
                fontSize: "1.2rem",
              }}
            >
              Thương hiệu
            </Typography>
            <FormGroup sx={{ pl: "20px" }}>
              {brandRender.map((type, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox {...register(`brand`)} value={type} />}
                  label={type}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, maxWidth: "800px" }}>
          <Box
            sx={{
              bgcolor: "#e1f1ff",
              height: "50px",
              borderRadius: "5px 5px 0 0",
              p: "0 20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                height: 1,
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "#e95220",
                flexGrow: 1,
              }}
            >
              Danh sách sản phẩm
            </Typography>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleOpen}
              sx={{
                height: "40px",
                width: "40px",
                display: { xs: "block", sm: "block", md: "none" },
              }}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          {isLoading ? (
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
          ) : error === "unknown-error" ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">Không thể kết nối đến máy chủ!</Alert>
            </Stack>
          ) : (
            <Box sx={{ flexGrow: 1, maxWidth: "800px" }}>
              <Grid container spacing={0} columns={{ xs: 4, sm: 9, md: 12 }}>
                {products?.products?.map((product, index) => (
                  <Grid xs={2} sm={3} md={3} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              {products.totalPage <= 1 || products.totalPage === undefined ? (
                <></>
              ) : (
                <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={products.totalPage}
                    page={page}
                    onChange={handleChange}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default ListOfItemsPage;

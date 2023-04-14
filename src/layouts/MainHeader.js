import React, { useEffect } from "react";
import logoImg from "../logoBadminton.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { getCurrentUser } from "../features/User/UserSlice";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import AspectRatio from "@mui/joy/AspectRatio";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const searchSchema = Yup.object().shape({
  search: Yup.string().required("Không có từ khóa tìm kiếm"),
});

function MainHeader() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
  });
  const navitate = useNavigate();

  const onSubmit = (data) => {
    navitate(`/search/all/${data.search}/${1}`);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  ///////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button
          onClick={() => navitate("/account")}
          variant="outlined"
          sx={{ width: 1, color: "#e95220", border: "1px solid #e95220" }}
          startIcon={<PersonIcon />}
        >
          Tài khoản
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate(`/cart`)}
          variant="outlined"
          sx={{ width: 1, color: "#e95220", border: "1px solid #e95220" }}
          startIcon={<ShoppingCartIcon />}
        >
          Giỏ hàng
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate("/listOfStore")}
          variant="outlined"
          sx={{ width: 1, color: "#e95220", border: "1px solid #e95220" }}
          startIcon={<LocationOnIcon />}
        >
          Hệ thống cửa hàng
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          variant="outlined"
          sx={{ width: 1, color: "#e95220", border: "1px solid #e95220" }}
          startIcon={<PhoneInTalkIcon />}
        >
          Hotline
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate("/")}
          sx={{
            width: 1,
            color: "#e95220",
            border: "1px solid #e95220",
            fontSize: "1rem",
          }}
          variant="outlined"
        >
          trang chủ
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate("/listOfItem/all/1")}
          sx={{
            width: 1,
            color: "#e95220",
            border: "1px solid #e95220",
            fontSize: "1rem",
          }}
          variant="outlined"
        >
          sản phẩm
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate("/saleOff/all/1")}
          sx={{
            width: 1,
            color: "#e95220",
            border: "1px solid #e95220",
            fontSize: "1rem",
          }}
          variant="outlined"
        >
          sale off
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate("/intro")}
          sx={{
            width: 1,
            color: "#e95220",
            border: "1px solid #e95220",
            fontSize: "1rem",
          }}
          variant="outlined"
        >
          giới thiêu
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => navitate("/contact")}
          sx={{
            width: 1,
            color: "#e95220",
            border: "1px solid #e95220",
            fontSize: "1rem",
          }}
          variant="outlined"
        >
          liên hệ
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#282a36" }}>
        <Toolbar>
          <AspectRatio
            ratio="1"
            sx={{
              width: 60,
              borderRadius: 5,
              border: "1px solid #2222",
              m: " 10px",
            }}
          >
            <img src={logoImg} alt="product" />
          </AspectRatio>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                {...register(`search`)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="outlined"
              sx={{ color: "#fff", border: "1px solid #fff" }}
              startIcon={<PhoneInTalkIcon />}
            >
              Hotline
            </Button>
            <Button
              onClick={() => navitate("/listOfStore")}
              variant="outlined"
              sx={{ color: "#fff", border: "1px solid #fff" }}
              startIcon={<LocationOnIcon />}
            >
              Hệ thống cửa hàng
            </Button>
            <Button
              onClick={() => navitate(`/cart`)}
              variant="outlined"
              sx={{ color: "#fff", border: "1px solid #fff" }}
              startIcon={<ShoppingCartIcon />}
            >
              Giỏ hàng
            </Button>
            <Button
              onClick={() => navitate("/account")}
              variant="outlined"
              sx={{ color: "#fff", border: "1px solid #fff" }}
              startIcon={<PersonIcon />}
            >
              Tài khoản
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Box
        sx={{
          height: 50,
          bgcolor: "#e95220",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => navitate("/")}
          sx={{
            width: 150,
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          variant="text"
        >
          trang chủ
        </Button>
        <Button
          onClick={() => navitate("/listOfItem/all/1")}
          sx={{
            width: 150,
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          variant="text"
        >
          sản phẩm
        </Button>
        <Button
          onClick={() => navitate("/saleOff/all/1")}
          sx={{
            width: 150,
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          variant="text"
        >
          sale off
        </Button>
        <Button
          onClick={() => navitate("/intro")}
          sx={{
            width: 150,
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          variant="text"
        >
          giới thiêu
        </Button>
        <Button
          onClick={() => navitate("/contact")}
          sx={{
            width: 150,
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          variant="text"
        >
          liên hệ
        </Button>
      </Box>
    </Box>
  );
}

export default MainHeader;

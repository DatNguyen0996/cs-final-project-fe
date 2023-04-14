import React, { useEffect, useState } from "react";
import { fCurrency } from "../../../utils/numberFormat";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

import { getCart, updateCart } from "../../../features/Cart/CartSlice";

function Item({
  cart,
  user,
  register,
  index,
  handleDeleteCart,
  selecion,
  setSelecion,
  count,
  setCount,
}) {
  const [numberItem, setNumberItem] = useState(cart.quantity);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    isChecked ? setCount(count - 1) : setCount(count + 1);
  };

  useEffect(() => {
    if (count === 0) {
      setSelecion(null);
    }
  }, [count, setSelecion]);

  useEffect(() => {
    if (isChecked) {
      setSelecion(cart.storeId._id);
    }
  }, [isChecked, cart, setSelecion]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (numberItem < 0) {
      setNumberItem(0);
    }
  }, [numberItem]);

  useEffect(() => {
    dispatch(updateCart({ quantity: numberItem }, cart._id));
    dispatch(getCart({ userId: user?.currentUser?._id }));
  }, [numberItem, dispatch, user, cart._id]);

  return (
    <Box
      sx={{
        m: "10px 0",
        width: 1,
        border: "1px solid #2222",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 1,
          height: 50,
          bgcolor: "#e95220",
          p: "0 10px",
          display: "flex",
        }}
      >
        <FormControlLabel
          sx={{ color: "#fff", flexGrow: 1 }}
          control={
            <Checkbox
              {...register(`cart${index}`)}
              name={`cart${index}`}
              onChange={handleOnChange}
              checked={isChecked}
              value={cart._id}
              inputProps={{ "aria-label": "controlled" }}
              disabled={selecion !== null && selecion !== cart.storeId._id}
            />
          }
          label={cart.productId.name}
        />
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleDeleteCart(cart._id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box sx={{ width: 1, p: 2 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 3, sm: 5, md: 5 }}
        >
          <Grid
            item
            xs={3}
            sm={1}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              textAlign="center"
              sx={{ maxWidth: "250px", p: "10px 0" }}
            >
              <b>{cart.storeId.name}</b>
            </Typography>
          </Grid>

          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              label="Số lượng"
              type="number"
              value={numberItem}
              onChange={(event) => {
                setNumberItem(event.target.value);
              }}
              sx={{ width: 100, m: "10px 0" }}
            />
          </Grid>

          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              disabled
              label="Size"
              value={cart.size}
              sx={{ width: 100, m: "10px 0" }}
            />
          </Grid>

          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              disabled
              label="Giá thành (VND)"
              value={fCurrency(
                ((cart.price * (100 - cart.productId.saleOff)) / 100) *
                  cart.quantity
              )}
              sx={{ width: 120, m: "10px 0" }}
            />
          </Grid>

          <Grid
            item
            xs={3}
            sm={1}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AspectRatio
              ratio="1"
              sx={{
                width: 100,
                borderRadius: 5,
                border: "1px solid #2222",
              }}
            >
              <img src={cart.productId.image} alt="product" />
            </AspectRatio>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Item;

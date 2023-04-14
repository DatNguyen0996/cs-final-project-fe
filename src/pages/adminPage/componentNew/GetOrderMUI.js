import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AspectRatio from "@mui/joy/AspectRatio";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

import ProductType from "../../../components/ProductType";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import { fCurrency } from "../../../utils/numberFormat";

import {
  getOrderOfStore,
  updateOrder,
} from "../../../features/Order/OrderSlice";
import { getOrderOfUser } from "../../../features/Order/OrderSlice";

const orderStatus = [
  {
    value: "pending",
    label: "Chờ xác nhận",
  },
  {
    value: "packing",
    label: "Đang chuẩn bị",
  },
  {
    value: "waiting",
    label: "Chờ giao hàng",
  },
  {
    value: "delivery",
    label: "Đang giao hàng",
  },
  {
    value: "paymented",
    label: "Đã thanh toán",
  },
  {
    value: "success",
    label: "Giao hàng thành công",
  },
  {
    value: "cancle",
    label: "Hủy đơn hàng",
  },
];

function GetOrderMUI({ expanded, handleChange, panel1, tabName }) {
  const { stores } = useSelector((state) => state.store);
  const { currentUser } = useSelector((state) => state.user);
  let storeOption = [
    {
      value: "",
      label: "Chọn cửa hàng",
    },
  ];
  stores?.stores?.forEach((store) => {
    storeOption = [...storeOption, { value: store._id, label: store.name }];
  });

  const [storeId, setStoreId] = useState("");
  const handleChangeStore = (e) => {
    setStoreId(e);
  };

  const dispatch = useDispatch();
  const { orderOfStore } = useSelector((state) => state.order);

  useEffect(() => {
    if (storeId !== "") dispatch(getOrderOfStore({ storeId }));
  }, [dispatch, storeId]);

  const handleChangeStatus = (orderStatus, id) => {
    dispatch(updateOrder({ status: orderStatus }, id));
    dispatch(getOrderOfStore({ storeId }));
    dispatch(getOrderOfUser({ userId: currentUser?.currentUser?._id }));
  };
  return (
    <Accordion expanded={expanded === panel1} onChange={handleChange(panel1)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "80%", flexShrink: 0 }}>{tabName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            width: 1,
            border: "1px solid #222222",
            p: "50px 10px 10px 10px",
            mt: "30px",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <TextField
            sx={{
              width: 250,
              position: "absolute",
              bgcolor: "#fff",
              top: "-30px",
            }}
            select
            label="Chọn cửa hàng"
            value={storeId}
            onChange={(event) => {
              handleChangeStore(event.target.value);
            }}
          >
            {storeOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {orderOfStore?.countOrders === 0 ? (
            <Box>
              <Alert severity="info">Không có đơn hàng nào</Alert>
            </Box>
          ) : (
            <></>
          )}
          {storeId ? (
            <Box>
              {orderOfStore?.orders?.map((order, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "#fff7ea",
                      p: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Box>
                      <TextField
                        sx={{ width: 200 }}
                        select
                        label="Trạng thái đơn hàng"
                        defaultValue="pending"
                        variant="standard"
                        value={order.status}
                        onChange={(event) => {
                          handleChangeStatus(event.target.value, order._id);
                        }}
                      >
                        {orderStatus.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    {order.items.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          pt: "10px",
                          borderTop: "1px solid #2222",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ width: 100 }}>
                          <AspectRatio
                            ratio="1"
                            sx={{
                              width: 100,
                              borderRadius: 5,
                              border: "1px solid #2222",
                            }}
                          >
                            <img src={item.product.image} alt="product" />
                          </AspectRatio>
                        </Box>
                        <Box
                          sx={{
                            flexGrow: 1,
                            p: "0 10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.product.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            <i>
                              Phân loại:{" "}
                              <ProductType value={item.product.productType} />
                            </i>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1">
                              <i>
                                SL: <b>x{item.quantity}</b>
                              </i>
                            </Typography>
                            <Typography variant="subtitle1">
                              <i>
                                $ <b>{fCurrency(item.totalPrice)}đ</b>
                              </i>
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#faebd7",
                      p: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <MonetizationOnIcon
                      sx={{ color: "#e95220", fontSize: 40 }}
                    />
                    <Typography variant="h5">
                      <i>Thành tiền:</i>
                    </Typography>
                    <Typography variant="h5" color="#e95220">
                      <i> {fCurrency(order.totalPrice)}đ</i>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box>
              <Alert severity="info">Lựa chọn cửa hàng</Alert>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default GetOrderMUI;

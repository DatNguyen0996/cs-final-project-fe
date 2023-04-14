import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  cart: [],
  preOrder: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updateCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.cart = action.payload;
    },

    preOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.preOrder = action.payload;
    },

    deleteCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createCart = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/api/carts", data);
    dispatch(slice.actions.createCartSuccess(response.data));
    toast.success("Đã thêm vào giỏ hàng");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateCart = (data, cartId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/api/carts/${cartId}`, data);
    dispatch(slice.actions.updateCartSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getCart = (infor) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let { page, limit, userId } = infor;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  let Url = `/api/carts/${userId}?page=${page}&limit=${limit}`;

  try {
    const response = await apiService.get(Url);
    dispatch(slice.actions.getCartSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const preOrder = (carts, data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let cartSelect = Object.values(data).filter((e) => e !== false);

  let preOrder = carts.filter((cart) => cartSelect.includes(cart._id));

  let storeList = [];
  let newStoreList = [];

  preOrder.map((item) => {
    if (storeList.length === 0) {
      storeList.push(item.storeId._id);
      newStoreList = [
        ...newStoreList,
        { storeId: item.storeId._id, storeName: item.storeId.name, items: [] },
      ];
    } else {
      if (!storeList.includes(item.storeId._id)) {
        storeList.push(item.storeId._id);
        newStoreList = [
          ...newStoreList,
          {
            storeId: item.storeId._id,
            storeName: item.storeId.name,
            items: [],
          },
        ];
      }
    }
    return storeList;
  });

  preOrder = preOrder.map((item) => {
    return {
      ...item,
      price:
        item.price * ((100 - item.productId.saleOff) / 100) * item.quantity,
    };
  });
  console.log(newStoreList);

  dispatch(slice.actions.preOrderSuccess(preOrder));
};

export const deleteCart = (cartId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/api/carts/${cartId}`);
    dispatch(slice.actions.deleteCartSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

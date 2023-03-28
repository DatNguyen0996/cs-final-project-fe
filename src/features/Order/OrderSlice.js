import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  orderOfUser: [],
  orderOfStore: [],
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.orderOfUser = [];
    },

    createOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getOrderOfUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orderOfUser = action.payload;
    },
    getOrderOfStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orderOfStore = action.payload;
    },

    deleteOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createOrder = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/api/orders", data);
    dispatch(slice.actions.createOrderSuccess(response.data));
    toast.success("Đặt hàng thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const updateOrder = (data, orderId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/api/orders/${orderId}`, data);
    dispatch(slice.actions.updateOrderSuccess(response.data));
    toast.success("Đã cập nhật đơn hàng");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getOrderOfUser = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let { page, limit, userId } = data;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  let Url = `/api/orders/user/${userId}?page=${page}&limit=${limit}`;

  try {
    const response = await apiService.get(Url);
    dispatch(slice.actions.getOrderOfUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getOrderOfStore = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let { page, limit, storeId } = data;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  let Url = `/api/orders/store/${storeId}?page=${page}&limit=${limit}`;

  try {
    const response = await apiService.get(Url);
    dispatch(slice.actions.getOrderOfStoreSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const deleteỎder = (orderId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/api/orders/${orderId}`);
    dispatch(slice.actions.deleteOrderSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

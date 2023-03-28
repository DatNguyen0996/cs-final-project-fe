import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  error: null,
  stores: [],
};

const slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.stores = action.payload;
    },
    updateStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createStore = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  let newData = {};

  if (data.administrator === "") {
    newData = { ...data, administrator: null };
  } else {
    newData = { ...data };
  }

  try {
    const response = await apiService.post("/api/stores", newData);
    // const createWareHouse = await apiService.post("/api/wareHouses", {
    //   store: `${response.data.store._id}`,
    // });
    dispatch(slice.actions.createStoreSuccess(response));
    toast.success("Tạo cửa hàng thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllStore =
  (query = {}) =>
  async (dispatch) => {
    let { page, limit } = query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/api/stores?page=${page}&limit=${limit}`
      );
      dispatch(slice.actions.getStoreSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const updateStore = (data, storeId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/api/stores/${storeId}`, data);
    dispatch(slice.actions.updateStoreSuccess(response.data));
    toast.success("Đã cập nhật");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const deleteStore = (storeId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/api/stores/${storeId}`);
    dispatch(slice.actions.deleteStoreSuccess(response.data));
    toast.success("Đã xóa thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

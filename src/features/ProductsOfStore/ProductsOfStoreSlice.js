import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  error: null,
  productOfAllStore: [],
  allProductStore: {},
  notification: null,
};

const slice = createSlice({
  name: "productsOfStore",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.productOfAllStore = [];
      state.allProductStore = {};
      state.error = true;
      state.error = action.payload;
    },

    clearAllProductStore(state) {
      state.isLoading = true;
      state.error = null;
      state.allProductStore = [];
    },
    createNotification(state, action) {
      state.notification = action.payload;
    },
    getProductOfAllStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productOfAllStore = action.payload;
    },
    getAllProductStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.allProductStore = action.payload;
    },
    CreateProductOfStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updateProductOfStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteProductOfStoreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getProductOfAllStore = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(
      `/api/productsOfStore?productId=${productId}`
    );
    dispatch(slice.actions.getProductOfAllStoreSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllProductStore =
  ({ storeId, productCode, page }) =>
  async (dispatch) => {
    await dispatch(slice.actions.startLoading());

    try {
      const response = await apiService.get(
        `/api/productsOfStore/allproduct?page=${page}&limit=${10}&storeId=${storeId}&productCode=${
          productCode ? productCode : ""
        }`
      );
      dispatch(slice.actions.getAllProductStoreSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const creatProductOfStore = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  console.log(data);
  try {
    const response = await apiService.post("/api/productsOfStore", data);
    dispatch(slice.actions.CreateProductOfStoreSuccess(response.data));
    toast.success("Đã thêm sản phẩm");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateProductOfStore = (data, id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/api/productsOfStore/${id}`, data);
    dispatch(slice.actions.updateProductOfStoreSuccess(response.data));
    toast.success("Cập nhật thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const deleteProductOfStore = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/api/productsOfStore/${id}`);
    dispatch(slice.actions.deleteProductOfStoreSuccess(response.data));
    toast.success("Sản phẩm đã được xóa");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const clearAllProductOfStore = () => async (dispatch) => {
  dispatch(slice.actions.clearAllProductStore());
};

export default slice.reducer;

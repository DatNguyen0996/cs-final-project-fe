import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloundinaryUpload } from "../../utils/cloundinary";

const initialState = {
  isLoading: true,
  error: null,
  products: [],
  singleProduct: [],
  notification: null,
  saleOff: [],
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createNotification(state, action) {
      state.notification = action.payload;
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.notification = null;
    },
    updateProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.notification = null;
    },
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    },
    getSingleProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singleProduct = action.payload;
    },

    filterProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    },
    getSaleOffProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.saleOff = action.payload;
    },

    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.notification = null;
    },
  },
});

export const createProduct = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const imageUrl = await cloundinaryUpload(data.image);
    const response = await apiService.post("/api/products", {
      ...data,
      image: imageUrl,
    });
    dispatch(slice.actions.createProductSuccess(response));
    toast.success("Tạo sản phẩm thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateProduct = (data, productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const imageUrl = await cloundinaryUpload(data.image);
    let newData = {};
    if (imageUrl === "" || imageUrl === null || imageUrl === undefined) {
      newData = { ...data };
    } else {
      newData = { ...data, image: imageUrl };
    }
    const response = await apiService.put(
      `/api/products/${productId}`,
      newData
    );
    dispatch(slice.actions.updateProductSuccess(response.data));
    toast.success("Cập nhật thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllProduct =
  (query = {}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    let { page, limit, name, productType, productCode, special } = query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;
    name = name || "";
    productType = productType || "";
    productCode = productCode || "";
    special = special || "";
    let Url = `/api/products?page=${page}&limit=${limit}&productName=${name}&productType=${productType}&productCode=${productCode}&special=${special}`;

    try {
      const response = await apiService.get(Url);
      dispatch(slice.actions.getProductSuccess(response.data));

      const noti =
        response.data.countProducts !== 0 ? null : "Sản phẩm không tồn tại!";

      dispatch(slice.actions.createNotification(noti));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getSaleOfflProduct = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let Url = `/api/products?&special=${true}`;

  try {
    const response = await apiService.get(Url);
    dispatch(slice.actions.getSaleOffProductSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    // toast.error(error.message);
  }
};

export const getSingleProduct = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/api/products/${productId}`);
    dispatch(slice.actions.getSingleProductSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const filterProduct =
  ({ data, page }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(
        `/api/products/filter?page=${page}`,
        data
      );
      dispatch(slice.actions.filterProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/api/products/${productId}`);
    dispatch(slice.actions.deleteProductSuccess(response.data));
    toast.success("Đã xóa sản phẩm");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

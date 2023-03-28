import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  admins: [],
  currentUser: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    CreateUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    },
    getAdminsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.admins = action.payload;
    },
    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    },

    clearSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentUser = [];
      state.users = [];
    },

    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createUser = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/api/users", data);
    dispatch(slice.actions.CreateUserSuccess(response));
    toast.success("Tạo tài khoản thành công");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error("Tạo tài đã tồn tại");
  }
};

export const getAllUsers =
  (query = {}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    let { page, limit, name, role } = query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;
    name = name || "";
    role = role || "";

    let Url = `/api/users?page=${page}&limit=${limit}&name=${name}&role=${role}`;

    try {
      const response = await apiService.get(Url);
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getCurrentUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    const response = await apiService.get("/api/users/me");
    dispatch(slice.actions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const clearUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    dispatch(slice.actions.clearSuccess());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllAdmins =
  (query = {}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    let { page, limit } = query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    let Url = `/api/users?page=${page}&limit=${limit}&role=employee`;

    try {
      const response = await apiService.get(Url);
      dispatch(slice.actions.getAdminsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const updateUser = (data, userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    console.log(data, userId);
    const response = await apiService.put(`/api/users/${userId}`, data);
    dispatch(slice.actions.updateUserSuccess(response.data));
    toast.success("Đã cập nhật tài khoản");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

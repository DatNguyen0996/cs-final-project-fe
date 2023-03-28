import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  contacts: [],
};

const slice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createContactSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getContactSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },
  },
});

export const createContact = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/api/contacts", data);
    dispatch(slice.actions.createContactSuccess(response.data));
    toast.success("Đã gửi thư");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getContact = (infor) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let { page, limit } = infor;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  let Url = `/api/contacts?page=${page}&limit=${limit}`;

  try {
    const response = await apiService.get(Url);
    dispatch(slice.actions.getContactSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

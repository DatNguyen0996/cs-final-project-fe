import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  error: null,
  reviews: [],
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.reviews = action.payload;
    },
  },
});

export const createReview = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/api/reviews", data);
    dispatch(slice.actions.createReviewSuccess(response.data));
    toast.success("Cảm ơn ý kiến của bạn");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getReview = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  let { page, limit, productId, email } = data;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 3;

  let Url = `/api/reviews/${productId}?page=${page}&limit=${limit}`;

  try {
    const response = await apiService.get(Url, { email });
    dispatch(slice.actions.getReviewSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;

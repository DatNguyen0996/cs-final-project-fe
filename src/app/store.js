import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/ProductSlice";
import storeReducer from "../features/Store/StoreSlice";
import userReducer from "../features/User/UserSlice";
import productsOfStoreReducer from "../features/ProductsOfStore/ProductsOfStoreSlice";
import cartReducer from "../features/Cart/CartSlice";
import reviewReducer from "../features/Review/ReviewSlice";
import orderReducer from "../features/Order/OrderSlice";
import contactReducer from "../features/Contact/ContactSlice";

const rootReducer = combineReducers({
  product: productReducer,
  store: storeReducer,
  user: userReducer,
  productsOfStore: productsOfStoreReducer,
  cart: cartReducer,
  review: reviewReducer,
  order: orderReducer,
  contact: contactReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

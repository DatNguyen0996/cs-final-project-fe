import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/account/AccountPage";

import ContactPage from "../pages/ContactPage";
import DetailPage from "../pages/detailPage/DetailPage";
import HomePage from "../pages/HomePage";
import ListOfItemsPage from "../pages/ListOfItemsPage";
import ListOfStore from "../pages/ListOfStore";
import LoginPage from "../pages/LoginPage";

import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
// import UserDetailPage from "../pages/UserProfilePage";
import AuthRequire from "./AuthRequire";
import CartPage from "../pages/CartPage/CartPage";
import PaymentPage from "../pages/PaymentPage";
import SaleOffPage from "../pages/SaleOffPage";
import SearchPage from "../pages/SearchPage";
import IntroPage from "../pages/IntroPage";

function Router() {
  return (
    //page error
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* <AuthRequire></AuthRequire> */}

        <Route index element={<HomePage />} />
        <Route
          path="account"
          element={
            <AuthRequire>
              <AccountPage />
            </AuthRequire>
          }
        />

        <Route path="contact" element={<ContactPage />} />
        <Route path="intro" element={<IntroPage />} />
        <Route path="detail/:productId" element={<DetailPage />} />

        <Route
          path="listOfItem/:productTypeParam/:pageParam"
          element={<ListOfItemsPage />}
        />

        <Route
          path="saleOff/:productTypeParam/:pageParam"
          element={<SaleOffPage />}
        />

        <Route
          path="search/:productTypeParam/:search/:pageParam"
          element={<SearchPage />}
        />

        <Route path="listOfStore" element={<ListOfStore />} />

        <Route
          path="cart"
          element={
            <AuthRequire>
              <CartPage />
            </AuthRequire>
          }
        />

        <Route
          path="order/payment"
          element={
            <AuthRequire>
              <PaymentPage />
            </AuthRequire>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

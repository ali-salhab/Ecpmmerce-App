import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "@clerk/clerk-react";
import DashBoradLayout from "./layouts/DashboardLayouts";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import CustomerPage from "./pages/CustomerPage";
import ProductsPage from "./pages/ProductsPage";
import { Loader } from "lucide-react";
import PageLoader from "./components/PageLoader";
function App() {
  const { isSignedIn, isLoaded } = useAuth();
  console.log("isSignedIn", isSignedIn);

  if (!isLoaded) {
    return <PageLoader />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isSignedIn ? <Navigate to={"/dashboard"} replace /> : <LoginPage />
        }
      ></Route>
      <Route
        path="/"
        element={isSignedIn ? <DashBoradLayout /> : <Navigate to={"/login"} />}
      >
        <Route index element={<Navigate to={"dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomerPage />} />
      </Route>
    </Routes>
  );
}

export default App;

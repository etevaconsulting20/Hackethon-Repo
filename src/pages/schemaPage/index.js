import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import HomeList from "./components/list";
import ProductForm from "./containers/ProductForm";

const Product = () => {
  const Location = useLocation();
  return (
    <>
      <div className="main-page-container overflow-auto">
        <Routes>
          <Route
            path={`/`}
            element={<Navigate replace="/" to={`${Location.pathname}/form`} />}
          ></Route>
          <Route path={"form"} element={<ProductForm />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Product;

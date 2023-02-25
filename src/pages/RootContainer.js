import React, { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContextProvider } from "../layouts/theme";
import Login from "./auth";
import MainApp from "./MainApp";
// import { getAuthStatusAction } from "src/redux/slice/authSlice";
import { getAuthStatusAction } from "src/redux/thunks/authThunk";
// eslint-disable-next-line no-unused-vars

const RootContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch()

  const authState = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAuthStatusAction())
  }, []);


  if (!authState.isAuthTokenChecked) {
    return (
      <>
        
      </>
    )
  }


  return (
    <>
      <ThemeContextProvider Theme={"light"}>
        <Routes>
          <Route
            path="app/*"
            element={
              authState.isAuth ? <MainApp /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              authState.isAuth ? (
                <Navigate replace to="/app" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </ThemeContextProvider>
    </>
  );
};

export default RootContainer;

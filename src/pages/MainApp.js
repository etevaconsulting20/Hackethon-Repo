import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { WithNavBar, WithSideBar, WithBottomTab } from "../layouts/index,";
import Home from "./home";
import Users from "./users";
import Product from "./product"
import QRTest from "./qrtest";
import GPSTest from "./gpstest";
import { insertScannedCodeAction, insertLatitudeAction, insertLongitudeAction } from 'src/redux/slice/productSlice';

const MainApp = (props) => {
  const Location = useLocation();

  const dispatch = useDispatch();

  const insertScannedCode = (data) => dispatch(insertScannedCodeAction(data));
  window.insertScannedCode = insertScannedCode;

  const insertLatitude = (data) => dispatch(insertLatitudeAction(data));
  window.insertLatitude = insertLatitude;

  const insertLongitude = (data) => dispatch(insertLongitudeAction(data));
  window.insertLongitude = insertLongitude;

  return (
    // <WithBottomTab>
    //   <div className="container-fluid main-app-container">
    //     <Routes>
    //       <Route
    //         path={"/"}
    //         element={<Navigate replace to={`${Location.pathname}/home`} />}
    //       />
    //       <Route path={`home/*`} element={<Home />} />
    //     </Routes>
    //   </div>
    // </WithBottomTab>
    <WithSideBar>
      <div style={{zIndex: 10,}} className="container-fluid main-app-container">
        <Routes>
          <Route
            path={"/"}
            element={<Navigate replace to={`${Location.pathname}/home`} />}
          />
          <Route path={`home/*`} element={<Home />} />
          {/* <Route path={`user/*`} element={<Users />} />
          <Route path={`product/*`} element={<Product />} />
          <Route path={`qrtest/*`} element={<QRTest />} />
          <Route path={`gpstest/*`} element={<GPSTest />} /> */}
        </Routes>
      </div>
    </WithSideBar>
    // <WithNavBar>
    //   <div className="container-fluid main-app-container mx-0">
    //     <Routes>
    //       <Route
    //         path={"/"}
    //         element={<Navigate replace to={`${Location.pathname}/home`} />}
    //       />
    //     </Routes>
    //   </div>
    // </WithNavBar>
  );
};

export default MainApp;

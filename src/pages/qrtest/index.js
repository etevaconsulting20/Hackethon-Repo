import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import QRTestView from "./components/qrTest";

const QRTest = () => {
  const state = useSelector(state => state.product);

  return (
    <>
      <div className="main-page-container">
        <Routes>
          <Route path="/" element={<QRTestView scannedCode={state.scannedCode} latitude={state.latitude} longitude={state.longitude} />} />
        </Routes>
      </div>
    </>
  );
};

export default QRTest;

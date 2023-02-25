import React from "react";
import { Route, Routes } from "react-router-dom";
import GPSTestView from "./components/gpsTest";

const GPSTest = () => {
  return (
    <>
      <div className="main-page-container">
        <Routes>
          <Route path={"/:position"} element={<GPSTestView />} />
        </Routes>
      </div>
    </>
  );
};

export default GPSTest;

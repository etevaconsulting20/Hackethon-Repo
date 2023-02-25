import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomeList from "./components/list";

const Home = () => {
  const Location = useLocation();
  return (
    <>
      <div className="main-page-container">
        <Routes>
          <Route
            path={`/`}
            element={<Navigate replace="/" to={`${Location.pathname}/list`} />}
          ></Route>
          <Route path={"list"} element={<HomeList />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Home;

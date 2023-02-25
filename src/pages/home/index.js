import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DynamicForm from "./components/DynamicForm";
import DynamicFormUpdate from "./components/DynamicFormUpdate";
import HomeList from "./components/HomeList";


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
          <Route path={"add"} element={<DynamicForm />}></Route>
          <Route path={"edit"} element={<DynamicFormUpdate />}></Route>
          <Route path={"list"} element={<HomeList />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Home;

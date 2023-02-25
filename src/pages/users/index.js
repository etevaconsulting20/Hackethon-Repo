import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserList from "./components/listAllUsers";
import UserCreate from "./components/addUser";
import UserDetails from "./components/viewUserDetails";
import MyProfile from "./components/MyProfile";

const Users = () => {
  const Location = useLocation();
  return (
    <>
      <div className="main-page-container">
        <Routes>
          <Route
            path={`/`}
            element={<Navigate replace="/" to={`${Location.pathname}/list`} />}
          ></Route>
          <Route path={"myprofile"} element={<MyProfile />}></Route>
          <Route path={"list"} element={<UserList />}></Route>
          <Route path={"create"} element={<UserCreate />} />
          <Route path={"details/:id"} element={<UserDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default Users;

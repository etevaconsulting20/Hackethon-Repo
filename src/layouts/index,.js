import React, { useRef } from "react";
import Header from "./components/headers";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebars";
import BottomTab from "./components/bottomTabs";
import AppBar from "./components/AppBar";

export const WithSideBar = (props) => {
  const ref = useRef();
  const closeSidebar = () => {
    if (window.screen.width <= 600) {
      if (ref.current.classList.contains("sb-active")) {
        ref.current.classList.remove("sb-active");
      }
    }
  };
  return (
    <>
      <div className="layout-container">
        <SideBar ref={ref}></SideBar>
        <div onClick={closeSidebar} style={{ marginLeft: "-30px" }} className="w-100" id="content">
          <Header />
          {props.children}
        </div>
      </div>
    </>
  );
};

export const WithNavBar = (props) => {
  return (
    <>
      <div className="layout-container-nav-bar">
        <NavBar />
        <div className="w-100" id="content">
          {props.children}
        </div>
      </div>
    </>
  );
};

export const WithBottomTab = (props) => {
  return (
    <>
      <div className="layout-container-bottom-tab">
        <AppBar />

        <div className="w-100" id="content">
          {props.children}
        </div>
        <BottomTab />
      </div>
    </>
  );
};

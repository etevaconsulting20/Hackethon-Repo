/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { Iconbutton } from "@etevacon/base-library.components.iconbutton";
// import { Toggle } from "@etevacon/base-library.components.toggle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useThemeContext } from "src/layouts/theme";
import { useNavigate } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import Iconbutton from "./components/Iconbutton";
import { MaterialUISwitch } from "./components/MaterialUISwitch";
import { signOutAction } from "src/redux/slice/authSlice";
import _ from "lodash";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeObj = useThemeContext();
  const authState = useSelector((state) => state.auth);

  const [isDarkMode, changeMode] = useState(false);
  const [t, I18n] = useTranslation();

  useEffect(() => {
    changeMode(themeObj.theme === "dark");
  }, []);

  useEffect(() => {
    changeMode(themeObj.theme === "dark");
  }, [themeObj]);
  const getThemedTextColor = () => {
    if (themeObj.theme === "light") {
      return "text-dark";
    } else {
      return "text-white";
    }
  };
  const getThemedBgColor = () => {
    if (themeObj.theme === "light") {
      return "bg-light";
    } else {
      return "bg-dark";
    }
  };
  const toggleTheme = () => {
    setTimeout(() => {
      if (themeObj.theme === "light") {
        themeObj.changeTheme("dark");
      } else {
        themeObj.changeTheme("light");
      }
    }, 100);
  };
  const changeLanguage = (e, lnCode) => {
    e.preventDefault();
    I18n.changeLanguage(lnCode);
  };

  const SignOut = () => {
    dispatch(signOutAction());

    // toast.success(
    //   "Sign-out successfully",
    //   "Information",
    //   2000
    // );
    toast.success(t("nofn-msg-for-signout"), "", 2000);
    navigate("/login");
  };
  return (
    <div
      style={{
        // marginLeft: "-30px",
        height: "60px",
        padding: "10px",
        paddingLeft: "50px",
        // boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
        // boxShadow:" 12px 5px 18px #888888"
      }}
      className={`${getThemedBgColor()} d-flex ${getThemedTextColor()} justify-content-end headerLayout`}
    >
      <div className="d-flex flex-row align-items-center p-3 nav-group">
        <div className="dropdown m-x-2">
          <Iconbutton
            icon={<i className={`bi bi-globe`}></i>}
            id="dropdownMenuButtonSetting"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            backgroundColor={"transparent"}
            isDropdownToggle={true}
          />

          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButtonSetting"
          >
            <li>
              <a
                onClick={(e) => changeLanguage(e, "en")}
                className={`dropdown-item ${
                  I18n.language === "en" ? "active" : ""
                }`}
                href="#"
              >
                English
              </a>
            </li>
            <li>
              <a
                onClick={(e) => changeLanguage(e, "fi")}
                className={`dropdown-item ${
                  I18n.language === "fi" ? "active" : ""
                }`}
                href="#"
              >
                Finnish
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="dropdown">
          <Iconbutton
            icon={<i className={`bi bi-gear`}></i>}
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            backgroundColor={"transparent"}
            isDropdownToggle={true}
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li> */}
        <div className="dropdown-item">
          {/* <Toggle
                  label="Dark Mode"
                  id="flexSwitchCheckDefault"
                  value={isDarkMode}
                  checked={isDarkMode}
                  onChange={toggleTheme}
                /> */}
          {/* <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 0 }} className="themeSwitch" />}
            // label={isDarkMode ? "Dark Mode" : "Light Mode"}
            id="flexSwitchCheckDefault"
            value={isDarkMode}
            checked={isDarkMode}
            onChange={toggleTheme}
          /> */}
        </div>
        {/* </li> */}
        {/* <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li> */}
        {/* </ul>
        </div> */}
        <div className="dropdown">
          <a
            href="#"
            className={`d-flex align-items-center ${getThemedTextColor()} text-decoration-none dropdown-toggle mx-2`}
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            {/* <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            /> */}
            <strong>
              {_.get(authState, "userFirebaseInfo.email", "User")}
            </strong>
          </a>
          <ul
            className="dropdown-menu headerLayout__userDropdown"
            aria-labelledby="dropdownUser1"
          >
            {/* <li>
              <a
                className="dropdown-item"
                href="#"
                role={"button"}
                onClick={() => {
                  toggleTheme();
                }}
              >
                Change theme
              </a>
            </li> */}

            {/* <li>
              <a className="dropdown-item" href="#/app/user/myprofile">
                Profile
              </a>
            </li> */}
            <li>
              <a className="dropdown-item" onClick={() => SignOut()}>
                Signout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

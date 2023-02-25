/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */


import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "src/assets/images/brand-logo/upids-pdm-logo.png";
import { useThemeContext } from "src/layouts/theme";
import Menu from "../sidebars/menu";

function Toggle({ label, value, checked, onChange, ...props }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input danger"
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {label}
      </label>
    </div>
  );
}
function Iconbutton({
  id,
  icon,
  backgroundColor,
  color,
  isDropdownToggle,

  ...props
}) {
  const getClassName = () => {
    let clsName = `btn border-0 bg-${backgroundColor}`;
    if (isDropdownToggle) {
      clsName = clsName + " dropdown-toggle";
    }

    if (color) {
      clsName = clsName + ` text-${color}`;
    }
    return clsName;
  };
  return (
    <button
      data-testid="iconButtonTestId"
      className={getClassName()}
      type="button"
      id={id}
      {...props}
    >
      {icon}
    </button>
  );
}

const NavBar = () => {
  const themeObj = useThemeContext();

  const [isDarkMode, changeMode] = useState(false);
  const [t, I18n] = useTranslation();
  const Location = useLocation();
  useEffect(() => {
    changeMode(themeObj.theme === "dark");
  }, []);
  useEffect(() => {
    changeMode(themeObj.theme === "dark");
  }, [themeObj]);
  const toggleTheme = () => {
    setTimeout(() => {
      if (themeObj.theme === "light") {
        themeObj.changeTheme("dark");
      } else {
        themeObj.changeTheme("light");
      }
    }, 100);
  };

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
  const onFirstlayerClick = (e) => {
    const elemennts = document.getElementsByClassName("nested-parent");
    Array.prototype.forEach.call(elemennts, (ele) => {
      ele.classList.remove("active");
    });
  };
  const nestedLinkClicked = (e) => {
    const elemennts = document.getElementsByClassName("nested-parent");
    Array.prototype.forEach.call(elemennts, (ele) => {
      ele.classList.remove("active");
    });
    e.target.parentElement.parentElement.parentElement.children[0].classList.add(
      "active"
    );
  };
  const changeLanguage = (lnCode) => {
    I18n.changeLanguage(lnCode);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-md  ${getThemedBgColor()}`}>
        <div className="container-fluid">
          <a
            href="/"
            className={`d-flex align-items-start mb-md-0 me-md-auto ${getThemedTextColor()} text-decoration-none`}
          >
            <span
              className={`fs-4 px-3 py-1 ${themeObj.theme === "light" ? "bg-transparent" : "bg-white"
                }`}
            >
              <img style={{ height: "50px" }} src={Logo} alt="SmartPipe" />
            </span>
          </a>

          <button
            className={`navbar-toggler ${getThemedTextColor()}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i style={{ fontSize: "26px" }} className="bi bi-list"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex justify-content-between aling-items-center w-100 flex-md-row">
              <ul className="navbar-nav">
                {Menu.map((item, index) => {
                  if (!item.subMenu) {
                    return (
                      <li key={index} className="nav-item">
                        <NavLink
                          to={item.path}
                          className={`nav-link text-start ${getThemedTextColor()} ${item.vissbleOnSmallScrren ? "" : "d-none d-md-block"
                            }`}
                          aria-current="page"
                          onClick={onFirstlayerClick}
                        >
                          {item.icon}
                          {t(item.label)}
                        </NavLink>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} className="nav-item dropdown">
                        <a
                          className={`nav-link nested-parent text-start dropdown-toggle  ${getThemedTextColor()} ${item.vissbleOnSmallScrren ? "" : "d-none d-md-block"
                            }`}
                          to={"#"}
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {item.icon}
                          {t(item.label)}
                        </a>
                        <ul
                          style={{ border: "0px" }}
                          className={`dropdown-menu ${getThemedBgColor()}`}
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          {item.subMenu.map((nestedItem, i) => {
                            return (
                              <li key={`nested-${i}`} className="nav-item">
                                <NavLink
                                  onClick={nestedLinkClicked}
                                  to={nestedItem.path}
                                  className={`nav-link text-start  ${getThemedTextColor()} ${item.vissbleOnSmallScrren
                                      ? ""
                                      : "d-none d-md-block"
                                    }`}
                                  aria-current="page"
                                >
                                  {nestedItem.icon}
                                  {t(nestedItem.label)}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }
                })}
              </ul>
              <div className="d-none d-md-flex me-3 aling-items-center">
                <div className="dropdown dropstart m-x-2">
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
                        onClick={() => changeLanguage("en")}
                        className={`dropdown-item ${I18n.language === "en" ? "active" : ""
                          }`}
                        href="#"
                      >
                        English
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => changeLanguage("fi")}
                        className={`dropdown-item ${I18n.language === "fi" ? "active" : ""
                          }`}
                        href="#"
                      >
                        Finnish
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown dropstart">
                  <Iconbutton
                    icon={<i className={`bi bi-gear`}></i>}
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    backgroundColor={"transparent"}
                    isDropdownToggle={true}
                  />
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <div className="dropdown-item">
                        <Toggle
                          label="Dark Mode"
                          id="flexSwitchCheckDefault"
                          value={isDarkMode}
                          checked={isDarkMode}
                          onChange={toggleTheme}
                        />
                      </div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown dropstart">
                  <a
                    href="#"
                    className={`d-flex align-items-center ${getThemedTextColor()} text-decoration-none dropdown-toggle mx-2`}
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="outside"
                  >
                    <img
                      src="https://github.com/mdo.png"
                      alt=""
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                    />
                    <strong>User</strong>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownUser1">
                    {/* <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        role={"button"}
                        onClick={() => {
                          toggleTheme();
                        }}
                      >
                        change theme
                      </a>
                    </li> */}

                    <li>
                      <a className="dropdown-item" href="#">
                        SignOut
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`d-flex d-md-none  aling-items-end justify-content-end ${getThemedBgColor()}`}
      >
        <div className="dropdown dropstart m-x-2">
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
                onClick={() => changeLanguage("en")}
                className={`dropdown-item ${I18n.language === "en" ? "active" : ""
                  }`}
                href="#"
              >
                English
              </a>
            </li>
            <li>
              <a
                onClick={() => changeLanguage("fi")}
                className={`dropdown-item ${I18n.language === "fi" ? "active" : ""
                  }`}
                href="#"
              >
                Finnish
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropstart">
          <Iconbutton
            icon={<i className={`bi bi-gear`}></i>}
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            backgroundColor={"transparent"}
            isDropdownToggle={true}
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <div className="dropdown-item">
                <Toggle
                  label="Dark Mode"
                  id="flexSwitchCheckDefault"
                  value={isDarkMode}
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
              </div>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropstart">
          <a
            href="#"
            className={`d-flex align-items-center ${getThemedTextColor()} text-decoration-none dropdown-toggle mx-2`}
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>User</strong>
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownUser1">
            {/* <li>
              <a
                className="dropdown-item"
                href="#"
                role={"button"}
                onClick={() => {
                  toggleTheme();
                }}
              >
                change theme
              </a>
            </li> */}

            <li>
              <a className="dropdown-item" href="#">
                SignOut
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;

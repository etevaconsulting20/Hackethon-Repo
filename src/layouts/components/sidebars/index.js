/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
// import logo from "src/assets/images/Eteva_Logo.svg";
import logo from "src/assets/images/brand-logo/logo.png";
import { useThemeContext } from "src/layouts/theme";
import Menu from "./menu";

const SideBar = forwardRef((props, ref) => {
  const themeObj = useThemeContext();
  // eslint-disable-next-line no-unused-vars
  const [t, I18n] = useTranslation();
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
  const onClickMenuItem = () => {
    if (window.screen.width && window.screen.width < 600) {
      toggleSidebar();
    }
  };
  const toggleSidebar = () => {
    if (ref.current.classList.contains("sb-active")) {
      ref.current.classList.remove("sb-active");
    } else {
      ref.current.classList.add("sb-active");
    }
  };
  return (
    <>
      <div className="d-flex align-content-start  h-100 ">
        <nav
          // style={{ boxShadow: "5px 0px 15px #888888" }}
          ref={ref}
          className={`h-100 sidebar ${getThemedTextColor()} ${getThemedBgColor()} p-3 border-right`}
        >
          <a
            href="/"
            className={`d-flex align-items-start mb-md-0 me-md-auto ${getThemedTextColor()} text-decoration-none`}
          >
            <span
              className={`fs-4 px-3 py-1 ${themeObj.theme === "light" ? "bg-transparent" : "bg-white"} sidebarLogo`}
            >
              <img style={{ width: "12rem", objectFit: "contain", height: "3rem" }} src={logo} alt="SmartPipe" />
            </span>
          </a>
          <hr style={{ margin: "8px" }} />
          <ul className="nav nav-pills flex-column mb-auto">
            {Menu.map((item, index) => {
              if (!item.subMenu) {
                return (
                  <li
                    key={item.key}
                    className="nav-item "
                    onClick={onClickMenuItem}
                  >
                    <NavLink
                      to={item.path}
                      className={`nav-link text-start ${getThemedTextColor()} ${item.vissbleOnSmallScrren ? "" : "d-none d-md-block"
                        }`}
                      aria-current="page"
                    >
                      {item.icon}
                      {t(item.label)}
                    </NavLink>
                  </li>
                );
              } else {
                return (
                  <li key={item.key}>
                    <NavLink
                      type="button"
                      to={"#"}
                      className={`nav-link text-start ${getThemedTextColor()} dropdown-navlink dropdown-toggle  ${item.vissbleOnSmallScrren ? "" : "d-none d-md-block"
                        }`}
                      aria-current="page"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapseExample" + item.key}
                      aria-expanded="false"
                      aria-controls={"collapseExample" + item.key}
                    >
                      {item.icon}
                      {t(item.label)}
                    </NavLink>
                    <ul
                      className="c-none-list-style collapse p-x-2"
                      id={"collapseExample" + item.key}
                    >
                      {item.subMenu.map((nestedItem) => {
                        return (
                          <li
                            key={nestedItem.key}
                            className="nav-item "
                            onClick={onClickMenuItem}
                          >
                            <NavLink
                              to={nestedItem.path}
                              className={`nav-link text-start ${getThemedTextColor()} ${nestedItem.vissbleOnSmallScrren
                                  ? ""
                                  : "d-none d-md-block"
                                }`}
                              aria-current="page"
                            >
                              {/* {nestedItem.icon} */}
                              {nestedItem.label}
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
          <hr />
        </nav>
        <div
          style={{
            zIndex: 1,
            fontSize: "30px",

            marginTop: "8px",
          }}
          className={`${getThemedTextColor()}`}
        >
          <i onClick={toggleSidebar} className="bi bi-list"></i>
        </div>
      </div>
    </>
  );
});

export default SideBar;

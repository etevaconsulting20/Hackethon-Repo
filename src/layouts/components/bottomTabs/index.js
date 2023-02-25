import { t, use } from "i18next";
import React, { useEffect } from "react";
import { useThemeContext } from "src/layouts/theme";
import { NavLink, useLocation } from "react-router-dom";
import Menu from 'src/layouts/components/sidebars/menu'
const BottomTab = () => {
  const themeObj = useThemeContext();
  const Location = useLocation();
  useEffect(() => {
  }, [Location]);
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
  //   const markActiveElement = () => {
  //     let items = Array.from(document.getElementsByClassName("cnav-item"));
  //     for (var i = 0; i < items.length; i++) {
  //       if (items[i].classList.contains("active")) {
  //         items[i].parentElement.style.backgroundColor = "red";
  //       }
  //     }
  //   };
  //   markActiveElement();
  return (
    <div
      className={`customBottomTabs ${getThemedTextColor()} ${getThemedBgColor()}  `}
    >
      <nav
        className={`navbar navbar-expand-md custom-bottom-tabs-div  ${getThemedBgColor()}`}
      >
        {Menu.map((item, index) => {
          return (
            <div
              className={
                Location.pathname.includes(item.path)
                  ? "navbar-active-parent"
                  : ""
              }
            >
              <NavLink
                to={item.path}
                className={`nav-link cnav-item text-start ${getThemedTextColor()} ${item.vissbleOnSmallScrren ? "" : "d-none d-md-block"
                  }`}
                aria-current="page"
              >
                {item.icon}
                <span>{t(item.label)}</span>
              </NavLink>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomTab;

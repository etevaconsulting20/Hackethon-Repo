import React, { useState, useRef } from "react";
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu,
    ControlledMenu,
} from "@szhsin/react-menu";
import { FaCaretDown } from "react-icons/fa";
import { MdArrowBack, MdAddCircle, MdMenu } from "react-icons/md";
import "@szhsin/react-menu/dist/index.css";
import PropTypes from "prop-types";

// StMenu.propTypes = {
//     /**
//      * Message that should be shown on Menu Button.
//      */
//     text: PropTypes.string,
//     /**
//      * text to be displayed on menu item's, icon to be displayed on menu items and onClick event for each menu-item
//      */
//     menuArray: PropTypes.string,
// };

StMenu.defaultProps = {
    text: " ",
    menuArray: "-",
};

export function StMenu({ menuArray }) {
    return (
        <div data-testid="myMenu">
            <Menu
                transition
                menuButton={
                    <MenuButton>
                        <FaCaretDown color={"#000000"} size={12} />
                    </MenuButton>
                }
            >
                {menuArray.map((item, i) => {
                    if (!item.submenu) {
                        return <MenuItem key={i}>{item.menuItem()}</MenuItem>;
                    } else {
                        return (
                            <SubMenu key={i} label={item.submenuTitle}>
                                {item.submenu.map((nestedItem, nestedI) => (
                                    <MenuItem key={nestedI}>{nestedItem.menuItem()}</MenuItem>
                                ))}
                            </SubMenu>
                        );
                    }
                })}
            </Menu>
        </div>
    );
}
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



StMenu.defaultProps = {
    text: " ",
    menuArray: "-",
};

export function StMenu(props) {
    const { menuArray } = props
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
import React from "react";

import { IoAddCircleOutline } from "react-icons/io5";

 
export function Badges(props) {
    const { children, remove, add, onClick } = props;

    if (remove) {
        return (
            <span
                className="badge blue-badge stBadges"
            >
                {children}
                <i
                    onClick={onClick}
                    aria-hidden="true"
                    className="delete icon stBadges__icon"
                ></i>
            </span>
        );
    } else if (add) {
        return (
            <span
                className="badge blue-badge stBadesAdd"
                onClick={onClick}
            >
                <IoAddCircleOutline className="stBadesAdd__ioAddCircleOutline" size={13}></IoAddCircleOutline>
                {children}
            </span>
        );
    } else {
        return (
            <span
                className="badge blue-badge stBadges">
                {children}
            </span>
        );
    }
}
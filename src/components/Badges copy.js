import React from "react";
import PropTypes from "prop-types";
import { IoAddCircleOutline } from "react-icons/io5";

// Badges.propTypes = {
//     /** Add an add icon to your badge */
//     add: PropTypes.any,
//     /** Add a remove icon to your badge */
//     remove: PropTypes.any,
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.event,
// };

export function Badges({ children, remove, add, onClick }) {
    if (remove) {
        return (
            <span
                className="badge blue-badge"
                style={{
                    
                    fontSize: ".85714286rem",
                    alignSelf: "center",
                    color: "#00000099"
                }}
            >
                {children}
                <i
                    onClick={onClick}
                    style={{
                        marginLeft: "0.5rem",
                        marginRight: 0,
                        fontSize: ".92857143em",
                        opacity: ".5",
                        cursor: "pointer",
                        transition: "ease",
                        color: "#00000099"
                    }}
                    aria-hidden="true"
                    className="delete icon"
                ></i>
            </span>
        );
    } else if (add) {
        return (
            <span
                className="badge blue-badge"
                onClick={onClick}
                style={{
                    
                    color: "#23333e",
                    fontSize: "12px",
                    fontWeight: "medium",
                    alignSelf: "center",
                    cursor: "pointer",
                }}
            >
                <IoAddCircleOutline
                    style={{
                        marginTop: "0px",
                        marginRight: "0.3125rem",
                        alignSelf: "center",
                        cursor: "pointer",
                    }}
                    size={13}
                ></IoAddCircleOutline>
                {children}
            </span>
        );
    } else {
        return (
            <span
                className="badge blue-badge"
                style={{
                    
                    fontSize: ".85714286rem",
                    alignSelf: "center",
                    color: "#00000099"
                }}
            >
                {children}
            </span>
        );
    }
}
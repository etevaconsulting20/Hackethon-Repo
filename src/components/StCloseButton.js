import React from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

// StCloseButton.propTypes = {
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.event,
//     /**
//      * text property for button text.
//      */
//     text: PropTypes.string,
// };

StCloseButton.defaultProps = {
    onClick: () => {
        alert("This is on click");
    },
};

export function StCloseButton({ onClick, text }) {
    return (
        <div onClick={onClick}>
            <MdClose
                style={{
                    color: "black",
                    marginBottom: "2px",
                    fontSize: 24,
                    cursor: "pointer",
                }}
            ></MdClose>
            <span
                style={{
                    color: " #d1334c",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px",
                    
                    cursor: "pointer",
                }}
            >
                {text}
            </span>
        </div>
    );
}
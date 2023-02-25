import React from "react";
import PropTypes from "prop-types";
import { IoAddCircleOutline } from "react-icons/io5";

// AddButton.propTypes = {
//     /** Give a name to your button */
//     buttontext: PropTypes.string,
//     /**
//      Event or function to be executed onClick
//      */
//     // onClick: PropTypes.event,
// };

AddButton.defaultProps = {
    buttontext: "Button",
    onClick: () => {
        alert("This is on click");
    },
};

export function AddButton({ buttontext, onClick }) {
    return (
        <div onClick={onClick}>
            <IoAddCircleOutline
                style={{
                    marginTop: "0px",
                    marginRight: "0.3125rem",
                    alignSelf: "center",
                    cursor: "pointer",
                    // color: "rgb(150, 165, 175)",
                    color: "rgb(108, 117, 125)",
                }}
                size={13}
            ></IoAddCircleOutline>
            <span>
                <button
                    type="button"
                    style={{
                        padding: 0,
                        background: "none",
                        border: "none",
                        // color: "rgb(150, 165, 175)",
                        color: "rgb(100, 137, 160)",
                        
                        fontSize: "12px",
                        fontWeight: "normal",
                    }}
                >
                    {buttontext}
                </button>
            </span>
        </div>
    );
}
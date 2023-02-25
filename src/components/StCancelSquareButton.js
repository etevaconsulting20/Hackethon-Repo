import React from "react";

import PropTypes from "prop-types";
import "./st-cancel-square-button.css";

// StCancelSquareButton.propTypes = {
//     /**
//      Event/function to take place onClick
//      */
//     onClick: PropTypes.function,
//     /** 
//      Flag to disable cancel button when required fields not filled. true=>button disabled, false=>button enabled
//     */
//     disable: PropTypes.boolean,
//     /**
//      * text property for button text.
//      */
//     text: PropTypes.string,
// };

StCancelSquareButton.defaultProps = {
    onClick: "()=>{ }",
    disable: "false",
};

export function StCancelSquareButton({ disabled, onClick, text }) {
    return (
        <button
            className="btn btn-primary text-uppercase st-cancel-square-button"
            style={{
                width: "180px",
                height: "40px",
                fontSize: "14px",
                
                textAlign: "center",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "none",
                border: "none",
                backgroundColor: "#cf2948",
            }}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
import React from "react";

import PropTypes from "prop-types";

// StSquareButton.propTypes = {
//     /**
//      Text to be displayed on button
//     */
//     text: PropTypes.string,
//     /**
//      Event/function to take place onClick
//      */
//     onClick: PropTypes.function,
//     /** 
//      Flag to disable Confirm button when required fields not filled. true=>button disabled, false=>button enabled
//     */
//     disable: PropTypes.boolean,
//     /**
//      A boolean value indicating if something is loading or not. true-> spinner, false-> iconButton
//      */
//     loading: PropTypes.boolean,
// };

StSquareButton.defaultProps = {
    text: "Button",
    onClick: "()=>{ }",
    disable: "false",
    loading: false,
};
export function StSquareButton({ text, disabled, onClick, loading }) {
    return (
        <button
            className="btn btn-primary text-uppercase"
            style={{
                minWidth: "180px",
                height: "40px",
                fontSize: "14px",
                margin:1,
                textAlign: "center",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "none",
                backgroundColor: "#cf2948",
                border: disabled ? "1px solid #007bff" : "none",
            }}
            loading={loading}
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? (
                <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ width: "2rem", height: "2rem" }}
                >
                    {" "}
                </div>
            ) : (
                text
            )}
        </button>
    );
}
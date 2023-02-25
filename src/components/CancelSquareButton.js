import React from "react";


import "./st-cancel-square-button.css";


CancelSquareButton.defaultProps = {
    onClick: "()=>{ }",
    disable: "false",
};

export function StCancelSquareButton(props) {
    const { disabled, onClick, text } = props
    return (
        <button
            className="btn btn-primary text-uppercase st-cancel-square-button stCancelSquareButton"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
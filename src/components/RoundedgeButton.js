import React from "react";

RoundedgeButton.defaultProps = {
    text: "Confirm",
    onClick: "()=>{ }",
    disable: "false",
    loading: "false",
    width: "150px",
    height: "40px",
    fontSize: "12px",
    
};

export function RoundedgeButton(props) {
   const {
        text,
        loading,
        disabled,
        onClick,
        width,
        height,
        fontSize,
        fontFamily,
    } = props
    if (disabled) {
        return (
            <button
                disabled
                style={{ width, height, fontSize, fontFamily }}
                className="rounded-pill btn btn-primary fw-bold text-uppercase"
            >
                {text}
            </button>
        );
    } else if (loading) {
        return (
            <button
                className="rounded-pill btn btn-primary fw-bold text-uppercase"
                style={{ width, height, fontSize, fontFamily }}
                onClick={onClick}
            >
                <div className="spinner-border spinner-border-sm text-light" role="status">
                    {" "}
                </div>
            </button>
        );
    } else {
        return (
            <button
                className="rounded-pill btn btn-primary fw-bold text-uppercase "
                style={{ width, height, fontSize, fontFamily }}
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
}
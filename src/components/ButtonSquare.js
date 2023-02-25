import React from "react";




ButtonSquare.defaultProps = {
    text: "Button",
    onClick: "()=>{ }",
    disable: "false",
    loading: false,
};
export function ButtonSquare(props) {
    const { text, disabled, onClick, loading } = props
    return (
        <button
            className="btn btn-primary text-uppercase buttonSquare"
            loading={loading}
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? (
                <div
                    className="spinner-border text-light buttonSquare__spinner"
                    role="status">
                    {" "}
                </div>
            ) : (
                text
            )}
        </button>
    );
}
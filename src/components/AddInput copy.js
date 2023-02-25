import React from "react";

import PropTypes from "prop-types";
import "./add-input.css";

// AddInput.propTypes = {
//     /** Give a name to your button */
//     buttonText: PropTypes.string,
//     /** To specify the type of input */
//     type: PropTypes.string,
//     /** Make the input field disabled/readonly */
//     readOnly: PropTypes.bool,
//     /** Give an error message to your dropdown */
//     errorMsg: PropTypes.string,
//     /** Set a placeholder to your input-field */
//     placeholder: PropTypes.string,
// };

AddInput.defaultProps = {
    buttonText: "Button",
    placeholder: "hello from AddInput",
    type: "text",
};

export function AddInput({
    buttonText,
    value,
    onChange,
    onClick,
    type,
    name,
    readOnly,
    errorMsg,
    placeholder,
}) {
    return (
        <>
            <div
                className="input-group mb-3 col-lg-6 col-md-6 col-sm-6 col-xs-12"
                style={{
                    height: "1.75rem",
                    marginLeft: "0.3125rem",
                    marginRight: "0.3125rem",
                }}
            >
                <input
                    data-testid="basic-add-input-element "
                    id="myDiv"
                    className="form-control add-input-form"
                    style={{
                        fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif",
                        boxShadow: "none",
                        border: "1px solid rgba(34,36,38,.15)",
                        background: "#fff",
                        borderColor: "#e0e1e2",
                    }}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                />
                <button
                    className="btn btn-outline-secondary add-input"
                    type="button"
                    onClick={onClick}
                    style={{
                        cursor: "pointer",
                        minHeight: "1em",
                        outline: 0,
                        border: "none",
                        verticalAlign: "baseline",
                        background: "#e0e1e2 none",
                        color: "rgba(0,0,0,.6)",
                        fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif",
                        textTransform: "none",
                        textShadow: "none",
                        fontWeight: "700",
                        lineHeight: "1em",
                        textAlign: "center",
                        boxShadow: "none",
                    }}
                >
                    {buttonText}
                </button>
            </div>
            {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
        </>
    );
}
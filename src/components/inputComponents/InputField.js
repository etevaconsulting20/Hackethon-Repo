import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


// InputField.propTypes = {
//     /** You can set the input to any type */
//     input: PropTypes.oneOf(["text", "username", "password"]),
//     /** Set the placeholder of your Input Field */
//     placeholder: PropTypes.string,
//     /** Specify the type of input */
//     type: PropTypes.string,
//     /** Make the input field disabled/readonly */
//     readOnly: PropTypes.bool,
//     /** Default Font family */
//     fontFamily: PropTypes.string,
//     /** Give an error message to your input-field */
//     errorMsg: PropTypes.string,
// };

InputField.defaultProps = {
    input: "text",
    placeholder: "Basic Input",
    type: "text",
    readOnly: false,
    
};

export function InputField({
    input,
    value,
    onChange,
    type,
    name,
    readOnly,
    placeholder,
    fontFamily,
    errorMsg,
}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [visibility, setVisibility] = useState(true);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
        setVisibility(!visibility);
    };

    if (input === "username") {
        return (
            <div
                className="form-group  col-lg-6 col-md-6 col-sm-6 col-xs-122"
                data-testid="basic-username-element"
            >
                <input
                    input={input}
                    style={{
                        
                        backgroundColor: "#F8FCFD",
                        borderRadius: "7px",
                        border: readOnly ? "none" : "1px solid #c5cfd6",
                        height: "40px",
                        fontSize: "12px",
                        padding: "16px",
                        width: "100%",
                        color: "#253C4B",
                        outline: "none",
                    }}
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    title={`${placeholder} required`}
                    readOnly={readOnly}
                    required
                />
                {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
            </div>
        );
    } else if (input === "password") {
        return (
            <div
                className="form-group  col-lg-6 col-md-6 col-sm-6 col-xs-12"
                data-testid="basic-password-element"
                style={{ position: "relative" }}
            >
                <input
                    input={input}
                    style={{
                        padding: "16px",
                        width: "100%",
                        height: "40px",
                        borderRadius: "7px",
                        border: readOnly ? "none" : "1px solid #c5cfd6",
                        fontFamily,
                        backgroundColor: "#F8FCFD",
                        color: "#253C4B",
                        outline: "none",
                        fontSize: "12px",
                    }}
                    type={passwordShown ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    title={`${placeholder} required`}
                    readOnly={readOnly}
                    required
                />
                <span style={{ position: "absolute", right: "20px", top: "10px", color: "rgb(69, 92, 108)" }}>
                    {visibility ? (
                        <MdVisibility onClick={togglePassword} size={20} />
                    ) : (
                        <MdVisibilityOff onClick={togglePassword} size={20} />
                    )}
                </span>
                {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
            </div>
        );
    } else {
        return (
            <div
                className="form-group  col-lg-6 col-md-6 col-sm-6 col-xs-12"
                data-testid="basic-input-element"
            >
                <input
                    input={input}
                    style={{
                        
                        backgroundColor: "#F8FCFD",
                        borderRadius: "7px",
                        border: readOnly ? "none" : "1px solid #c5cfd6",
                        height: "40px",
                        fontSize: "12px",
                        padding: "16px",
                        width: "100%",
                        color: "#253C4B",
                        outline: "none",
                    }}
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                />
                {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
            </div>
        );
    }
}
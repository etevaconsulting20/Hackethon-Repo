import React from "react";

import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


InputField.defaultProps = {
    input: "text",
    placeholder: "Basic Input",
    type: "text",
    readOnly: false,
    
};

export function InputField(props) {
    const {
        input,
        value,
        onChange,
        type,
        name,
        readOnly,
        placeholder,
        fontFamily,
        errorMsg,
    } = props
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
                    type={type}
                    name={name}
                    className="form-control stInputField__username"
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
                className="form-group  col-lg-6 col-md-6 col-sm-6 col-xs-12 stInputField__password"
                data-testid="basic-password-element"
            >
                <input
                    input={input}
                    className="stInputField__password__input"
                    type={passwordShown ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    title={`${placeholder} required`}
                    readOnly={readOnly}
                    required
                />
                <span>
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
                    type={type}
                    name={name}
                    className="form-control stInputField__basic"
                    style={{border: readOnly ? none: "1px solid #c5cfd6;"}}
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
import React from "react";
import "./add-input.css";

AddInput.defaultProps = {
    buttonText: "Button",
    placeholder: "hello from AddInput",
    type: "text",
};

export function AddInput(props) {
    const {
        buttonText, value, onChange, onClick, type, name, readOnly, errorMsg, placeholder } = props;
    return (
        <> 
            <div
                className="input-group mb-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 stAddButton">
                <input
                    data-testid="basic-add-input-element"
                    id="myDiv"
                    className="form-control add-input-form stAddButton__input"
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                />
                <button
                    className="btn btn-outline-secondary add-input stAddButton__button"
                    type="button"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
            {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
        </>
    );
}

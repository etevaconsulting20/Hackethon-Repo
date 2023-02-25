import React from "react";

import SwitchComponent from "react-switch";

Switch.defaultProps = {
    checked: false,
    onHandleColor: "#cf2948",
    onColor: "#C8D6E0",
    offHandleColor: "#D9D9D9",
    offColor: "#C8D6E0",
    disabled: false
};
export function Switch(props) {
    const {
        checked,
        onChange,
        label,
        onHandleColor,
        onColor,
        offHandleColor,
        offColor,
        disabled,
    } = props
    return (
        <div className="switch">
            <label
                className='switch__label'
                htmlFor='material-switch'
            >
                <SwitchComponent
                    checked={checked}
                    onChange={onChange}
                    onColor={onColor}
                    offColor={offColor}
                    onHandleColor={onHandleColor}
                    offHandleColor={offHandleColor}
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                    activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                    height={15}
                    width={35}
                    className='react-switch'
                    id='material-switch'
                    disabled={disabled}
                />
                {label && (
                    <p>{label}</p>
                )}
            </label>
        </div>
    );
}
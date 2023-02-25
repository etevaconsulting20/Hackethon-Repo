import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const getInputClass = (varaint) => {
    let className = "form-check-input";
    if (varaint) {
        className = className + ` cb-${varaint}`;
    }
    return className;
};

// Checkbox.propTypes = {
//     /**
//      * Label for checkbox
//      */
//     label: PropTypes.string,
//     /**
//      * checked value of checkbox
//      */

//     checked: PropTypes.bool,
//     /**
//      * color varinat for checkbox
//      */
//     colorVaraint: PropTypes.oneOf(["accent", "primary"]),
//     /**
//      * Bool which will decide whether to disable the checkbox
//      */
//     disabled: PropTypes.bool,
//     /**
//      * Callback function when user click on checkbox
//      */
//     onChange: PropTypes.func,
// };

InputCheckbox.defaultProps = {
    checked: false,

    colorVaraint: "primary",
    disabled: false,
};

export function InputCheckbox({
    label,
    checked,
    onChange,
    colorVaraint,
    disabled,
    ...props
}) {
    const ref = useRef();
    useEffect(() => {
        if (checked === undefined) {
            // document.getElementById("flexCheckDefault").indeterminate = true;
            ref.current.indeterminate = true;
        }
    }, []);

    return (
        <div className='form-check'>
            <input
                ref={ref}
                className={getInputClass(colorVaraint)}
                type='checkbox'
                value=''
                checked={checked ? true : false}
                onClick={onChange}
                disabled={disabled}
                {...props}
            />
            <label style={{}} className='form-check-label' htmlFor='flexCheckDefault'>
                {label}
            </label>
        </div>
    );
}
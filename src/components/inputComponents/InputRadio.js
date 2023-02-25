import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const getInputClass = (varaint) => {
    let className = "form-check-input";
    if (varaint) {
        className = className + ` cb-${varaint}`;
    }
    return className;
};

// InputRadio.propTypes = {
//     /**
//      * Lable for InputRadio
//      */
//     label: PropTypes.string,
//     /**
//      * checked value of InputRadio
//      */

//     checked: PropTypes.bool,
//     /**
//      * color varinat for InputRadio
//      */
//     colorVaraint: PropTypes.oneOf(["accent", "primary"]),
//     /**
//      * Bool which will decide whether to disable the InputRadio
//      */
//     disabled: PropTypes.bool,
//     /**
//      * Callback function when user click on InputRadio
//      */
//     onChange: PropTypes.func,
// };
InputRadio.defaultProps = {
    checked: false,

    colorVaraint: "primary",
    disabled: false,
};
export function InputRadio({
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
                type='radio'
                value=''
                checked={checked ? true : false}
                onClick={onChange}
                disabled={disabled}
                {...props}
            />
            <label className='form-check-label' htmlFor='flexRadioDefault1'>
                {label}
            </label>
        </div>
    );
}
import React, { useEffect, useRef, useState } from "react";


const getInputClass = (varaint) => {
    let className = "form-check-input";
    if (varaint) {
        className = className + ` cb-${varaint}`;
    }
    return className;
};

// Radio.propTypes = {
//     /**
//      * Lable for Radio
//      */
//     label: PropTypes.string,
//     /**
//      * checked value of Radio
//      */

//     checked: PropTypes.bool,
//     /**
//      * color varinat for Radio
//      */
//     colorVaraint: PropTypes.oneOf(["accent", "primary"]),
//     /**
//      * Bool which will decide whether to disable the Radio
//      */
//     disabled: PropTypes.bool,
//     /**
//      * Callback function when user click on Radio
//      */
//     onChange: PropTypes.func,
// };
Radio.defaultProps = {
    checked: false,

    colorVaraint: "primary",
    disabled: false,
};
export function Radio({
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
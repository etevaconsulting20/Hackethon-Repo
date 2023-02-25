import React, { useEffect, useRef, useState } from "react";


const getInputClass = (varaint) => {
    let className = "form-check-input";
    if (varaint) {
        className = className + ` cb-${varaint}`;
    }
    return className;
}; 


Checkbox.defaultProps = {
    checked: false,

    colorVaraint: "primary",
    disabled: false,
};

export function Checkbox({
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
import React from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import CustomTooltip from "./CustomTooltip";


export function InputColorWithLabel(props) {
    const {
        type, label, placeholder, name, value, isSmallScreen,
        readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
        showTranslation, aiEnable, aiIconHoverText,
        touched, isAllTouched, onBlur,
    } = props







    return (
        <>
            <div className={`form-group inputColorWithLabel inputColorWithLabel ${isSmallScreen ? "col-lg-12 col-md-12 col-sm-12 col-xs-6" : "col-lg-6 col-md-6 col-sm-6 col-xs-6"} ${className ? className : ""}`}>
                <div className="col inputColorWithLabel__label">
                    <label >
                        {label}
                    </label>
                    {showTranslation && <MdTextFields />}
                    {
                        label && tooltipText &&
                        <CustomTooltip
                            tooltipContent={<p>{tooltipText}</p>}
                        />
                    }

                </div>

                <div>
                    <div className="inputColorWithLabel__inputwrapper">
                        <input
                            readOnly={readOnly ? readOnly : false}
                            value={value ? value : ""}
                            onChange={onChange}
                            // onBlur={onBlur}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            className="inputColorWithLabel__inputwrapper__input"
                        />
                    </div>
                    <div className="text-danger">
                        {(isAllTouched || touched) && errorMsg}
                    </div>
                </div>
            </div>
        </>
    );
}
import React from 'react';
import SwitchComponent from "react-switch";
import CustomTooltip from './CustomTooltip';
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";






export const InputSwitchWithLable = (props) => {
    const {
        type, label, name, value, checked,
        readOnly, disabled, showToolTip, tooltipText, error, touched, isAllTouched, onChange, className, 
        onColor, offColor, onHandleColor, offHandleColor
    } = props


    let checkedValue 
    if (value !== undefined) {
        checkedValue = value
    }
    else {
        checkedValue = checked
    }

    return (
        <div className={`form-group inputSwitchWithLabel col-lg-6 col-md-6 col-sm-6 col-xs-6 ${className ? className : ""}`}>
            <div className="col inputSwitchWithLabel__label">
                <label >
                    {label}
                </label>
                {
                    tooltipText &&
                    <CustomTooltip
                        tooltipContent={<p>{tooltipText}</p>}
                    />
                }

            </div>

            <div>
                <div className="inputSwitchWithLabel__inputwrapper">
                    <SwitchComponent
                        checked={checkedValue}
                        onChange={value => { onChange({ target: { name: name, value: value } }) }}
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
                        disabled={readOnly || disabled}
                    />
                </div>
                <div className="text-danger">
                    {(isAllTouched || touched) && error}
                </div>
            </div>
        </div>
    )
}


InputSwitchWithLable.defaultProps = {
    onHandleColor: '#32cd32',
    offHandleColor: '#ffffff',
    onColor: '#32cd32',
    offColor: '#6c757d',
};
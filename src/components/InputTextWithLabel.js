import React, { useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import aiIcon from 'src/assets/svg/artificial-intelligence-robot.svg'
import CustomTooltip from "./CustomTooltip";


export function InputTextWithLabel(props) {
    const {
        type, label, placeholder, name, value,
        readOnly, showToolTip, tooltipText, error, touched, isAllTouched, onChange, onBlur, className,
        showTranslation, isShowAiDataIcon, onClickAiDataIcon, aiIconHoverText, } = props


    return (
        <div className={`form-group inputTextWithLabel col-lg-6 col-md-6 col-sm-6 col-xs-6 ${className ? className : ""}`}>
            <div className="col inputTextWithLabel__label">
                <label >
                    {label}
                </label>
                {showTranslation && <MdTextFields />}
                {
                    tooltipText &&
                    <CustomTooltip
                        trigger={
                            <IoIosHelpCircleOutline
                                className="inputTextWithLabel__tooltipIcon"
                                fontWeight={"bold"}
                            />
                        }
                        tooltipContent={<p>{"this is tooltip text"}</p>}
                    />
                }

            </div>

            <div>
                <div className="inputTextWithLabel__inputwrapper">
                    <input
                        readOnly={readOnly ? readOnly : false}
                        value={value ? value : ""}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="inputTextWithLabel__inputwrapper__input"
                    />
                    {
                        isShowAiDataIcon &&
                        <>
                            {/* <Popup
                                pinned
                                wide="very"
                                position="top center"
                                on="hover"
                                trigger={
                                    <img
                                        src={aiIcon}
                                        className="inputTextWithLabel__inputwrapper__aiIcon"
                                        onClick={onClickAiDataIcon}
                                    />
                                }
                            >
                                {aiIconHoverText}
                            </Popup> */}
                        </>
                    }
                </div>
                <div className="text-danger">
                    {(isAllTouched || touched) && error}
                </div>
            </div>
        </div>
    );
}

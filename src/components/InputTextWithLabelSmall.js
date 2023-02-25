import React, { useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import aiIcon from 'src/assets/svg/artificial-intelligence-robot.svg'
import CustomTooltip from "./CustomTooltip";


export function InputTextWithLabelSmall(props) {
    const {
        type, label, placeholder, name, value,
        readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
        showTranslation, isShowAiDataIcon, onClickAiDataIcon, aiIconHoverText, } = props

    return (
        <div className={`form-group inputTextWithLabelSmall col-lg-12 col-md-12 col-sm-12 col-xs-6 ${className ? className : ""}`}>
            <div className="col inputTextWithLabelSmall__label">
                <label >
                    {label}
                </label>
                {showTranslation && <MdTextFields />}
                {
                    tooltipText &&
                    <CustomTooltip
                        trigger={
                            <IoIosHelpCircleOutline
                                className="inputTextWithLabelSmall__tooltipIcon"
                                fontWeight={"bold"}
                            />
                        }
                        tooltipContent={<p>{"this is tooltip text"}</p>}
                    />
                }

            </div>

            <div>
                <div className="inputTextWithLabelSmall__inputwrapper">
                    <input
                        readOnly={readOnly ? readOnly : false}
                        value={value ? value : ""}
                        onChange={onChange}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className="inputTextWithLabelSmall__inputwrapper__input"
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
                                        className="inputTextWithLabelSmall__inputwrapper__aiIcon"
                                        onClick={onClickAiDataIcon}
                                    />
                                }
                            >
                                {aiIconHoverText}
                            </Popup> */}
                        </>
                    }
                </div>
                {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
            </div>
        </div>
    );
}
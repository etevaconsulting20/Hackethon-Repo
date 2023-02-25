import React from "react";

import { IoIosHelpCircleOutline } from "react-icons/io";
import { Popup } from "semantic-ui-react";

import aiIcon from 'src/assets/svg/artificial-intelligence-robot.svg'


function TextInputWithLabel(props) {
    const {
        title,
        value,
        onChange,
        type,
        name,
        readOnly,
        placeholder,
        tooltipText,
        errorMsg,
        showTooltip,
        isShowAiDataIcon,
        onClickAiDataIcon,
        aiIconHoverText,
    } = props


    return (
        <div className="form-group textInputWithLabel col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div
                className="col textInputWithLabel__section"
            >
                <label>
                    {title}
                </label>
                {showTooltip && (
                    <Popup
                        pinned
                        wide="very"
                        position="top center"
                        on={"click"}
                        trigger={
                            <IoIosHelpCircleOutline
                            className="textInputWithLabel__section__popup"
                                fontWeight={"bold"}
                            />
                        }
                    >
                        <p>{tooltipText}</p>
                    </Popup>
                )}
            </div>

            <div>
                <div className="textInputWithLabel__inputwrapper">
                    <input
                        readOnly={readOnly}
                        value={value}
                        onChange={onChange}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className="textInputWithLabel__inputwrapper__input"
                        style={{
                            border: readOnly ? "none" : "1px solid #c5cfd6",
                        }}
                    />
                    {
                        isShowAiDataIcon &&
                        <>
                            <Popup
                                pinned
                                wide="very"
                                position="top center"
                                on="hover"
                                trigger={
                                    <img
                                        src={aiIcon}
                                        className="textInputWithLabel__inputwrapper__aiIcon"
                                        onClick={onClickAiDataIcon}
                                    />
                                }
                            >
                                {aiIconHoverText}
                            </Popup>
                        </>
                    }
                </div>
                {errorMsg ? <div className="text-danger">{errorMsg}</div> : <></>}
            </div>
        </div>
    );
}
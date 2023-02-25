import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import CustomTooltip from "./CustomTooltip";
import { Badges } from "src/components/Badges";



export function InputTextMultiAddWithLabel(props) {
    const {
        type, label, placeholder, name, value, isSmallScreen,
        readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
        showTranslation, aiEnable, aiIconHoverText,
        touched, isAllTouched, onBlur,
    } = props

    const { t } = useTranslation('common');

    const [inputValue, setInputValue] = useState("")



    const handleRemoveItem = (item) => {
        const newValue = value.filter((element) => element !== item)
        onChange({
            target: {
                name: name,
                value: newValue,
            }
        })
    }

    const handleAddItem = () => {
        if (inputValue.trim()) {
            const newValue = value ? [...value] : []
            newValue.push(inputValue)
            onChange({
                target: {
                    name: name,
                    value: newValue,
                }
            })
            setInputValue("")
        }
    }

    return (
        <>
            <div className={`form-group inputTextMultiAddWithLabel col-lg-12 col-md-12 col-sm-12 col-xs-6 ${className ? className : ""}`}>
                <div className="col inputTextMultiAddWithLabel__label">
                    <label >
                        {label}
                    </label>
                    {showTranslation && <MdTextFields />}
                    {tooltipText &&
                        <CustomTooltip
                            tooltipContent={<p>{tooltipText}</p>}
                        />
                    }
                </div>

                <div className="inputTextMultiAddWithLabel__value">
                    {value && value[0] ?
                        value.map((item, index) => (
                            <React.Fragment key={index}>
                                {readOnly ? (
                                    <Badges key={index}>
                                        {item}
                                    </Badges>
                                ) : (
                                    <Badges key={index} remove onClick={() => handleRemoveItem(item)}>
                                        {item}
                                    </Badges>
                                )}
                            </React.Fragment>
                        ))
                        :
                        <>
                            <span className="passive-message">{t("No data found")}</span>
                        </>

                    }
                </div>

                <div>
                    {!readOnly &&
                        <div className="inputTextMultiAddWithLabel__inputwrapper mb-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                                data-testid="basic-add-input-element "
                                id="myDiv"
                                className="inputTextMultiAddWithLabel__inputwrapper__input"
                                readOnly={readOnly}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                name={"textMultiAdd"}
                                type={type}
                                placeholder={placeholder}
                            />
                            <button
                                className="inputTextMultiAddWithLabel__inputwrapper__button"
                                type="button"
                                onClick={handleAddItem}
                            >
                                {t("Add")}
                            </button>
                        </div>
                    }
                    <div className="text-danger">
                        {(isAllTouched || touched) && errorMsg}
                    </div>
                </div>
            </div>
        </>
    );
}
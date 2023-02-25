import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

// InputMultiSelectDropdown.propTypes = {
//     /** Set a placeholder to your input-field */
//     placeholder: PropTypes.string,
//     /** Give options in your dropdown */
//     options: PropTypes.array,
//     /** Bool which will disable your dropdown */
//     disabled: PropTypes.bool,
//     /** Specify the type of input */
//     type: PropTypes.string,
// };

InputMultiSelectDropdown.defaultProps = {
    placeholder: "Hello",
    disabled: false,
    type: "text",
    onBlur: () => { },
    onChange: () => { },
};

export function InputMultiSelectDropdown(props) {
    const {
        value, type, name, disabled, readOnly,
        onChange, onBlur,
        placeholder, options, isMultilingual, formLanguage, search,
    } = props;

    const { i18n } = useTranslation();
    let selectedFormLanguage = (isMultilingual && formLanguage) ? formLanguage : i18n.language



    const getStandardEvent = (eventType, selectData) => {
        const valueObject = options.find(item => item.value === selectData.value)
        const event = {
            type: eventType,
            target: {
                ...selectData,
                name: selectData.name,
                value: selectData.value,
                valueObject: valueObject,
            }
        }
        return event
    }

    const handleInputChange = (e, selectData) => {
        if (options?.length) {
            const event = getStandardEvent("change", selectData)
            onChange(event)
        }
    }

    const handleInputBlur = (e, selectData) => {
        if (options?.length) {
            const event = getStandardEvent("blur", selectData)
            onBlur(event)
        }
    }


    const optionsSementic = options && options[0] && options.map((item, index) => {
        if (typeof item.label === 'object' && !Array.isArray(item.label) && item.label !== null) {
            const optionObject = {
                key: `${item.value}_${index}`,
                text: item.label[selectedFormLanguage] ? item.label[selectedFormLanguage] : item.label.en,
                value: item.value,
            }
            if (item.content) {
                optionObject.content = item.content[selectedFormLanguage] ? item.content[selectedFormLanguage] : item.content.en
            }
            return optionObject
        }
        else if (item.label) {
            const optionObject = {
                key: `${item.value}_${index}`,
                text: item.label,
                value: item.value,
            }
            if (item.content) {
                optionObject.content = item.content
            }
            return optionObject
        }
        else if (item.text) {
            const optionObject = {
                key: `${item.value}_${index}`,
                text: item.text,
                value: item.value,
            }
            if (item.content) {
                optionObject.content = item.content
            }
            return optionObject
        }
    })



    return (
        <div
            style={{
                margin: "15px",
                fontSize: "14px",
                lineHeight: "1em",
                whiteSpace: "normal",
                outline: 0,
                minHeight: "2.71428571em",
                boxShadow: "none",

            }}
        >
            <Dropdown
                data-testid="basic-mutiselect-dropdown-element"
                className=" col-lg-12 col-md-12 col-sm-12 col-xs-12"
                placeholder={placeholder}
                disabled={readOnly || disabled}
                value={value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                name={name}
                type={type}
                fluid
                search={search}
                selection
                multiple
                options={optionsSementic}
            />
        </div>
    );
}
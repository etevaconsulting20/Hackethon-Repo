import React from "react";
import _ from 'lodash';
import { useTranslation } from "react-i18next";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Dropdown, Popup } from "semantic-ui-react";
import CustomTooltip from "./CustomTooltip";


InputSelectDropdown.defaultProps = {
  // title: "Hello",
  // placeholder: "Hello",
  // readOnly: false,
  // showTooltip: false,
  // tooltipText: "Hello from tooltip",
  // type: "text",
  // multiple: false,
  // loading: false,
  className: "",
  onBlur: () => { },
  onChange: () => { },
};

export function InputSelectDropdown(props) {
  const {

    type, label, placeholder, name, value, options, isMultilingual, formLanguage,
    title, onChange, onBlur, readOnly, disabled, tooltipText,
    search, selection, errorMessage, touched, isAllTouched, showTooltip, multiple, loading, className, isSmallScreen
  } = props;

  const { i18n } = useTranslation();
  let selectedFormLanguage = (isMultilingual && formLanguage) ? formLanguage : i18n.language

  const getStandardEvent = (e, selectData, eventType,) => {
    const valueObject = options.find(item => item.value === selectData.value)
    const event = {
      type: eventType,
      target: {
        ...selectData,
        name: selectData.name,
        value: selectData.value,
        textContent: e.target.textContent,
        valueObject: valueObject,
      }
    }
    return event
  }

  const handleInputChange = (e, selectData) => {
    const event = getStandardEvent(e, selectData, "change")
    onChange(event)
  }

  const handleInputBlur = (e, selectData) => {
    const event = getStandardEvent(e, selectData, "blur")
    onBlur(event)
  }

  const optionsSementic = options && options[0] && options.map((item, index) => {
    const optionObject = {
      key: `${item.value}_${index}`,
      value: item.value,
    }

    if (typeof item.label === 'object' && !Array.isArray(item.label) && item.label !== null) {
      optionObject.text = item.label[selectedFormLanguage] ? item.label[selectedFormLanguage] : item.label.en
    }
    else if (item.label) {
      optionObject.text = item.label
    }
    else if (item.text) {
      optionObject.text = item.text
    }

    if (item.disabled) {
      optionObject.disabled = item.disabled
    }

    return optionObject
  })

  return (
    <div className={`form-group inputSelectDropdown ${isSmallScreen ? "col-lg-12 col-md-12 col-sm-12 col-xs-6" : "col-lg-6 col-md-6 col-sm-6 col-xs-12"} ${className}`} >
      <div className="col inputSelectDropdown__label">
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

      <div className="inputSelectDropdown__inputwrapper">
        <Dropdown
          className="inputSelectDropdown__inputwrapper__input"
          placeholder={placeholder}
          disabled={readOnly || disabled}
          name={name}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          fluid
          search
          // selection
          options={optionsSementic}
          loading={loading}
        />
        <div className="text-danger">
          {(isAllTouched || touched) && errorMessage}
        </div>
      </div>
    </div>
  );
}

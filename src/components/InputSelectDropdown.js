import React from "react";
import _ from 'lodash';
import { useTranslation } from "react-i18next";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Dropdown, Popup } from "semantic-ui-react";
import CustomTooltip from "./CustomTooltip";


InputSelectDropdown.defaultProps = {
  // title: "Hello",
  // placeholder: "Hello",
  // disabled: false,
  // showTooltip: false,
  // tooltipText: "Hello from tooltip",
  // type: "text",
  // multiple: false,
  // loading: false,
  className: ""
};

export function InputSelectDropdown(props) {
  const {

    type, label, placeholder, name, value, selectDropdownOptions,
    title, onChange, onBlur, disabled, tooltipText,
    search, selection, error, touched, isAllTouched, showTooltip, multiple, loading, className,
  } = props;

  const { i18n } = useTranslation();

  const getStandardEvent = (eventType, selectData) => {
    const valueObject = selectDropdownOptions.find(item => item.value === selectData.value)
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
    const event = getStandardEvent("change", selectData)
    onChange(event)
  }

  const handleInputBlur = (e, selectData) => {
    const event = getStandardEvent("blur", selectData)
    onBlur(event)
  }

  const selectDropdownOptionsSementic = selectDropdownOptions && selectDropdownOptions[0] && selectDropdownOptions.map((item, index) => {
    if (typeof item.label === 'object' && !Array.isArray(item.label) && item.label !== null) {
      const optionObject = {
        key: `${item.value}_${index}`,
        text: item.label[i18n.language] ? item.label[i18n.language] : item.label.en,
        value: item.value,
      }
      return optionObject
    }
    else {
      const optionObject = {
        key: `${item.value}_${index}`,
        text: item.label,
        value: item.value,
      }
      return optionObject
    }
  })



  return (
    <div className={`form-group inputSelectDropdown col-lg-6 col-md-6 col-sm-6 col-xs-12 ${className}`} >
      <div className="col inputSelectDropdown__label">
        <label >
          {label}
        </label>
        {
          tooltipText &&
          <CustomTooltip
            trigger={
              <IoIosHelpCircleOutline
                className="inputSelectDropdown__tooltipIcon"
                fontWeight={"bold"}
              />
            }
            tooltipContent={<p>{"this is tooltip text"}</p>}
          />
        }
      </div>

      <div className="inputSelectDropdown__inputwrapper">
        <Dropdown
          className="inputSelectDropdown__inputwrapper__input"
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          fluid
          search
          selection
          options={selectDropdownOptionsSementic}
        />
        <div className="text-danger">
          {(isAllTouched || touched) && error}
        </div>
      </div>
    </div>
  );
}

import React from "react";

import { Dropdown } from "semantic-ui-react";


// MultiselectDropdownInputField.propTypes = {
//     /** Set a placeholder to your input-field */
//     placeholder: PropTypes.string,
//     /** Give options in your dropdown */
//     dropdownOptions: PropTypes.array,
//     /** Bool which will disable your dropdown */
//     disabled: PropTypes.bool,
//     /** Specify the type of input */
//     type: PropTypes.string,
// };

MultiselectDropdownInputField.defaultProps = {
  placeholder: "Hello",
  disabled: false,
  type: "text",
};

export function MultiselectDropdownInputField(props) {
  const {
    value,
    onChange,
    type,
    name,
    disabled,
    placeholder,
    dropdownOptions,
    search,
  } = props;
  return (
    <div 
    className = "stMultiSelectDropdownInputField">
      <Dropdown
        data-testid="basic-mutiselect-dropdown-element"
        className=" col-lg-12 col-md-12 col-sm-12 col-xs-12"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        fluid
        search={search}
        selection
        multiple
        options={dropdownOptions}
      />
    </div>
  );
}

import React from "react";



function Iconbutton({
    id,
    icon,
    backgroundColor,
    color,
    isDropdownToggle,
  
    ...props
  }) {
    const getClassName = () => {
      let clsName = `btn border-0 bg-${backgroundColor}`;
      if (isDropdownToggle) {
        clsName = clsName + " dropdown-toggle";
      }
  
      if (color) {
        clsName = clsName + ` text-${color}`;
      }
      return clsName;
    };
    return (
      <button
        data-testid="iconButtonTestId"
        className={getClassName()}
        type="button"
        id={id}
        {...props}
      >
        {icon}
      </button>
    );
}
  
export default Iconbutton
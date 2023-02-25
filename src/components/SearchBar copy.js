import React, { useState } from "react";
import PropTypes from "prop-types";


// SearchBar.propTypes = {
//     /***
//      Event/function to take place onChange
//      */
//     onChange: PropTypes.function,
//     /*
//      Event/function to take place once key released
//      */
//     onKeyUp: PropTypes.function,
//     /**
//      Disabled Text to be displayed in search box
//      */
//     placeholder: PropTypes.string,
//     /**
//     Value to be searched
//    */
//     value: PropTypes.string,
//     /**
//      * Widtht of search-bar
//      */
//     width: PropTypes.string,
// };
SearchBar.defaultProps = {
    onKeyUp: () => { },
    onChange: () => { },
    placeholder: "Enter text to be searched",
    value: "abc",
};

export function SearchBar({ onKeyUp, placeholder, onChange, value, width }) {
    return (
        <div data-testid="mysearchbar">
            <input
                className="homepage-search-input col-lg-12 col-md-12 col-sm-12 col-xs-12"
                onChange={onChange}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                value={value}
                style={{
                    width: width ? width : "auto",
                    marginLeft: "15px",
                    height: "48px",
                    outline: "none",
                    border: "0px",
                    backgroundColor: "#ffffff",
                    alignSelf: "$align-self",
                    borderRadius: "12px",
                    paddingRight: "24px",
                    paddingLeft: "24px",
                    fontSize: "16px",
                }}
            />
        </div>
    );
}
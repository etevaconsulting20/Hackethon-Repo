import React from "react";
import PropTypes from "prop-types";


// Header.propTypes = {
//     /**
//      Text to be displayed in header
//      */
//     text: PropTypes.string,
//     /**
//      * Default fontFamily of header
//      */
//     fontFamily: PropTypes.string
// };
Header.defaultProps = {
    text: " Display",
};

export function Header({ text, fontFamily }) {
    return (
        <span className="h4" style={{ fontFamily }}>{text}</span>
    );
}
import React from "react";
import PropTypes from "prop-types";


// TextWithLink.propTypes = {
//     /**
//      * Provide with an onClick function to your text
//      */
//     onClick: PropTypes.func,
//     /**
//      * Give a name to your link
//      */
//     text: PropTypes.string,
//     /**
//      * Set a color to your text on the link
//      */
//     color: PropTypes.oneOf([
//         "primary",
//         "secondary",
//         "warning",
//         "success",
//         "info",
//         "danger",
//         "light",
//         "dark",
//         "muted",
//         "white",
//     ]),
//     /**
//      * Default fontFamily of the text
//      */
//     fontFamily: PropTypes.string,
// };

TextWithLink.defaultProps = {
    text: "A Link",
    color: "muted",
    
};

export function TextWithLink({ text, onClick, color, fontFamily }) {
    return (
        <p className={`text-${color}`} style={{ fontFamily }} onClick={onClick}>
            {text}
        </p>
    );
}
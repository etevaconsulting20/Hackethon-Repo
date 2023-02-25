import React from "react";
import PropTypes from "prop-types";

const getClassName = (color) => {
    let mainColor = color ? color : "primary";
    let className = `spinner-border text-${color}`;
    return className;
};

// Loader.propTypes = {
//     /**
//      * Message that should be shown below loader.
//      */
//     message: PropTypes.string,
//     /**
//      * Color of loader spinner
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
//     ]),
// };

Loader.defaultProps = {
    color: "primary",
};

export function Loader({ message, color }) {
    return (
        <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <div className={`spinner-border text-${color}`} role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
            {message && <span className='text-primary'>{message}</span>}
        </div>
    );
}
import React from "react";
import PropTypes from "prop-types";


// RoundedgeButton.propTypes = {
//     /**
//      Event/function to take place onClick
//      */
//     onClick: PropTypes.function,
//     /** 
//      Flag to disable Confirm button when required fields not filled. true=>button disabled, false=>button enabled
//     */
//     disable: PropTypes.boolean,
//     /**
//      Text to be displayed on button
//     */
//     text: PropTypes.string,
//     /**
//     Flag to turn button text into spinner indicating submit process. true=>spinner inside button , false=>button text
//    */
//     loading: PropTypes.boolean,
//     /** Default width of button */
//     width: PropTypes.string,
//     /** Default height of button */
//     height: PropTypes.string,
//     /** Default fontSize of button */
//     fontSize: PropTypes.string,
//     /** Default fontFamily of button */
//     fontFamily: PropTypes.string
// };
RoundedgeButton.defaultProps = {
    text: "Confirm",
    onClick: "()=>{ }",
    disable: "false",
    loading: "false",
    width: "150px",
    height: "40px",
    fontSize: "12px",
    
};

export function RoundedgeButton({
    text,
    loading,
    disabled,
    onClick,
    width,
    height,
    fontSize,
    fontFamily,
}) {
    if (disabled) {
        return (
            <button
                disabled
                style={{ width, height, fontSize, fontFamily }}
                className="rounded-pill btn btn-primary fw-bold text-uppercase"
            >
                {text}
            </button>
        );
    } else if (loading) {
        return (
            <button
                className="rounded-pill btn btn-primary fw-bold text-uppercase"
                style={{ width, height, fontSize, fontFamily }}
                onClick={onClick}
            >
                <div className="spinner-border spinner-border-sm text-light" role="status">
                    {" "}
                </div>
            </button>
        );
    } else {
        return (
            <button
                className="rounded-pill btn btn-primary fw-bold text-uppercase "
                style={{ width, height, fontSize, fontFamily }}
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
}
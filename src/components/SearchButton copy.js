import React from "react";
import PropTypes from "prop-types";


// SearchButton.propTypes = {
//     /**
//      Event/function to take place onClick
//      */
//     onClick: PropTypes.function,
//     /**
//      Flag to disable search button when nothing typed. true=>button disabled, false=>button enabled
//      */
//     disableflag: PropTypes.boolean,
//     /**
//      Text to be displayed on button
//      */
//     text: PropTypes.string,
//     /**
//     Flag to turn button text into spinner indicating search process. true=>spinner inside button , false=>button text
//    */
//     loading: PropTypes.boolean,
//     /**
//     Default height of Button
//    */
//     height: PropTypes.string,
//     /**
//      * Default width of Button
//      */
//     width: PropTypes.string,
//     /**
//      * Default borderRadius of Button */
//     borderRadius: PropTypes.string,
//     /**
//      * Default alignSelf of Button */
//     alignSelf: PropTypes.string,
//     /**
//      * Default fontSize of Button */
//     fontSize: PropTypes.string,
//     /**
//      * Default marginLeft of Button */
//     marginLeft: PropTypes.string,
//     /**
//      * Default fontFamily of Button */
//     fontFamily: PropTypes.string,
//     /**
//      * Default fontWeight of Button */
//     fontWeight: PropTypes.string
// };
SearchButton.defaultProps = {
    text: "Search",
    onClick: "primary",
    disableflag: "false",
    loading: "false",
    height: "48px",
    borderRadius: "12px",
    alignSelf: "$align-self",
    fontSize: "14px",
    marginLeft: "11px",
    fontWeight: "normal",
};

export function SearchButton({
    onClick,
    disableflag,
    text,
    loading,
    height,
    width,
    borderRadius,
    alignSelf,
    fontSize,
    marginLeft,
    fontFamily,
    fontWeight,
}) {
    if (disableflag) {
        return (
            <button
                onClick={onClick}
                disabled
                className={"btn-secondary button"}
                style={{
                    height,
                    width: width ? width : "auto",
                    borderRadius,
                    alignSelf,
                    fontSize,
                    marginLeft,
                    fontFamily,
                    fontWeight,
                }}
            >
                {text}
            </button>
        );
    } else {
        if (loading) {
            return (
                <button
                    onClick={onClick}
                    className={"btn-dark button"}
                    style={{
                        // opacity: "1 !important",
                        height,
                        width: width ? width : "auto",
                        borderRadius,
                        alignSelf,
                        fontSize,
                        marginLeft,
                        fontFamily,
                        fontWeight,
                    }}
                >
                    <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                    >
                        {" "}
                    </div>
                </button>
            );
        } else {
            return (
                <button
                    onClick={onClick}
                    className={"btn-dark button"}
                    style={{
                        // opacity: "1 !important",
                        height,
                        width: width ? width : "auto",
                        borderRadius,
                        alignSelf,
                        fontSize,
                        marginLeft,
                        fontFamily,
                        fontWeight,
                    }}
                >
                    {text}
                </button>
            );
        }
    }
}
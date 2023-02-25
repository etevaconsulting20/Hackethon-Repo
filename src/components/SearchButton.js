import React from "react";



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

export function SearchButton(props) {
    const {
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
    } = props
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
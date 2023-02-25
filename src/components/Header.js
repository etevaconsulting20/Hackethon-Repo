import React from "react";

Header.defaultProps = {
    text: " Display",
};

export function Header(props) {
    const { text, fontFamily } = props
    return (
        <span className="h4">{text}</span>
    );
}
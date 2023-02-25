import React from "react";

export function TextWithLink(props) {
    const { text, onClick, color, fontFamily } = props
    return (
        <p className={`text-${color}`} style={{ fontFamily }} onClick={onClick}>
            {text}
        </p>
    );
}
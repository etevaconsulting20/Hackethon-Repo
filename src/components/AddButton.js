import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

AddButton.defaultProps = {
    buttontext: "Button",
    onClick: () => {
        alert("This is on click");
    },
};

export function AddButton(props) {
    const { buttontext, onClick } = props;
    return (
        <div className="stAddbutton" onClick={onClick}>
            <IoAddCircleOutline className="stAddbutton__icon" size={13} />
            <span>
                <button type="button" className="stAddbutton__button">
                    {buttontext}
                </button>
            </span>
        </div>
    );
}

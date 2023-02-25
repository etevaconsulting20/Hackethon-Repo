import React from "react";

import "./st-search-box.css";


StSearchBox.defaultProps = {
    iconName: "Search",
};

export function StSearchBox(props) {
    const {
        iconName,
        value,
        onChange,
        name,
        placeholder,
        onClick,
        width,
    } = props
    return (
        <div className="stSearchBox" >
            <input
                className="searchbox col-lg-12 col-md-12 col-sm-12 col-xs-12 stSearchBox__input"
                data-testid="basic-search-box-element"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            ></input>

            {iconName === "Search" ? (
                <i
                    style={{
                        
                    }}
                    aria-hidden="true"
                    className="search icon stSearchBox__searchIcon"
                ></i>
            ) : (
                <i
                    onClick={onClick}
                    aria-hidden="true"
                    className="close link icon stSearchBox__linkIcon"
                ></i>
            )}
        </div>
    );
}
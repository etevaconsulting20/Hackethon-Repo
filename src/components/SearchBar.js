import React, { useState } from "react";


SearchBar.defaultProps = {
    onKeyUp: () => { },
    onChange: () => { },
    placeholder: "Enter text to be searched",
    value: "abc",
};

export function SearchBar(props) {
    const { onKeyUp, placeholder, onChange, value, width } = props
    return (
        <div data-testid="mysearchbar">
            <input
                className="homepage-search-input col-lg-12 col-md-12 col-sm-12 col-xs-12 stSearchBar"
                onChange={onChange}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                value={value}/>
        </div>
    );
}
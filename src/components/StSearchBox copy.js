import React from "react";
import PropTypes from "prop-types";
import "./st-search-box.css";


// StSearchBox.propTypes = {
//     /** Set a placeholder to your input-field */
//     placeholder: PropTypes.string,
//     /** Specify which icon to show on your search box "search"/ "close" */
//     iconName: PropTypes.string,
//     /**
//      * Widtht of search-box
//      */
//     width: PropTypes.string,
// };

StSearchBox.defaultProps = {
    iconName: "Search",
};

export function StSearchBox({
    iconName,
    value,
    onChange,
    name,
    placeholder,
    onClick,
    width,
}) {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:"center",position:'relative'}}>
            <input
                className="searchbox col-lg-12 col-md-12 col-sm-12 col-xs-12"
                data-testid="basic-search-box-element"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                style={{
                    width: width ? width : "auto",
                    marginLeft: "15px",
                    height: "48px",
                    outline: "none",
                    border: 0,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    borderRadius: "12px",
                    paddingLeft: "24px",
                    fontSize: "16px",
                    fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif",
                }}
            ></input>

            {iconName === "Search" ? (
                <i
                    style={{
                        opacity: 0.5,
                        cursor: "pointer",position:'absolute',right:5
                    }}
                    aria-hidden="true"
                    className="search icon"
                ></i>
            ) : (
                <i
                    style={{
                        cursor: "pointer",position:'absolute',right:5
                    }}
                    onClick={onClick}
                    aria-hidden="true"
                    className="close link icon"
                ></i>
            )}
        </div>
    );
}
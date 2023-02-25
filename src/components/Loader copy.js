import React from "react";


const getClassName = (color) => {
    let mainColor = color ? color : "primary";
    let className = `spinner-border text-${color}`;
    return className;
};


Loader.defaultProps = {
    color: "primary",
};

export function Loader(props) {
    const { message, color } = props
    return (
        <div
        className="stLoader"
        >
            <div className={`spinner-border text-${color}`} role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
            {message && <span className='text-primary'>{message}</span>}
        </div>
    );
}
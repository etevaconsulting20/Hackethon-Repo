import React from "react";


export function Toggle({ label, value, checked, onChange, ...props }) {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input danger"
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {label}
            </label>
        </div>
    );
}
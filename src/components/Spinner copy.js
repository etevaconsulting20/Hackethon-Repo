import React from 'react';
import loadingIcon from './loadingIcon.svg';

export function Spinner({ text }) {
    return (
        <div className='spinner' >
            <div
                className="spinner-border text-secondary box"
                style={{ width: "7.5rem", height: " 7.5rem" }}
                role="status"
            >
            </div>
            <img
                style={{ height: "3rem", width: "3rem", marginTop: -72 }}
                className="image"
                src={loadingIcon}
            />
        </div>
    );
}
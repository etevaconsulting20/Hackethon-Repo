import React from 'react';
import loadingIcon from './loadingIcon.svg';

export function Spinner(props) {
    const { text } = props
    return (
        <div className={'loadingSpinner'} >
            <div
                className="spinner-border text-secondary box loadingSpinner__wrapper"
                role="status"
            >
            </div> 
            <img
                className="loadingSpinner__loader"
                src={loadingIcon}
            />
        </div>
    );
}
import React from "react";


export function VersioningCard(props) {
    const { text, onCompareClick, onRestoreClick } = props
    return (
        <div
            className="versioningCard">
            {text}
            <div>
                <button
                    type="button"
                    className="btn btn-primary compare-button versioningCard__compareButton"
                    onClick={onCompareClick}
                >
                    Compare
                </button>
                <span>
                    <button
                        type="button"
                        className="btn btn-danger versioningCard__restore"
                        onClick={onRestoreClick}
                    >
                        Restore
                    </button>
                </span>
            </div>
        </div>
    );
}
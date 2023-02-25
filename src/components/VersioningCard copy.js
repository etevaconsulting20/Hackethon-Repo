import React from "react";
import { useTranslation } from 'react-i18next';

import PropTypes from "prop-types";

// VersioningCard.propTypes = {
//     /**
//      Event or function to be executed onCompareClick
//      */
//     onCompareClick: PropTypes.func,
//     /**
//      Event or function to be executed onRestoreClick
//      */
//     onRestoreClick: PropTypes.func,
// };

VersioningCard.defaultProps = {
    onCompareClick: () => alert("This is from Compare Click"),
    onRestoreClick: () => alert("This is from Restore Click"),
};

export function VersioningCard({ text, onCompareClick, onRestoreClick }) {
 const { t } = useTranslation('common');
    return (
        <div
            style={{
                backgroundColor: "#f8f9fa",
                borderTop: "1 px solid #dee2e6",
                color: "#212529",
                width: "180px",
            }}
        >
            {text}
            <div>
                <button
                    type="button"
                    className="btn btn-primary compare-button"
                    style={{
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                        margin: 10,
                        fontSize: ".875rem",
                        fontWeight: 700,
                    }}
                    onClick={onCompareClick}
                >
                    {t("Compare")}
                </button>
                <span>
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                            fontSize: ".875rem",
                            fontWeight: 700,
                        }}
                        onClick={onRestoreClick}
                    >
                        {t("Restore")}
                    </button>
                </span>
            </div>
        </div>
    );
}
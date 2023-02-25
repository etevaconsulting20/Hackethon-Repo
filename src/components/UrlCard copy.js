import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// UrlCard.propTypes = {
//     /** url to be redered on the url Card */
//     url: PropTypes.string,
//     /** Heading to be redered on the url Card */
//     urlHeading: PropTypes.string,
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.event,
//     /** Prop to show Edit button on your url card */
//     isEdit: PropTypes.bool,
//     /** Prop to show Delete button on your url card */
//     isDelete: PropTypes.bool,
// };

UrlCard.defaultProps = {
    onClick: () => alert("This is onClick"),
    isDelete: false,
    isEdit: false,
};

export function UrlCard({
    urlHeading,
    url,
    onClick,
    isEdit,
    isDelete,
    onDeletClick,
    onEditClick,
}) {
    const { t } = useTranslation('common');

    return (
        <div
            style={{
                padding: ".625rem",
                border: "1px solid #c8d6e0",
                borderRadius: ".4375rem",
                cursor: "pointer",
                position: "relative",
            }}
        >
            <div data-testid="url-card-element" onClick={onClick}>
                <span
                    style={{
                        
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#000",
                    }}
                >
                    {urlHeading}
                </span>
                <div
                    style={{
                        color: "#96a5af",
                        fontSize: "12px",
                        
                        overflowY: "hidden",
                        overflowX: "auto"
                    }}
                >
                    {url}
                </div>
            </div>
            {isEdit ? (
                <span
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "80px",
                        color: "#6489a0",
                        fontSize: "12px",
                        
                        fontWeight: 400,
                    }}
                    onClick={onEditClick}
                >
                    {t("Edit")}
                </span>
            ) : (
                ""
            )}
            {isDelete ? (
                <span
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "20px",
                        color: "#6489a0",
                        fontSize: "12px",
                        
                        fontWeight: 400,
                    }}
                    onClick={onDeletClick}
                >
                    {t("Delete")}
                </span>
            ) : (
                ""
            )}
        </div>
    );
}
import React from "react";

import { useTranslation } from "react-i18next";


export function UrlCard(props) {
    const {
        urlHeading,
        url,
        onClick,
        isEdit,
        isDelete,
        onDeletClick,
        onEditClick,
    } = props
    const { t } = useTranslation('common');

    return (
        <div className="urlCard">
            <div data-testid="url-card-element" onClick={onClick}>
                <span>
                    {urlHeading}
                </span>
                <div
                    className = "urlCard__urlWrapper">
                    {url}
                </div>
            </div>
            {isEdit ? (
                <span
                className="urlCard__urlWrapper__edit"
                    onClick={onEditClick}
                >
                    {t("Edit")}
                </span>
            ) : (
                ""
            )}
            {isDelete ? (
                <span 
                    className="urlCard__urlWrapper__delete"
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
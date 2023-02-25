import React from "react";
import { useTranslation } from "react-i18next";
 

BusinessIdCard.defaultProps = {
    onClick: () => alert("This is onClick"),
    businessIdLabel: "Demo_ID",
    businessId: "200",
    isDelete: false,

};

export function BusinessIdCard(props) {
   const { businessIdLabel, businessId, onClick,isDelete } = props
    const { t } = useTranslation('common');

    return (
        <div className='stBusinessCard'>
            <div
                data-testid="business-id-card-element"
                className="stBusinessCard__element">
                    <span className="stBusinessCard__element__businessLable">{businessIdLabel}</span>
                    <span className="ml-3">{businessId}</span>
            </div>
            <div>
                {isDelete ? <span
                className="stBusinessCard__delete"
                    onClick={onClick} >
                    {t("Delete")}
                </span> : null}
                </div>
        </div>
    );
}

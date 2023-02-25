import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// BusinessIdCard.propTypes = {
//     /** text to be redered on the BusinessId Card */
//     businessIdLabel: PropTypes.string,
//     /** businessId to be redered on the BusinessId Card */
//     businessId: PropTypes.string,
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.event,
// };

BusinessIdCard.defaultProps = {
    onClick: () => alert("This is onClick"),
    businessIdLabel: "Demo_ID",
    businessId: "200",
    isDelete: false,

};

export function BusinessIdCard({ businessIdLabel, businessId, onClick,isDelete }) {
    const { t } = useTranslation('common');

    return (
        <div
            style={{
                // padding: ".625rem",
                border: "1px solid #c8d6e0",
                borderRadius: ".4375rem",
                position: "relative",
                height:40,
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
            }}
        >
            <div
                data-testid="business-id-card-element"
                style={{ fontWeight: 400,fontSize: "14px",color: "#000",}} >
                    <span style={{backgroundColor:'#f5d4da',padding:10,borderRadius:"5px 0px 0px 5px"}}>{businessIdLabel}</span>
                    <span className="ml-3">{businessId}</span>
            </div>
            <div>
                {isDelete ? <span
                    style={{ color: "#6489a0",fontSize: "12px", fontWeight: 400, cursor: "pointer", padding:20,}}
                    onClick={onClick} >
                    {t("Delete")}
                </span> : null}
                </div>
        </div>
    );
}

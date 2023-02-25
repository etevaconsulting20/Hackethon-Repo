import React from "react";
import PropTypes from "prop-types";

// EcomCard.propTypes = {
//     /** Heading to be redered on the url Card */
//     url: PropTypes.string,
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.event,
//     /** Prop to show Edit button on your url card */
//     isEdit: PropTypes.bool,
//     /** Prop to show Delete button on your url card */
//     isDelete: PropTypes.bool,
// };

EcomCard.defaultProps = {
    onEditClick: () => alert("This is onEditClick"),
    onDeletClick: () => alert("This is onDeleteClick"),
    isDelete: false,
    isEdit: false,
};

export function EcomCard({
    url,
    cardData,
    onDeletClick,
    onEditClick,
    isDelete,
    isEdit,
}) {
    return (
        <>
            <div
                style={{
                    padding: ".625rem",
                    border: "1px solid #c8d6e0",
                    borderRadius: ".4375rem",
                    position: "relative",
                }}
            >
                <div data-testid="ecom-card-element">
                    <span
                        style={{
                            
                            fontWeight: 400,
                            fontSize: "14px",
                            color: "#000",
                        }}
                    >
                        {url}
                    </span>
                    <div
                        style={{
                            color: "#96a5af",
                            fontSize: "12px",
                            
                        }}
                    >
                        {cardData.map((data, i) => (
                            <span style={{ marginLeft: i != 0 ? "10px" : 0 }}>
                                {data.key} : {data.value}
                            </span>
                        ))}
                    </div>
                </div>
                {isEdit ? (
                    <span
                        style={{
                            position: "absolute",
                            top: "15px",
                            right: "80px",
                            color: "#6489a0",
                            fontSize: "12px",
                            
                            fontWeight: 400,
                            cursor: "pointer",
                        }}
                        onClick={onEditClick}
                    >
                        EDIT
                    </span>
                ) : (
                    ""
                )}
                {isDelete ? (
                    <span
                        style={{
                            position: "absolute",
                            top: "15px",
                            right: "20px",
                            color: "#6489a0",
                            fontSize: "12px",
                            
                            fontWeight: 400,
                            cursor: "pointer",
                        }}
                        onClick={onDeletClick}
                    >
                        DELETE
                    </span>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
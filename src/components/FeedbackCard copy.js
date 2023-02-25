import React from "react";
import { MdMailOutline } from "react-icons/md";
import PropTypes from "prop-types";
import { BsChatSquareText } from "react-icons/bs";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Popup } from "semantic-ui-react";

// FeedbackCard.propTypes = {
//     /** Text to be redered on the feedback Card */
//     feedbackData: PropTypes.string,
//     /** Email to be redered on the feedback Card */
//     feedbackEmail: PropTypes.string,
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.func,
//     /** Change Color of your card when selected */
//     selected: PropTypes.bool,
//     /**
//      Event or function to be executed on Conversation Button Click
//      */
//     onConversationButtonClick: PropTypes.func,
// };

FeedbackCard.defaultProps = {
    onClick: () => alert("This is onClick"),
    selected: false,
    showTooltip : false,
    showTooltipText:"",
};

export function FeedbackCard({
    feedbackData,
    feedbackEmail,
    onClick,
    selected,
    onConversationButtonClick,
    showTooltip,
    showTooltipText,
}) {
    return (
        <div
            data-testid="feedback-card-element"
            style={{
                border: selected ? " 1px solid #dfedf5" : "1px solid #deeaf2",
                borderRadius: ".625rem",
                fontSize: "14px",
                
                marginBottom: ".375rem",
                cursor: "pointer",
                padding: "10px",
                background: selected ? "#f8fcfd" : "#fff",
            }}
        >
            <div onClick={onClick}>
                <div style={{ marginBottom: "8px" }}>
                    <MdMailOutline size={18} />
                    <span
                        style={{ color: "#354052", fontWeight: 700, marginLeft: ".25rem",wordBreak:'break-all' }}
                    >
                        {feedbackEmail}
                    </span>
                    {showTooltip && <Popup
                        pinned
                        wide="very"
                        position="top center"
                        on={"click"}
                        trigger={
                            <IoIosHelpCircleOutline
                                style={{
                                    marginBottom: 2,
                                    color: "#6c757d",
                                    cursor: "pointer",
                                    marginLeft: 5,
                                    marginTop: 5,
                                }}
                                fontWeight={"bold"}
                            />
                        }
                    >
                        <p>{showTooltipText}</p>
                    </Popup>}
                </div>
                <div style={{ color: "#6489a0", fontWeight: 400 }}>
                    {feedbackData.substring(0, 30)}
                </div>
            </div>
            <div
                style={{
                    marginTop: ".375rem",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <BsChatSquareText
                    size={16}
                    style={{ marginRight: "10px" }}
                    onClick={onConversationButtonClick}
                />
            </div>
        </div>
    );
}
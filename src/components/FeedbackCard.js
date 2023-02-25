import React from "react";
import { MdMailOutline } from "react-icons/md";

import { BsChatSquareText } from "react-icons/bs";

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
};

export function FeedbackCard(props) {
  const {
    feedbackData,
    feedbackEmail,
    onClick,
    selected,
    onConversationButtonClick,
  } = props;
  return (
    <div
      data-testid="feedback-card-element"
      style={{
        border: selected ? " 1px solid #dfedf5" : "1px solid #deeaf2",
        background: selected ? "#f8fcfd" : "#fff",
      }}
      className="feedbackCardElement"
    >
      <div onClick={onClick}>
        <div style={{ marginBottom: "8px" }}>
          <MdMailOutline size={18} />
          <span className="feedbackCardElement__feedBackEmail">
            {feedbackEmail}
          </span>
        </div>
        <div className="feedbackCardElement__feedbackData">
          {feedbackData.substring(0, 30)}
        </div>
      </div>
      <div className="feedbackCardElement__bsChatSquareText">
        <BsChatSquareText
          size={16}
          style={{ marginRight: "10px" }}
          onClick={onConversationButtonClick}
        />
      </div>
    </div>
  );
}

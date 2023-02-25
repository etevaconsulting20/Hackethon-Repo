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

export function EcomCard(props) {
  const { url, cardData, onDeletClick, onEditClick, isDelete, isEdit } = props;
  return (
    <>
      <div className="eComCard">
        <div data-testid="ecom-card-element">
          <span className="eComCard__url">{url}</span>
          <div className= 'eComCard__cardData' >
            {cardData.map((data, i) => (
              <span style={{ marginLeft: i != 0 ? "10px" : 0 }}>
                {data.key} : {data.value}
              </span>
            ))}
          </div>
        </div>
        {isEdit ? (
          <span 
          className = "eComCard__isEdit"
            onClick={onEditClick}
          >
            EDIT
          </span>
        ) : (
          ""
        )}
        {isDelete ? (
          <span
          className = "eComCard__isDelete"
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

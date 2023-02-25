import React from "react";

import { MdClose } from "react-icons/md";


StCloseButton.defaultProps = {
  onClick: () => {
    alert("This is on click");
  },
};

export function StCloseButton(props) {
  const { onClick, text } = props;
  return (
    <div onClick={onClick}>
      <MdClose className="stCloseButton"></MdClose>
      <span>
        {text}
      </span>
    </div>
  );
}

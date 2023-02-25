import React from "react";


import { IoIosHelpCircleOutline } from "react-icons/io";
import { Popup } from "semantic-ui-react";
import { MdTextFields } from "react-icons/md";
import aiIcon from "src/assets/svg/artificial-intelligence-robot.svg";

export function Textarea(props) {
  const {
    title,
    value,
    onChange,
    type,
    name,
    readOnly,
    placeholder,
    tooltipText,
    cols,
    showTranslation,
    isShowAiDataIcon,
    onClickAiDataIcon,
    aiIconHoverText,
  } = props;
  return (
    <div className="form-group textAreaWithLabel col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div
        className="col textAreaWithLabel__lable"
        style={{ flex: "0 0 50%", maxWidth: "50%", display: "flex" }}
      >
        <label>{title}</label>
        {showTranslation && <MdTextFields />}
        <Popup
          pinned
          wide="very"
          position="top center"
          // flowing
          on={"click"}
          trigger={
            <IoIosHelpCircleOutline
              className="textAreaWithLabel__lable__popup"
              fontWeight={"bold"}
            />
          }
        >
          <p>{tooltipText}</p>
        </Popup>
      </div>

      <div className="form-floating textAreaWithLabel__inputwrapper">
        <textarea
          data-testid="basic-textarea-element"
          cols={cols}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
          className="textAreaWithLabel__inputwrapper__input"
          style={{
            border: readOnly ? "none" : "1px solid #DBE7EF",
          }}
        />

        {isShowAiDataIcon && (
          <>
            <Popup
              pinned
              wide="very"
              position="top center"
              on="hover"
              trigger={
                <img
                  src={aiIcon}
                  className="textAreaWithLabel__inputwrapper__aiIcon"
                  onClick={onClickAiDataIcon}
                />
              }
            >
              {aiIconHoverText}
            </Popup>
          </>
        )}
      </div>
    </div>
  );
}

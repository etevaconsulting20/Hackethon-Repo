import React, { useState } from "react";
import _ from "lodash";
import {
  MdAddCircleOutline,
  MdClose,
  MdSend,
  MdTextFields,
} from "react-icons/md";
import CustomTooltip from "./CustomTooltip";
import { useTranslation } from "react-i18next";
import { UrlCard } from "src/components//UrlCard";
import Modal from "react-bootstrap/Modal";
import { Loader } from "src/components/Loader1";
import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from "src/components/StSquareButton";
import { IconButton } from "src/components/IconButton";
import { StCancelSquareButton } from "src/components/StCancelSquareButton";
import FormFieldSchemaRender from "./FormFieldSchemaRender";
import { getValidationErrorObjectForYup } from "src/helpers/validationYupHelper";
export function InputUrlMultiAddWithModal(props) {
  const {
    type,
    label,
    placeholder,
    name,
    value,
    options,
    isMultilingual,
    formLanguage,
    isSmallScreen,
    readOnly,
    showToolTip,
    tooltipText,
    errorMsg,
    onChange,
    className,
    showTranslation,
    aiEnable,
    aiIconHoverText,
    touched,
    isAllTouched,
    onBlur,
    modalTitle,
  } = props;
  const { t, i18n } = useTranslation("common");

  let selectedSchema;
  if (options && options[0]) {
    const newOptions = options.map((item) => {
      const matchObject =
        value &&
        value[0] &&
        value.find((elemet) => elemet.title === item.label);
      if (matchObject) {
        return { ...item, disabled: true };
      }
      return item;
    });
    selectedSchema = [
      {
        name: "title",
        label: "Title",
        tooltipText: "Title",
        readOnly: false,
        type: "select",
        options: [...newOptions],
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Title is required"],
          },
        ],
      },
      {
        name: `url`,
        label: "Url",
        placeholder: "Url",
        tooltipText: "Url",
        readOnly: false,
        type: "text",
        isMultilingual: false,
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Url is required"],
          },
          {
            type: "url",
            params: ["Url should be valid"],
          },
        ],
      },
    ];
  } else {
    selectedSchema = [
      {
        name: "title",
        label: "Title",
        tooltipText: "Title",
        readOnly: false,
        type: "text",
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Title is required"],
          },
        ],
      },
      {
        name: `url`,
        label: "Url",
        placeholder: "Url",
        tooltipText: "Url",
        readOnly: false,
        type: "text",
        isMultilingual: false,
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Url is required"],
          },
          {
            type: "url",
            params: ["Url should be valid"],
          },
        ],
      },
    ];
  }

  const [modalData, setModalData] = useState({
    isShow: false,
  });

  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState({
    isAllTouched: true,
    touched: {},
    errorMessage: {},
  });

  const handleRemoveItem = (item) => {
    const newValue = value.filter((element) => {
      if (element.title !== item.title || element.url !== item.url) {
        return true;
      }
      return false;
    });
    onChange({
      target: {
        name: name,
        value: newValue,
      },
    });
  };

  const handleModalShow = () => {
    setModalData({
      ...modalData,
      isShow: true,
    });
  };

  const handleModalHide = () => {
    setModalData({
      isShow: false,
      title: "",
      url: "",
    });
  };

  const handleModalAdd = async () => {
    const { errorMessageObject, errorFieldList } =
      await getValidationErrorObjectForYup(selectedSchema, formData);
    setFormValidation({
      ...formValidation,
      errorMessage: errorMessageObject,
    });
    if (!_.isEmpty(errorMessageObject)) {
      return;
    }
    const newValue = value ? [...value] : [];
    const event = {
      target: {
        name: name,
        value: newValue.concat({ title: formData.title, url: formData.url }),
      },
    };
    onChange(event);
    handleModalHide();
  };
  const handleInputChange = (e) => {
    const newFormData = { ...formData };
    _.set(newFormData, e.target.name, e.target.value);
    setFormData({
      ...newFormData,
    });
  };
  return (
    <>
      <div
        className={`form-group inputUrlMultiAddWithModal col-lg-12 col-md-12 col-sm-12 col-xs-6 ${
          className ? className : ""
        }`}
      >
        <div className="col inputUrlMultiAddWithModal__label">
          <span>
            <label> {label} </label> {showTranslation && <MdTextFields />}
            {tooltipText && (
              <CustomTooltip tooltipContent={<p>{tooltipText}</p>} />
            )}
          </span>
          {!readOnly && (
            <>
              <div
                style={{ cursor: "pointer" }}
                className="col-lg-4 col-md-4 col-sm-4 col-4"
              >
                <IconButton
                  text={t("Add New")}
                  icon={MdAddCircleOutline}
                  onClick={handleModalShow}
                />
              </div>
            </>
          )}
        </div>
        <div className="inputUrlMultiAddWithModal__value">
          <div className="col-12 pl-md-5 pr-5">
            <div className="row">
              {value && value[0] ? (
                value.map((item, index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="mb-2">
                      <UrlCard
                        urlHeading={item.title}
                        url={item.url}
                        onClick={() => window.open(item.url, "_blank")}
                        isDelete={!readOnly}
                        onDeletClick={() => handleRemoveItem(item, index)}
                      ></UrlCard>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <>
                  <span className="passive-message">{t("No data found")}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-danger">
          {(isAllTouched || touched) && errorMsg}
        </div>
      </div>
      <Modal
        size="lg"
        centered={true}
        backdrop="static"
        show={modalData.isShow}
        onHide={handleModalHide}
      >
        <Modal.Header>
          <div style={{ position: "absolute", right: 10 }}>
            <StCloseButton
              text={t("Close")}
              onClick={() => handleModalHide()}
            ></StCloseButton>
          </div>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "normal" }}>
          <div className="row col-12 m-0 justify-content-center">
            <span className="product-profile model-text">
              {t(modalTitle ? modalTitle : "Add")}
            </span>
            <div className="row col-12 m-0 justify-content-center">
              {selectedSchema &&
                selectedSchema[0] &&
                selectedSchema.map((item, index) => (
                  <React.Fragment key={index}>
                    <FormFieldSchemaRender
                      key={`formFieldSchemaRender${item.name}_${index}`}
                      index={index}
                      formItem={item}
                      formValueObject={formData}
                      formValidationObject={formValidation}
                      onBlur={handleInputChange}
                      onChange={handleInputChange}
                      isSmallScreen={true}
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <StCancelSquareButton
            text={t("Cancel")}
            onClick={() => handleModalHide()}
          ></StCancelSquareButton>
          <StSquareButton
            text={t("Add")}
            onClick={() => handleModalAdd()}
            disabled={formData.title == "" || formData.url == "" ? true : false}
          ></StSquareButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

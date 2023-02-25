import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { MdTextFields } from "react-icons/md";
import CustomTooltip from "./CustomTooltip";
import { Badges } from "src/components/Badges";
import { InputTextWithLabel } from 'src/components/inputComponents/InputTextWithLabel';
import { useTranslation } from "react-i18next";


import Modal from "react-bootstrap/Modal";
import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from 'src/components/StSquareButton';
// import { emailYuSchema } from "src/helpers/yup-schema";
import { validateYupSchemaObject } from "src/helpers/validationYupHelper";


export function InputEmailMultiAddWithModal(props) {
  const {
    type, label, placeholder, name, value, options, isMultilingual, formLanguage, isSmallScreen,
    readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
    showTranslation, aiEnable, aiIconHoverText,
    touched, isAllTouched, onBlur, modalTitle,
  } = props

  const { t, i18n } = useTranslation('common');



  const [modalData, setModalData] = useState({
    isShow: false,
  })

  const [formData, setFormData] = useState({})
  const [formValidation, setFormValidation] = useState({
    isAllTouched: false,
    touched: {},
    errorMessage: {},
  })

  useEffect(async () => {
  //  const {errorMessageObject} = await validateYupSchemaObject(emailYuSchema, formData)
  //   if (errorMessageObject) {
  //     setFormValidation({
  //       ...formValidation,
  //       errorMessage: errorMessageObject
  //     })
  //   }
    return () => {
    }
  }, [JSON.stringify(formData)])




  const handleRemoveItem = (item) => {
    const newValue = value.filter((element) => element !== item)
    onChange({
      target: {
        name: name,
        value: newValue,
      }
    })
  }


  const handleModalShow = () => {
    setModalData({
      ...modalData,
      isShow: true,
    })
  }

  const handleModalHide = () => {
    setModalData({
      isShow: false,
    })
    handleResetFormData_validation()
  }



  const handleResetFormData_validation = () => {
    setFormData({})
    setFormValidation({
      isAllTouched: false,
      touched: {},
      errorMessage: {},
    })
  }
  

  const handleModalAdd = () => {
    if (!_.isEmpty(formValidation.errorMessage)) {
      return
    }
    const newValue = value ? [...value] : []
    newValue.push(formData.email)
    const event = {
      target: {
        name: name,
        value: newValue
      }
    }
    onChange(event)

    handleModalHide()
  }

  const handleInputValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleInputValueBlur = (e) => {
    setFormValidation({
      ...formValidation,
      touched: { ...formValidation.touched, [e.target.name]: true },
    })
  }



  return (
    <>
      <div className={`form-group inputMultiSelectWithModal col-lg-12 col-md-12 col-sm-12 col-xs-6 ${className ? className : ""}`}>
        <div className="col inputMultiSelectWithModal__label">
          <label >
            {label}
          </label>
          {showTranslation && <MdTextFields />}
          {tooltipText &&
            <CustomTooltip
              tooltipContent={<p>{tooltipText}</p>}
            />
          }
        </div>

        <div className="inputMultiSelectWithModal__value">
          {value && value[0] ?
            value.map((item, index) => (
              <React.Fragment key={`${item}_${index}`}>
                {readOnly ? (
                  <Badges key={`${item}_${index}_readOnly`}>
                    {item}
                  </Badges>
                ) : (
                  <Badges key={`${item}_${index}_remove`} remove onClick={() => handleRemoveItem(item)}>
                    {item}
                  </Badges>
                )}
              </React.Fragment>
            ))
            :
            <>
              <span className="passive-message">{t("No data found")}</span>
            </>
          }
          {
            !readOnly &&
            <Badges add onClick={handleModalShow} >
              {t("Add")}
            </Badges>
          }
        </div>
        <div className="text-danger">
          {(isAllTouched || touched) && errorMsg}
        </div>
      </div>

      <Modal size="lg" centered={true} backdrop="static" show={modalData.isShow} onHide={handleModalHide} >
        <Modal.Header >
          <div style={{ position: 'absolute', right: 10 }}>
            <StCloseButton text={t("Close")} onClick={() => handleModalHide()}></StCloseButton>
          </div>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: 'normal' }}>
          <div className="row col-12 m-0 justify-content-center">
            <span className="product-profile model-text" >{t(modalTitle ? modalTitle : "Add email")}</span>
            <InputTextWithLabel
              isSmallScreen={true}
              placeholder={t("Add email")}
              search={true}
              name={"email"}
              value={formData.email}
              onChange={handleInputValueChange}
              onBlur={handleInputValueBlur}
              touched={formValidation.touched.email}
              errorMessage={formValidation.errorMessage.email}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <StSquareButton text={t("Add")} onClick={() => handleModalAdd()}></StSquareButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
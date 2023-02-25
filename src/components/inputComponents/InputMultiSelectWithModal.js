import React, { useState } from "react";
import _ from 'lodash';
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import CustomTooltip from "./CustomTooltip";
import { Badges } from "src/components/Badges";
import { InputMultiSelectDropdown } from "src/components/inputComponents/InputMultiSelectDropdown";
import { useTranslation } from "react-i18next";


import Modal from "react-bootstrap/Modal";
import { Loader } from 'src/components/Loader';
import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from 'src/components/StSquareButton';



export function InputMultiSelectWithModal(props) {
  const {
    type, label, placeholder, name, value, options, isMultilingual, formLanguage, isSmallScreen,
    readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
    showTranslation, aiEnable, aiIconHoverText,
    touched, isAllTouched, onBlur, modalTitle,
  } = props

  const { t, i18n } = useTranslation('common');
  let selectedFormLanguage = (isMultilingual && formLanguage) ? formLanguage : i18n.language



  const [modalData, setModalData] = useState({
    isShow: false,
    multiSelectValue: [],
  })




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
      multiSelectValue: [],
    })
  }


  const handleModalAdd = () => {
    const newValue = value ? [...value] : []
    const event = {
      target: {
        name: name,
        value: newValue.concat(modalData.multiSelectValue)
      }
    }
    onChange(event)

    setModalData({
      isShow: false,
      multiSelectValue: [],
    })
  }

  const handleMultiSelectValueChange = (e) => {
    setModalData({
      ...modalData,
      multiSelectValue: e.target.value
    })
  }


  const showValue = (item) => {
    if (options?.length) {
      const itemObject = options.find((element) => element.value === item)
      if (isMultilingual) {
        return _.get(itemObject, `label.${selectedFormLanguage}`, item)
      }
      else {
        return _.get(itemObject, `label`, item)
      }
    }
    return item
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
                    {showValue(item)}
                  </Badges>
                ) : (
                  <Badges key={`${item}_${index}_remove`} remove onClick={() => handleRemoveItem(item)}>
                    {showValue(item)}
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
            <span className="product-profile model-text" >{t(modalTitle ? modalTitle : "Select")}</span>
            <InputMultiSelectDropdown
              placeholder={t("Choose an Option")}
              search={true}
              name={"multiSelectWithModal"}
              value={modalData.multiSelectValue}
              options={options}
              isMultilingual={isMultilingual}
              formLanguage={selectedFormLanguage}
              onChange={handleMultiSelectValueChange}
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
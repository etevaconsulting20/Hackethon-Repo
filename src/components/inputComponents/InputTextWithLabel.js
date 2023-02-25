import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import aiIcon from 'src/assets/svg/artificial-intelligence-robot.svg'
import CustomTooltip from "./CustomTooltip";
import { Popup } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";
import { Loader } from 'src/components/Loader1';
import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from 'src/components/StSquareButton';
import { getFieldAiDataAction } from 'src/redux/aiData/aiDataThunk';



// InputTextWithLabel.propTypes = {
//     /** Give a label to your input-field */
//     label: PropTypes.string,
//     /** Specify the type of input */
//     type: PropTypes.string,
//     /** Set a placeholder to your input-field */
//     placeholder: PropTypes.string,
//     /** Make the input field disabled/readonly */
//     readOnly: PropTypes.bool,
//     /** Choose if you want to show the toolTip */
//     showTooltip: PropTypes.bool,
//     /** Give an error message to your dropdown */
//     errorMessage: PropTypes.string,
//     /** Show a msg in your toolTip */
//     tooltipText: PropTypes.string,
// };


InputTextWithLabel.defaultProps = {
    onBlur: () => { },
    onChange: () => { },
};

/** inputComponents */
export function InputTextWithLabel(props) {
    const {
        type, label, placeholder, name, value, isSmallScreen,
        readOnly, showToolTip, tooltipText, errorMessage, onChange, className,
        showTranslation, aiEnable, aiIconHoverText,
        touched, isAllTouched, onBlur,
    } = props

    const { t } = useTranslation('common');



    const dispatch = useDispatch()
    const { aiTranslations } = useSelector(state => state)
    const { isLoading } = aiTranslations

    const [showAiDataModal, setShowAiDataModal] = useState(false)
    const [modalData, setModalData] = useState({
        inputValue: "",
        aiDataResponse: "",
    })





    const handleAiDataModal = async () => {
        setShowAiDataModal(true)
        try {
            const responseData = await dispatch(getFieldAiDataAction({
                text: value
            })).unwrap()

            setModalData({
                ...modalData,
                aiDataResponse: responseData.trim()
            })
        } catch (error) {

        }

    }


    const handleShowAiDataModal = (value) => {
        if (value === false) {
            setShowAiDataModal(value)
            setModalData({
                inputValue: "",
                aiDataResponse: "",
            })
        }
    }

    const handleSelectAiData = () => {
        const inputEvent = {
            target: {
                name: props.name,
                value: modalData.aiDataResponse
            }
        }
        onChange(inputEvent)
        setShowAiDataModal(false)

        setModalData({
            inputValue: "",
            aiDataResponse: "",
        })
    }


    const countWords = (str) => {
        const arr = str.split(' ');
        return arr.filter(word => word !== '').length;
    }


    const isShowAiDataIcon = (aiEnable && !readOnly && (value && countWords(value) >= 2)) ? true : false;
    return (
        <>
            <div className={`form-group inputTextWithLabel ${isSmallScreen ? "col-lg-12 col-md-12 col-sm-12 col-xs-6" : "col-lg-6 col-md-6 col-sm-6 col-xs-6"} ${className ? className : ""}`}>
                <div className="col inputTextWithLabel__label">
                    <label >
                        {label}
                    </label>
                    {showTranslation && <MdTextFields />}
                    {
                        label && tooltipText &&
                        <CustomTooltip
                            tooltipContent={<p>{tooltipText}</p>}
                        />
                    }

                </div>

                <div>
                    <div className="inputTextWithLabel__inputwrapper">
                        <input
                            readOnly={readOnly ? readOnly : false}
                            value={value ? value : ""}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            className="inputTextWithLabel__inputwrapper__input"
                        />
                        {
                            isShowAiDataIcon &&
                            <>
                                <Popup
                                    pinned
                                    wide="very"
                                    position="top center"
                                    on="hover"
                                    trigger={
                                        <img
                                            src={aiIcon}
                                            className="inputTextWithLabel__inputwrapper__aiIcon"
                                            onClick={handleAiDataModal}
                                        />
                                    }
                                >
                                    {aiIconHoverText}
                                </Popup>
                            </>
                        }
                    </div>
                    <div className="text-danger">
                        {(isAllTouched || touched) && errorMessage}
                    </div>
                </div>
            </div>


            <Modal size="md" centered={true} backdrop="static" show={showAiDataModal} onHide={() => handleShowAiDataModal(false)} >
                <Modal.Header >
                    <div style={{ position: 'absolute', right: 10 }}>
                        <StCloseButton text={t("Close")} onClick={() => handleShowAiDataModal(false)}></StCloseButton>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: 'normal' }}>
                    {
                        isLoading &&
                        <Loader color='primary' />
                    }

                    {modalData.aiDataResponse}

                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <StSquareButton text={t("Select")} onClick={() => handleSelectAiData()}></StSquareButton>
                    <StSquareButton text={t("Cancel")} onClick={() => handleShowAiDataModal(false)}></StSquareButton>
                </Modal.Footer>
            </Modal>

        </>
    );
}
import React, { useRef, useState } from 'react';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import { getCroppedImg } from 'src/helper/CustomHook';
import 'react-image-crop/dist/ReactCrop.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useTranslation } from 'react-i18next';


import Modal from "react-bootstrap/Modal";
import { MdCrop, MdClose, MdFileUpload, MdDelete, MdAddCircleOutline } from 'react-icons/md';
import { MediaImage } from './MediaImage';
import { getAllProductImagesAction, uploadProductFileAction, deleteImageAction, getImageDownload, } from 'src/redux/media/mediaThunk';
import { getProductByIdAction } from 'src/redux/products/productThunk';
import { IconButton } from 'src/components/IconButton';
import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from "src/components/StSquareButton";
import { StCancelSquareButton } from 'src/components/StCancelSquareButton'
import { InputTextWithLabel } from './InputTextWithLabel';



export const MediaVideoUrl = (props) => {
    const {
        type, label, placeholder, name, value, isSmallScreen,
        readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
        showTranslation, aiEnable, aiIconHoverText,
        touched, isAllTouched, onBlur,
    } = props
    const { t } = useTranslation('common');



    const [videoModalData, setVideoModalData] = useState({
        isShow: false,
        videoUrl: ""
    })

    const [modalData, setModalData] = useState({
        isShow: false,
        handleOnClickOk: () => { },
        title: '',
        text: ""
    })


    const deleteClicked = async (index) => {
        const handleModalDeleteOk = async () => {
            const newValue = [...value]
            newValue.splice(index, 1);
            const event = {
                target: {
                    name: name,
                    value: newValue
                }
            }
            onChange(event)
            handleHideModal()
        }

        setModalData({
            ...modalData,
            isShow: true,
            title: t('Delete video Url'),
            text: t('Are you sure you want to delete the video Url?'),
            handleOnClickOk: handleModalDeleteOk,
        })
    }


    const handleHideModal = () => {
        setModalData({
            isShow: false,
            handleOnClickOk: () => { },
            title: '',
            text: ""
        })
    }



    const handleShowHideVideoModel = () => {
        setVideoModalData({
            isShow: !videoModalData.isShow,
            videoUrl: ""
        })
    };


    const handleAddVideoUrl = () => {
        const newValue = (value && value[0]) ? [...value] : [];
        newValue.push(videoModalData.videoUrl);
        const event = {
            target: {
                name: name,
                value: newValue
            }
        }
        onChange(event)
        handleShowHideVideoModel()
    }

    return (
        <div className='mediaImageOther'>
            {!readOnly &&
                <>
                    <div className='mediaImageOther__upload'>
                        <IconButton text={t("Add New")} icon={MdAddCircleOutline} onClick={() => handleShowHideVideoModel()} />
                    </div>
                </>
            }
            <div className='mediaImageOther__images'>
                {value && value[0] && value.map((item, index) => (
                    <React.Fragment key={index}>
                        <div key={index} className="col-12 media-card document-upload-card my-1">
                            <div className="row">
                                <div className="col-10">
                                    <span className="media-card documetn-title">{item}</span>
                                </div>
                                {!readOnly &&
                                    <div className="col-2">
                                        <a href={item} target="_blank" className="media-card documetn-upload-title">{t("View")}</a>
                                        <span onClick={() => deleteClicked(index)} className="media-card documetn-upload-title ml-3">{t("Delete")}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>


            <Modal size="md" centered={true} backdrop="static" show={videoModalData.isShow} onHide={handleShowHideVideoModel} >
                <Modal.Header >
                    <div style={{ position: 'absolute', right: 10 }}>
                        <StCloseButton text={t("Close")} onClick={() => handleShowHideVideoModel()}></StCloseButton>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: 'normal' }}>
                    <div className="row m-0 justify-content-center">
                        <span className="col-12 media-card model-text" >{t("Enter video url")}</span>
                        <div className="form-group col-12"  >
                            <InputTextWithLabel isSmallScreen={true}
                                label={t("Video Url")}
                                name={"videoUrl"}
                                type="text"
                                placeholder={t("Video Url")}
                                value={videoModalData.videoUrl}
                                onChange={(e) => setVideoModalData({ ...videoModalData, videoUrl: e.target.value })}
                            ></InputTextWithLabel>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <StSquareButton text={t("Add")} onClick={() => handleAddVideoUrl()}></StSquareButton>
                    <StCancelSquareButton text={t("Cancel")} onClick={() => handleShowHideVideoModel()}></StCancelSquareButton>
                </Modal.Footer>
            </Modal>

            <Modal size="md" centered={true} backdrop="static" show={modalData.isShow} onHide={handleHideModal} >
                <Modal.Header >
                    <div style={{ position: 'absolute', right: 10 }}>
                        <StCloseButton text={t("Close")} onClick={() => handleHideModal()}></StCloseButton>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: 'normal', textAlign: 'center' }}>
                    <div className="row m-0 justify-content-center">
                        <span className="col-12 media-card model-text" >{modalData.title}</span>
                        <span className="col-12 media-card model-content mt-4" >{modalData.text}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center', margin: 15 }}>
                    <StSquareButton text={t("Delete")} onClick={() => modalData.handleOnClickOk()}></StSquareButton>
                    <StCancelSquareButton text={t("Cancel")} onClick={() => handleHideModal()}></StCancelSquareButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

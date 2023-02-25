import React, { useRef, useState } from 'react';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import { getCroppedImg } from 'src/helpers/CustomHook';
import 'react-image-crop/dist/ReactCrop.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useTranslation } from 'react-i18next';


import Modal from "react-bootstrap/Modal";
import { MdCrop, MdClose, MdFileUpload, MdDelete, MdAddCircleOutline } from 'react-icons/md';
import { MediaImage } from './MediaImage';
import { getAllProductImagesAction, uploadProductFileAction, deleteImageAction, getImageDownload, } from 'src/redux/media/mediaThunk';
import { addRemoveSectionLoadingAction } from 'src/redux/slice/homeSlice';
import { getProductByIdAction } from 'src/redux/products/productThunk';
import { IconButton } from 'src/components/IconButton';
import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from "src/components/StSquareButton";
import { StCancelSquareButton } from 'src/components/StCancelSquareButton'

import "@google/model-viewer";



export const Media3dmodelGlb = (props) => {
    const {
        type, section, label, placeholder, name, value, isSmallScreen,
        readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
        showTranslation, aiEnable, aiIconHoverText,
        touched, isAllTouched, onBlur,
    } = props

    const { t } = useTranslation('common');

    const dispatch = useDispatch()
    const _state = useSelector(
        (state) => (state.products),
        shallowEqual
    );

    const _mediaState = useSelector(
        (state) => (state.media),
        shallowEqual
    );

    const [modalData, setModalData] = useState({
        isShow: false,
        handleOnClickOk: () => { },
        title: '',
        text: ""
    })




    const uploadToServerMultiple = async (fromSection, formData) => {
        const businessId = _.get(_.find(_state.formObject.businessIdentifiers, function (o) { return o.type === "VATID" }), 'id', _state.formObject.businessIdentifiers[0].id)
        const gtin = _.get(_state, 'formObject.gtin', _state.formObject._2an)
        try {
            dispatch(addRemoveSectionLoadingAction({ name: name, section: section, type: "add" }))
            await dispatch(uploadProductFileAction({
                businessId: businessId,
                gtin: gtin,
                body: formData,
                type: fromSection,
                isLoaderShow: false
            })).unwrap();

            await dispatch(getProductByIdAction({ isLoader: true, gtin: gtin })).unwrap()
        } catch (error) {

        }
        dispatch(addRemoveSectionLoadingAction({ name: name, section: section, type: "remove" }))
    }

    const handleOnFileDrop = async (files, fromSection) => {
        const formData = new FormData();
        files.map((file, index) => {
            formData.append('other', file)
        });
        await uploadToServerMultiple(fromSection, formData)
    }



    const deleteClicked = async (url, type) => {
        const handleModalDeleteOk = async () => {
            const businessId = _.get(_.find(_state.formObject.businessIdentifiers, function (o) { return o.type === "VATID" }), 'id', _state.formObject.businessIdentifiers[0].id)
            const gtin = _.get(_state, 'formObject.gtin', _state.formObject._2an)
            try {
                await dispatch(deleteImageAction({
                    url: url,
                    businessId: businessId,
                    gtin: gtin,
                    isLoaderShow: false
                })).unwrap();
                await dispatch(getProductByIdAction({ isLoader: true, gtin: gtin }))
                handleHideModal()
            } catch (error) {

            }

        }

        setModalData({
            ...modalData,
            isShow: true,
            title: t('Delete file'),
            text: t('Are you sure you want to delete the file?'),
            handleOnClickOk: handleModalDeleteOk,
        })

        // //dispatch(mediaAction.deleteImage({url:url}));
        // if (type === "pdf") {
        //   setDelModelState({ ...delModelState, modelDelUrl: url, modelTitle: t('Delete file'), modelText: t('Are you sure you want to delete the file?') })
        // } else {
        //   setDelModelState({ ...delModelState, modelDelUrl: url, modelTitle: t('Delete image'), modelText: t('Are you sure you want to delete the image?') })
        // }
        // setDelShow(true)

    }


    const handleHideModal = () => {
        setModalData({
            isShow: false,
            handleOnClickOk: () => { },
            title: '',
            text: ""
        })
    }

    return (
        <div className='mediaImageOther'>
            {!readOnly &&
                <>
                    <Dropzone className='col-lg-4 col-md-4 col-sm-4 col-4' onDrop={acceptedFiles => handleOnFileDrop(acceptedFiles, 'fromOtherImagesSection')}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="mediaImageOther__upload" >
                                <input {...getInputProps()} />
                                <div style={{ cursor: 'pointer' }}>
                                    <IconButton text={t("Upload")} icon={MdFileUpload} onClick={() => console.log('upload')} />
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </>
            }


            <div className='media3dModelViewer__wrapper'>
                {value && value[0] && value.map((item, index) => (
                    <React.Fragment key={index}>
                        {
                            (item.split('.').pop() == 'glb') &&
                            <div className='media3dModelViewer__wrapper__video' >
                                {!readOnly &&
                                    <>
                                        <div className="media-card triangle media3dModelViewer__wrapper__triangle">
                                            <MdDelete
                                                onClick={() => deleteClicked(item, 'image')}
                                                size={22}
                                                style={{
                                                    position: 'absolute',
                                                    top: 5,
                                                    right: "-3rem",
                                                    cursor: 'pointer',
                                                    color: "#ffffff"
                                                }}
                                            />
                                        </div>
                                    </>
                                }
                                <model-viewer
                                    src={item}
                                    alt="A 3D model"
                                    shadow-intensity="0" camera-controls auto-rotate ar ar-scale autoplay xr-environment
                                />
                            </div>
                        }
                    </React.Fragment>
                ))}
            </div>
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
                    <StSquareButton text={t("Delete")} loading={_mediaState.isMediaDeleting} onClick={() => modalData.handleOnClickOk()}></StSquareButton>
                    <StCancelSquareButton text={t("Cancel")} onClick={() => handleHideModal()}></StCancelSquareButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

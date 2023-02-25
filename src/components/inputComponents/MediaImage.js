import React, { useRef, useState } from 'react';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import { getCroppedImg } from 'src/helper/CustomHook';
import 'react-image-crop/dist/ReactCrop.css';

import { addRemoveSectionLoadingAction } from 'src/redux/products/productsSlice';
import { getProductByIdAction } from 'src/redux/products/productThunk';
import { getAllProductImagesAction, uploadProductFileAction, deleteImageAction, getImageDownload, } from 'src/redux/media/mediaThunk';
import { shallowEqual, useDispatch, useSelector } from "react-redux";


import { IoCloudUploadOutline } from "react-icons/io5";
import { MdCrop, MdClose, MdFileUpload, MdDelete, MdAddCircleOutline } from 'react-icons/md';
import Modal from "react-bootstrap/Modal";
import emptyimage from 'src/assets/images/emptyimage.png'
import { Dropdown, Popup } from "semantic-ui-react";
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { useTranslation } from 'react-i18next';



import { StCloseButton } from "src/components/StCloseButton";
import { StSquareButton } from "src/components/StSquareButton";
import { StCancelSquareButton } from 'src/components/StCancelSquareButton'
import { UrlCard } from 'src/components/UrlCard';
import { Spinner } from "src/components/Spinner";
import "@google/model-viewer";





const initialCrop = {
    // aspect: 1 / 1,
    unit: 'px',
    width: 100,
    height: 100,
}



export const MediaImage = (props) => {
    const {
        type, section, label, bottomLabel, placeholder, name, value, isSmallScreen,
        readOnly, showToolTip, tooltipText, errorMsg, onChange, className,
        showTranslation, aiEnable, aiIconHoverText,
        touched, isAllTouched, onBlur,
    } = props

    const { t } = useTranslation('common');
    const cropRef = useRef();
    const maxSize = 4194304 // 4mb

    const dispatch = useDispatch()
    const _mediaState = useSelector(
        (state) => (state.media),
        shallowEqual
    );
    const _state = useSelector(
        (state) => (state.products),
        shallowEqual
    );


    const [showCropModal, setShowCropModal] = useState(false);
    const [docUrl, setDocUrl] = useState({
        isDirty: false,
        list: [],
        readyToUpload: null,
        baseForm: null
    });
    const [editState, setEditState] = useState({ editingSrc: null, imageType: null, url: null })
    const [crop, setCrop] = useState(initialCrop);


    const modalDataInitialState = {
        isShow: false,
        handleOnClickOk: () => { },
        handleOnCancel: () => { },
        title: '',
        text: "",
        saveChangeText: "",
        cancelText: "",
    }
    const [modalData, setModalData] = useState({ ...modalDataInitialState })



    function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let baseString = new File([u8arr], filename, { type: mime });
        return baseString;
        //setFileObject(croppedImage)
    }

    const getArticleIdentifiers = () => {
        let gtin = _.get(_state, 'formObject.gtin');
        let _2an = _.get(_state, 'formObject._2an');
        let queryParams;
        if (gtin && _2an) {
            queryParams = `gtin=${gtin}&_2an=${_2an}`;
        } else if (gtin) {
            queryParams = `gtin=${gtin}`;
        } else {
            queryParams = `_2an=${_2an}`;
        }
        return queryParams
    }


    const onImageDrop = (acceptedFiles, pathType) => {
        let file = acceptedFiles[0];
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.readAsDataURL(file)
        reader.onload = () => {
            let _docUrl = docUrl;
            _.set(_docUrl, `baseForm`, reader.result);
            _.set(_docUrl, `readyToUpload`, file);
            _.set(_docUrl, `list`, [reader.result]);
            _.set(_docUrl, `isDirty`, false);
            _.set(_docUrl, `pathType`, pathType);
            setDocUrl({ ..._docUrl });


            if (file.size >= maxSize) {
                setModalData({
                    ...modalData,
                    isShow: true,
                    title: t('File size is large'),
                    text: t('Are you sure you want upload the this file file?'),
                    saveChangeText: t("Upload"),
                    cancelText: t("Cancel"),
                    handleOnClickOk: async () => {
                        uploadImage()
                        handleHideModal()
                    },
                    handleOnCancel: handleHideModal,
                })
            }
            else {
                uploadImage()
            }
        }
    }

    const handleCropClicked = async (src, type) => {
        let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);
        // //alert(src.match(regex));
        setShowCropModal(true);
        if (!!src.match(regex)) {
            //   //Image URL found
            const businessId = _.get(_.find(_state.formObject.businessIdentifiers, function (o) { return o.type === "VATID" }), 'id', _state.formObject.businessIdentifiers[0].id)
            const gtin = _.get(_state, 'formObject.gtin', _state.formObject._2an)
            const downloadImageData = await dispatch(getImageDownload({ businessId: businessId, gtin: gtin, url: src })).unwrap();
            //   setEditState({ ...editState, imageType: type, url: src });
            setEditState({ ...editState, imageType: type, url: src, editingSrc: 'data:image/png;base64,' + downloadImageData })
        } else {
            //Image in base64 format
            setEditState({ ...editState, imageType: type, editingSrc: src, });
        }
    }

    const deleteClicked = (url, type) => {
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
            saveChangeText: t("Delete"),
            cancelText: t("Cancel"),
            handleOnClickOk: handleModalDeleteOk,
            handleOnCancel: handleHideModal,
        })
    }


    const uploadImage = async () => {
        let queryParams = getArticleIdentifiers();
        const businessId = _.get(_.find(_state.formObject.businessIdentifiers, function (o) { return o.type === "VATID" }), 'id', _state.formObject.businessIdentifiers[0].id)
        const gtin = _.get(_state, 'formObject.gtin', _state.formObject._2an)
        const formData = new FormData();
        const pathType = _.get(docUrl, `pathType`)
        formData.append(pathType, _.get(docUrl, `readyToUpload`));

        dispatch(addRemoveSectionLoadingAction({ name: name, section: section, type: "add" }))
        try {
            await dispatch(uploadProductFileAction({
                businessId: businessId,
                gtin: gtin,
                body: formData,
                type: pathType,
                isLoaderShow: false,
                articleIdentifier: queryParams
            })).unwrap();

            await dispatch(getProductByIdAction({ isLoader: true, gtin: gtin })).unwrap()
        } catch (error) {

        }
        dispatch(addRemoveSectionLoadingAction({ name: name, section: section, type: "remove" }))
    }

    const getResizedCropValue = (originalH, originalW, newH, newW) => {
        let HDiff = originalH / newH;
        let WDiff = originalW / newW;
        let newCrop = { ...crop, x: crop.x * WDiff, y: crop.y * WDiff, height: crop.height * HDiff, width: crop.width * WDiff }
        return newCrop;
    }

    const handleImageCropModelOk = async () => {
        if (editState.imageType === 'other') {
            const url = _.get(editState, `url`)
            const businessId = _.get(_.find(_state.formObject.businessIdentifiers, function (o) { return o.type === "VATID" }), 'id', _state.formObject.businessIdentifiers[0].id)
            const gtin = _.get(_state, 'formObject.gtin', _state.formObject._2an)
            dispatch(deleteImageAction({
                url: url,
                businessId: businessId,
                gtin: gtin,
                isLoaderShow: false
            }));
        }
        let CropedImg = null;
        let _docUrl = docUrl;
        var image = new Image();
        image.src = _.get(editState, `editingSrc`);
        image.crossOrigin = "anonymous"
        image.onload = async function () {
            let _newCrop = getResizedCropValue(image.height, image.width, cropRef.current.imageRef.current.clientHeight, cropRef.current.imageRef.current.clientWidth);
            CropedImg = getCroppedImg(image, _newCrop, editState.imageType);

            editState.imageType !== 'other' && _.set(_docUrl, `list`, [CropedImg]);
            _.set(_docUrl, `readyToUpload`, dataURLtoFile(CropedImg, editState.imageType + '.jpeg'));
            _.set(_docUrl, `isDirty`, true);
            setDocUrl({ ..._docUrl });
            await uploadImage(editState.imageType);
            setShowCropModal(false)
        };
    }


    const handleHideModal = () => {
        setModalData({ ...modalDataInitialState })
    }


    const getPathType = () => {
        if (name && name.includes(".")) {
            const subString = name.substring(
                name.indexOf(".") + 1,
                name.lastIndexOf("[")
            );
            return subString
        }

        return ""
    }

    const pathType = getPathType()


    return (
        <div className="mediaImage media-card">
            <div className="justify-content-center">
                <Dropzone disabled={!readOnly ? false : true} className="col-2" onDrop={acceptedFiles => onImageDrop(acceptedFiles, pathType)}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({
                            className: 'dropzone',
                            onClick: event => { event.target.id !== "image-upload-id" && event.stopPropagation() }
                        })}>
                            <input {...getInputProps()} />
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img alt="alt" src={!!value ? value : emptyimage} />
                                    </div>
                                    <div className="flip-card-back">
                                        <img
                                            alt="alt"
                                            id="image-upload-id"
                                            src={!!value ? value : emptyimage}
                                        />
                                        {!readOnly && !!value &&
                                            <>
                                                <div onClick={() => handleCropClicked(value, pathType)} style={{ backgroundColor: '#ffffff', height: 40, width: 200, position: 'absolute', bottom: -2, display: 'flex', justifyContent: 'center', opacity: 0.9 }}>
                                                    <MdCrop style={{ alignSelf: 'center' }} size={18} />
                                                    <span style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{t("Crop")}</span>
                                                </div>
                                                <div>
                                                    <div className="media-card triangle"></div>
                                                    <MdDelete onClick={() => deleteClicked(value, 'image')} size={22} className="media-card delete-icon" />
                                                </div>
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Dropzone>
                {bottomLabel && <div className='col-lg-12 media-card image-info-title'>{bottomLabel}</div>}
            </div>

            <Modal size="lg" centered={true} backdrop="static" show={showCropModal} onHide={() => setShowCropModal(false)} >
                <Modal.Header >
                    <div style={{ position: 'absolute', right: 10 }}>
                        <StCloseButton text={t("Close")} onClick={() => setShowCropModal(false)}></StCloseButton>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: 'normal' }}>
                    <div className="row m-0">
                        <span className="col-12 media-card model-text" >{t("Edit Product Image")}</span>
                        <div className="media-card crop-container justify-content-center align-items-center d-flex">
                            {!_mediaState.isMediaDownloading ?
                                <ReactCrop
                                    style={{ height: 400 }}
                                    ruleOfThirds={true}
                                    ref={cropRef}
                                    onImageLoaded={(image) => console.log('IMAGE FROM CROP : ', image.width, image.height)}
                                    src={editState.editingSrc}
                                    crop={editState.imageType == "square" ? { ...crop, aspect: 1 / 1 } : crop}
                                    onChange={newCrop => setCrop(newCrop)}
                                />
                                :
                                <div className="media-card crop-loader-container">
                                    <div className="spinner-border spinner-border ml-2" role="status"></div>
                                </div>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <StSquareButton text={t("Save")}
                        loading={_mediaState.mediaUploadState.documentUploading || _mediaState.mediaUploadState.otherImageUploading || _mediaState.mediaUploadState.profileImageUploading ? true : false}
                        onClick={() => handleImageCropModelOk()}>
                    </StSquareButton>
                </Modal.Footer>
            </Modal>


            <Modal size="md" centered={true} backdrop="static" show={modalData.isShow} onHide={modalData.handleOnCancel} >
                <Modal.Header >
                    <div style={{ position: 'absolute', right: 10 }}>
                        <StCloseButton text={t("Close")} onClick={() => modalData.handleOnCancel()}></StCloseButton>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: 'normal', textAlign: 'center' }}>
                    <div className="row m-0 justify-content-center">
                        <span className="col-12 media-card model-text" >{modalData.title}</span>
                        <span className="col-12 media-card model-content mt-4" >{modalData.text}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center', margin: 15 }}>
                    <StSquareButton text={modalData.saveChangeText} loading={_mediaState.isMediaDeleting} onClick={() => modalData.handleOnClickOk()}></StSquareButton>
                    <StCancelSquareButton text={modalData.cancelText} onClick={() => modalData.handleOnCancel()}></StCancelSquareButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

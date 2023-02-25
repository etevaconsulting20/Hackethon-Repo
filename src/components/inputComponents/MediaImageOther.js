import React, { useRef, useState } from 'react';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import { getCroppedImg } from 'src/helper/CustomHook';
import 'react-image-crop/dist/ReactCrop.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useTranslation } from 'react-i18next';


import { MediaImage } from './MediaImage';
import { uploadProductFileAction } from 'src/redux/media/mediaThunk';
import { addRemoveSectionLoadingAction } from 'src/redux/products/productsSlice';
import { getProductByIdAction } from 'src/redux/products/productThunk';
import { IconButton } from 'src/components/IconButton';
import { MdFileUpload } from 'react-icons/md';


export const MediaImageOther = (props) => {
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



    const uploadToServerMultiple = async (fromSection, formData) => {
        const businessId = _.get(_.find(_state.formObject.businessIdentifiers, function (o) { return o.type === "VATID" }), 'id', _state.formObject.businessIdentifiers[0].id)
        const gtin = _.get(_state, 'formObject.gtin', _state.formObject._2an)
        dispatch(addRemoveSectionLoadingAction({ name: name, section: section, type: "add" }))
        try {
            await dispatch(uploadProductFileAction({
                businessId: businessId,
                gtin: gtin,
                body: formData,
                type: "other",
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
            <div className='mediaImageOther__images'>
                {value && value[0] && value.map((item, index) => (
                    <React.Fragment key={index}>
                        {
                            ( (item.split('.').pop() == 'jpg') || (item.split('.').pop() == 'JPEG') || (item.split('.').pop() == 'png') || (item.split('.').pop() == 'jfif')) &&
                            <MediaImage
                                key={`otherImage_${item}_${index}`}
                                name={name}
                                value={item}
                                readOnly={readOnly}
                            />
                        }
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

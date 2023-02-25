import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import _ from 'lodash';
/**
 * @standard component
 */
import { InputColorWithLabel } from 'src/components/inputComponents/InputColorWithLabel';
import { InputTextareaWithLabel } from 'src/components/inputComponents/InputTextareaWithLabel';
import { InputTextWithLabel } from 'src/components/inputComponents/InputTextWithLabel';
import { InputSelectDropdown } from 'src/components/inputComponents/InputSelectDropdown';
import { InputSwitchWithLable } from 'src/components/inputComponents/InputSwitchWithLable';
import { InputDateTimePicker } from 'src/components/inputComponents/InputDateTimePicker';
import { InputTextMultiAddWithLabel } from 'src/components/inputComponents/InputTextMultiAddWithLabel';
import { InputMultiSelectWithModal } from 'src/components/inputComponents/InputMultiSelectWithModal';
import { InputEmailMultiAddWithModal } from 'src/components/inputComponents/InputEmailMultiAddWithModal';
import { InputUrlMultiAddWithModal } from 'src/components/inputComponents/InputUrlMultiAddWithModal';
import { MediaImage } from 'src/components/inputComponents/MediaImage';
import { MediaImageOther } from 'src/components/inputComponents/MediaImageOther';
import { MediaVideo } from 'src/components/inputComponents/MediaVideo';
import { MediaVideoUrl } from 'src/components/inputComponents/MediaVideoUrl';
import { Media3dmodelGlb } from 'src/components/inputComponents/Media3dmodelGlb';
import { MediaDocumentPdf } from 'src/components/inputComponents/MediaDocumentPdf';
import { MediaOtherFile } from 'src/components/inputComponents/MediaOtherFile';


/**
 * @specialComponent
*/
import { EcommerceComponent } from 'src/components/specialSchemaComponents/EcommerceComponent';
import { ExternalSources } from 'src/components/specialSchemaComponents/ExternalSources';
import { BusinessIdentifiers } from 'src/components/specialSchemaComponents/BusinessIdentifiers';
import { Restrictions } from 'src/components/specialSchemaComponents/Restrictions';
import { EmailConsentComponent } from 'src/components/specialSchemaComponents/EmailConsentComponent';
import { NutritionalTab } from 'src/pages/products/productProfile/tabs/NutritionalTab';
import { UpidsProduct } from 'src/pages/products/productProfile/tabs/UpidsProduct';
import { Feedback } from 'src/pages/products/productProfile/tabs/Feedback';
import { Versioning } from 'src/pages/products/productProfile/tabs/Versioning';
import { ManufactureTab } from '../specialSchemaComponents/ManufactureTab';


/**
 * @actions 
 */



const FormFieldSchemaRender = (props) => {
    const {
        formItem, formValueObject, formValidationObject, onBlur, onChange, formReadOnly, selectedFormLanguage,
        className, isSmallScreen,
    } = props
    let newFormItem = {
        ...formItem,
        nameUpdated: _.get(formItem, "nameUpdated", formItem.name)
    }

    const dispatch = useDispatch()
    const { t } = useTranslation('common');


    // /**
    const [componentFormItem, setComponentFormItem] = useState({
        loading: false,
        isUsed: false,
        updatedFormItem: {},
    })


    const dependsOnValue = _.get(formValueObject, newFormItem.dependsOnNameUpdated, "")
    useEffect(() => {
        if (newFormItem.updateData && dependsOnValue) {
            handleFormMetaDataItemChange(newFormItem, dependsOnValue)
        }
        else if (newFormItem.updateData) {
            handleFormMetaDataItemChange(newFormItem)
        }
        return () => {
        }
    }, [JSON.stringify(dependsOnValue)])




    const handleFormMetaDataItemChange = async (item, dependsOnValue) => {
        try {
            setComponentFormItem({ ...componentFormItem, loading: true })
            const updatedData = await item.updateData.getUpdatedFormItem({ formItem: item, formValueObject: formValueObject, dispatch, dependsOnValue })
            if (updatedData) {
                setComponentFormItem({ loading: false, isUsed: true, updatedFormItem: updatedData })
            }
            else {
                setComponentFormItem({ ...componentFormItem, loading: false })
            }
        } catch (error) {
            setComponentFormItem({ ...componentFormItem, loading: false })
            console.info("handleFormItemChange", error)
        }
    }





    newFormItem.loading = componentFormItem.loading
    if (componentFormItem.isUsed) {
        newFormItem = { ...newFormItem, ...componentFormItem.updatedFormItem }
    }



    /**
     * @standard component
     */
    if (newFormItem.type === "date") {
        return (
            <>
                <InputDateTimePicker
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    tooltipText={t(newFormItem.tooltipText)}
                    name={newFormItem.nameUpdated}
                    value={formValueObject[newFormItem.nameUpdated]}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "switch") {
        return (
            <>
                <InputSwitchWithLable
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={formValueObject[newFormItem.nameUpdated]}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "select") {
        return (
            <>
                <InputSelectDropdown
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    loading={newFormItem.loading}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    options={newFormItem.options}
                    isMultilingual={newFormItem.isMultilingual}
                    formLanguage={selectedFormLanguage}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen || newFormItem.isMultilingual}
                />
            </>
        )
    }

    if (newFormItem.type === "textarea") {
        if (newFormItem.isMultilingual) {
            return (
                <>
                    <InputTextareaWithLabel
                        key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                        section={newFormItem.section}
                        label={t(newFormItem.label)}
                        placeholder={t(newFormItem.placeholder)}
                        tooltipText={t(newFormItem.tooltipText)}
                        type={newFormItem.type}
                        name={`${newFormItem.nameUpdated}.${selectedFormLanguage}`}
                        readOnly={newFormItem.readOnly || formReadOnly}
                        value={_.get(formValueObject, `${newFormItem.nameUpdated}[${selectedFormLanguage}]`, "")}
                        aiEnable={newFormItem.aiEnable}
                        isAllTouched={formValidationObject.isAllTouched}
                        touched={formValidationObject.touched[newFormItem.nameUpdated]}
                        errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={className}
                        isSmallScreen={isSmallScreen}
                    />
                </>
            )
        }
        else {
            return (
                <>
                    <InputTextareaWithLabel
                        key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                        section={newFormItem.section}
                        label={t(newFormItem.label)}
                        placeholder={t(newFormItem.placeholder)}
                        tooltipText={t(newFormItem.tooltipText)}
                        type={newFormItem.type}
                        name={newFormItem.nameUpdated}
                        readOnly={newFormItem.readOnly || formReadOnly}
                        value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                        isAllTouched={formValidationObject.isAllTouched}
                        touched={formValidationObject.touched[newFormItem.nameUpdated]}
                        errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={className}
                        isSmallScreen={isSmallScreen}
                    />
                </>
            )
        }
    }

    if (newFormItem.type === "text" || newFormItem.type === "number") {
        if (newFormItem.isMultilingual) {
            return (
                <>
                    <InputTextWithLabel
                        key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                        section={newFormItem.section}
                        label={t(newFormItem.label)}
                        placeholder={t(newFormItem.placeholder)}
                        tooltipText={t(newFormItem.tooltipText)}
                        type={newFormItem.type}
                        name={`${newFormItem.nameUpdated}.${selectedFormLanguage}`}
                        readOnly={newFormItem.readOnly || formReadOnly}
                        value={_.get(formValueObject, `${newFormItem.nameUpdated}[${selectedFormLanguage}]`, "")}
                        aiEnable={newFormItem.aiEnable}
                        isAllTouched={formValidationObject.isAllTouched}
                        touched={formValidationObject.touched[newFormItem.nameUpdated]}
                        errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={className}
                        isSmallScreen={isSmallScreen || true}
                    />
                </>
            )
        }
        else {
            return (
                <>
                    <InputTextWithLabel
                        key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                        section={newFormItem.section}
                        label={t(newFormItem.label)}
                        placeholder={t(newFormItem.placeholder)}
                        tooltipText={t(newFormItem.tooltipText)}
                        type={newFormItem.type}
                        name={newFormItem.nameUpdated}
                        readOnly={newFormItem.readOnly || formReadOnly}
                        value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                        isAllTouched={formValidationObject.isAllTouched}
                        touched={formValidationObject.touched[newFormItem.nameUpdated]}
                        errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={className}
                        isSmallScreen={isSmallScreen}
                    />
                </>
            )
        }
    }


    if (newFormItem.type === "color") {
        return (
            <>
                <InputColorWithLabel
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    if (newFormItem.type === "textMultiAdd") {
        return (
            <>
                <InputTextMultiAddWithLabel
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, [])}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )

    }

    
    if (newFormItem.type === "emailMultiAdd") {
        return (
            <>
                <InputEmailMultiAddWithModal
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    modalTitle={newFormItem.modalTitle}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "urlMultiAdd") {
        return (
            <>
                <InputUrlMultiAddWithModal
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    options={newFormItem.options}
                    modalTitle={newFormItem.modalTitle}
                    isMultilingual={newFormItem.isMultilingual}
                    formLanguage={selectedFormLanguage}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    if (newFormItem.type === "multiSelectWithModal") {

        return (
            <>
                <InputMultiSelectWithModal
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    options={newFormItem.options}
                    modalTitle={newFormItem.modalTitle}
                    isMultilingual={newFormItem.isMultilingual}
                    formLanguage={selectedFormLanguage}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    if (newFormItem.type === "mediaImage") {
        return (
            <>
                <MediaImage
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    bottomLabel={t(newFormItem.bottomLabel)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    if (newFormItem.type === "mediaImageOther") {
        return (
            <>
                <MediaImageOther
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    if (newFormItem.type === "video") {
        return (
            <>
                <MediaVideo
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "videoUrl") {
        return (
            <>
                <MediaVideoUrl
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }



    if (newFormItem.type === "media3dmodel") {
        return (
            <>
                <Media3dmodelGlb
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "pdf") {
        return (
            <>
                <MediaDocumentPdf
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    if (newFormItem.type === "mediaOtherFile") {
        return (
            <>
                <MediaOtherFile
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    placeholder={t(newFormItem.placeholder)}
                    tooltipText={t(newFormItem.tooltipText)}
                    type={newFormItem.type}
                    name={newFormItem.nameUpdated}
                    readOnly={newFormItem.readOnly || formReadOnly}
                    value={_.get(formValueObject, newFormItem.nameUpdated, "")}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }


    /**
     * @special components
     */
    if (newFormItem.type === "emailConsent") {
        return (
            <EmailConsentComponent
                key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                section={newFormItem.section}
            />
        )

    }


    if (newFormItem.type === "ecommerce") {
        return (
            <EcommerceComponent
                key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
            />
        )
    }


    if (newFormItem.type === "manufacturerDetails") {
        return (
            <>
                <ManufactureTab
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    componentSchema={newFormItem.componentSchema}
                    // tooltipText={t(newFormItem.tooltipText)}
                    // name={newFormItem.nameUpdated}
                    // value={formValueObject[newFormItem.nameUpdated]}
                    // isAllTouched={formValidationObject.isAllTouched}
                    // touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    // errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    // readOnly={formValueObject[newFormItem.readOnly] || formReadOnly}
                    // onBlur={onBlur}
                    // onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "externalSources") {
        return (
            <>
                <ExternalSources
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    tooltipText={t(newFormItem.tooltipText)}
                    name={newFormItem.nameUpdated}
                    value={formValueObject[newFormItem.nameUpdated]}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    readOnly={formValueObject[newFormItem.readOnly] || formReadOnly}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "businessIdentifiers") {
        return (
            <>
                <BusinessIdentifiers
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    tooltipText={t(newFormItem.tooltipText)}
                    name={newFormItem.nameUpdated}
                    value={formValueObject[newFormItem.nameUpdated]}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    readOnly={formValueObject[newFormItem.readOnly] || formReadOnly}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />
            </>
        )
    }

    if (newFormItem.type === "restrictions") {
        return (
            <>
                <Restrictions
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                    tooltipText={t(newFormItem.tooltipText)}
                    name={newFormItem.nameUpdated}
                    value={formValueObject[newFormItem.nameUpdated]}
                    isAllTouched={formValidationObject.isAllTouched}
                    touched={formValidationObject.touched[newFormItem.nameUpdated]}
                    errorMessage={_.get(formValidationObject, `errorMessage.${newFormItem.nameUpdated}`, "")}
                    readOnly={formValueObject[newFormItem.readOnly] || formReadOnly}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    isSmallScreen={isSmallScreen}
                />

            </>
        )

    }

    if (newFormItem.type === "nutritionalDetails") {
        return (
            <>
                <NutritionalTab
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    label={t(newFormItem.label)}
                />
            </>
        )
    }


    if (newFormItem.type === "upidsProduct") {
        return (
            <>
                <UpidsProduct
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    name={newFormItem.nameUpdated}
                />

            </>
        )
    }

    if (newFormItem.type === "feedback") {
        return (
            <>
                <Feedback
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    name={newFormItem.nameUpdated}
                />

            </>
        )
    }


    if (newFormItem.type === "versioning") {
        return (
            <>
                <Versioning
                    key={`${newFormItem.nameUpdated}_${newFormItem.type}`}
                    section={newFormItem.section}
                    name={newFormItem.nameUpdated}
                />

            </>
        )
    }


    return (
        <>

        </>
    )
}

FormFieldSchemaRender.defaultProps = {
    formFieldList: [],
    formValueObject: {},
    formValidationObject: {
        isAllTouched: false,
        touched: {},
        error: {},
    },
    onBlur: () => { },
    onChange: () => { },
};

export default FormFieldSchemaRender
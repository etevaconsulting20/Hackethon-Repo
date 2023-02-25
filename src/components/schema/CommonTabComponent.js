import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import _ from 'lodash';
import { getValidationErrorForFieldForYup } from 'src/helper/validationYupHelper';
import FormFieldSchemaRender from 'src/components/inputComponents/FormFieldSchemaRender';
import { productFormFieldUpdateAction, formFieldValidationAction } from 'src/redux/products/productsSlice';
import { ProductContext } from 'src/pages/products/ProductsContext';
import CustomTooltip from 'src/components/inputComponents/CustomTooltip';


const CommonTabComponent = (props) => {
    const { productProfileTabInfo } = props
    const { t } = useTranslation('common');

    const formFieldList = _.get(productProfileTabInfo, "fieldList", [])

    const dispatch = useDispatch();
    const productState = useSelector(state => state.products);
    const companyState = useSelector((state) => state.company);
    const { formObject: formValueObject, productFormValidation, isProdEditMode, selectedProductSchema, } = productState


    /**
     * @description product form language
     */
    const productLanguageTabContext = useContext(ProductContext);
    const languageTabIndex = productLanguageTabContext.langTabIndex



    /** 
     * @useEffect 
     */
    useEffect(() => {
        handleDefaultValueObject()
        return () => {
        }
    }, [JSON.stringify(formFieldList)])


    /**
     * @handler
     */
    const handleChangeProductLanguage = (item, activeIndex) => {
        productLanguageTabContext.setLangTabIndex(activeIndex)
    }

    const getSelectedProductFormLanguage_value = () => {
        const languageListValue = {
            formLanguageList: [{ label: "English", value: "en" }],
            selectedFormLanguage: "en"
        }

        let supportedLanguageList = _.get(companyState, 'companyInfo.supportedLanguages', [{ name: "English", code: "en" },])
        supportedLanguageList = supportedLanguageList.map((item) => ({ label: item.name, value: item.code }))
        languageListValue.formLanguageList = supportedLanguageList

        if (languageListValue.formLanguageList && languageListValue.formLanguageList[languageTabIndex]) {
            languageListValue.selectedFormLanguage = languageListValue.formLanguageList[languageTabIndex].value
        }
        return languageListValue
    }
    const { formLanguageList, selectedFormLanguage } = getSelectedProductFormLanguage_value()




    const handleDefaultValueObject = () => {
        const defaultValueObject = {}
        formFieldList && formFieldList[0] && formFieldList.forEach((item) => {
            if (!item.defaultValue && !formValueObject[item.name] && item.type === "date") {
                defaultValueObject[item.name] = (new Date()).toISOString()
            }
            else if (item.defaultValue && !formValueObject[item.name]) {
                defaultValueObject[item.name] = item.defaultValue
            }
        })

        Object.entries(defaultValueObject).forEach(([key, value]) => {
            dispatch(productFormFieldUpdateAction({ name: key, value: value }))
        })
    }


    const handleInputChange = (e) => {
        dispatch(productFormFieldUpdateAction({ name: e.target.name, value: e.target.value }))
    }

    const handleBlurChange = async (e, item) => {
        /** field validation */
        const { nameUpdated, errorMessage } = await getValidationErrorForFieldForYup(item, e.target.value)
        dispatch(formFieldValidationAction({ nameUpdated: nameUpdated, errorMessage: errorMessage, touched: true, }))
    }




    /**
     * @ProductFieldLanguageTab
     */
    let isMultilingualTabCreated = false;
    const handleShowProductFieldMultilingualTab = (item, index) => {
        if (item.isMultilingual && !isMultilingualTabCreated) {
            isMultilingualTabCreated = true;
            return (
                <div key={`multilingualTab_${item.name}_${index}`} style={{ margin: "10px" }} className="d-flex product-profile-navbar align-items-center border-0" >
                    <div className='font-weight-bold mr-3'>
                        Language
                    </div>
                    <div id="navbarProductProfile">
                        <ul className="nav nav-pills">
                            {
                                formLanguageList && formLanguageList[0] && formLanguageList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li className="nav-item">
                                            <a className="nav-link font-weight-normal" role="button"
                                                data-tabselect={item.value == selectedFormLanguage}
                                                onClick={() => handleChangeProductLanguage(item, index)}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    </React.Fragment>
                                ))}
                        </ul>
                    </div>
                </div>
            )
        }
        else if (!item.isMultilingual && isMultilingualTabCreated) {
            isMultilingualTabCreated = false;
            return (
                <div key={`multilingualTab_${item.name}_${index}`} style={{ margin: "10px" }}>

                </div>
            )
        }

    }


    /**
     * @param {*} item 
     * @param {*} index 
     */
    let sectionObject = {
        isCreated: false,
        sectionName: "",
    }
    const handleShowProductFieldSection = (item, index) => {
        const handleShowSectionLoading = () => {
            const sectionLoading = _.get(selectedProductSchema, "selectedTabInfo.sectionLoading", [])
            const getLoadingItem = sectionLoading && sectionLoading[0] && sectionLoading.find((element) => element.section === item.section)

            if (getLoadingItem) {
                return true
            }
            return false
        }


        if (item.section && (item.section !== sectionObject.sectionName || !sectionObject.isCreated)) {
            sectionObject = {
                isCreated: true,
                sectionName: item.section,
            }
            return (
                <>
                    <div
                        key={`formFieldSection_${item.name}_${index}`}
                        className='formFieldSection__start mb-3'
                        style={{ marginTop: "1rem" }}
                    >
                        <span className='tab-section-info'>
                            {item.section}
                        </span>
                        {item.sectionTooltipText &&
                            <CustomTooltip
                                tooltipContent={<p>{t(item.sectionTooltipText)}</p>}
                            />
                        }
                        {handleShowSectionLoading() &&
                            <div className="spinner-border spinner-border-sm text-danger ml-2" role="status"></div>
                        }
                    </div>
                </>
            )
        }
        else if (!item.section && sectionObject.isCreated) {
            sectionObject = {
                isCreated: false,
                sectionName: "",
            }
            return (
                <div
                // style={{ marginBottom: "1rem" }}
                >

                </div>
            )
        }
    }

    /**
     * @param {*} item 
     * @param {*} index 
     */
    let subsectionObject = {
        isCreated: false,
        subsectionName: "",
    }
    const handleShowProductFieldSubsection = (item, index) => {
        if (item.subsection && (item.subsection !== subsectionObject.subsectionName || !subsectionObject.isCreated)) {
            subsectionObject = {
                isCreated: true,
                subsectionName: item.subsection,
            }
            return (
                <>
                    <div
                        key={`formFieldSection_${item.name}_${index}`}
                        className='formFieldSubsection__start mb-3'
                        style={{ marginTop: "1rem" }}
                    >
                        <span className='tab-subsection-info'>
                            {item.subsection}
                        </span>
                        {item.subSectionTooltipText &&
                            <CustomTooltip
                                tooltipContent={<p>{t(item.subSectionTooltipText)}</p>}
                            />
                        }
                    </div>
                </>
            )
        }
        else if (!item.subsection && subsectionObject.isCreated) {
            subsectionObject = {
                isCreated: false,
                subsectionName: "",
            }
            return (
                <div
                // style={{ marginBottom: "1rem" }}
                >

                </div>
            )
        }
    }

    return (
        <div className='row'>
            {formFieldList && formFieldList[0] && formFieldList.map((item, index) => (
                <React.Fragment key={`formFieldSchemaRender_main_${item.name}_${index}`}>
                    {handleShowProductFieldMultilingualTab(item, index)}
                    {handleShowProductFieldSection(item, index)}
                    {handleShowProductFieldSubsection(item, index)}
                    <FormFieldSchemaRender
                        key={`formFieldSchemaRender${item.name}_${index}`}
                        index={index}
                        formItem={item}
                        formReadOnly={!isProdEditMode}
                        formValueObject={formValueObject}
                        formValidationObject={productFormValidation}
                        onBlur={(e) => handleBlurChange(e, item)}
                        onChange={handleInputChange}
                        formLanguageList={formLanguageList}
                        selectedFormLanguage={selectedFormLanguage}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default CommonTabComponent
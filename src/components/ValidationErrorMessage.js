import React from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSelectTabInfoFromProductTabStructuredSchema_tabName } from 'src/helpers/helpers';
import { getErrorTabListWithFields } from 'src/helpers/validationYupHelper';
import { selectProductTabInfoAction } from 'src/redux/products/productsSlice';
import Modal from "react-bootstrap/Modal";
import { StCloseButton } from './StCloseButton';
import _ from 'lodash';

export default function ValidationErrorMessage(props) {
    const { validationData, validationModelHandler } = props
    const { t } = useTranslation('common');

    const dispatch = useDispatch()
    const _productsState = useSelector((state) => state.products, shallowEqual);
    const { productFormValidation, selectedProductSchema } = _productsState;

    const errorFieldList = _.get(productFormValidation, "errorFieldList", [])    // errorTabListWithFields: [
    //     /** 
    //       {
    //         parentTab: "",
    //         tabName: "",
    //         fieldList: []
    //       }
    //     */
    //   ]

    const errorTabListWithFields = getErrorTabListWithFields(errorFieldList)


    const handleClose = () => {
        validationModelHandler(false)
    }

    const handleFieldListLable = (fieldList) => {
        //    const labelList = fieldList.fieldList.map((value, index)=>listArray.push(value.label.replace('_',' ')))
        const labelList = fieldList.fieldList.map((item) => t(item.label))
        return labelList.join(", ")
    }

    const handleNavigateToSpecificTab = (tabName) => {
        const productTabStructuredSchema = selectedProductSchema.productTabStructuredSchema
        const { fieldList } = getSelectTabInfoFromProductTabStructuredSchema_tabName(productTabStructuredSchema, tabName)
        dispatch(selectProductTabInfoAction({
            tabName: tabName,
            fieldList: fieldList
        }))
        validationModelHandler(false)
    }



    return (
        <>
            <Modal size="lg" show={validationData.showModal} onHide={handleClose} centered={true}>
                <Modal.Header >
                    <div style={{ position: 'absolute', right: 10 }}>
                        <StCloseButton text={t("Close")} onClick={() => handleClose()}></StCloseButton>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ display: 'block', textAlign: 'center', color: '#131e27', opacity: 1, fontWeight: 'bold', fontSize: 18, }}>
                    <span className='mb-2'>{t("Please add valid information")}</span>
                    <table className="table validationTable">
                        <tr className='text-left'>
                            <th className='tableHead'>{t('Tab name')}</th>
                            <th className='tableHead'>{t('Fields')}</th>
                        </tr>
                        {errorTabListWithFields && errorTabListWithFields.map((values, index) => {
                            return (
                                <tr key={index} className="border-0">
                                    <td className='text-left'>
                                        <a style={{ fontSize: '16px' }} 
                                            onClick={() => handleNavigateToSpecificTab(values.tabName)}
                                            className='font-weight-normal text-decoration-none' role='button'
                                        >
                                            {t(values.tabName)}
                                        </a>
                                    </td>
                                    <td className='text-left'>
                                        <label style={{ fontSize: '16px' }} className='font-weight-normal' for="name">{handleFieldListLable(values)}</label>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>


                </Modal.Body>
                {/* <Modal.Footer>
                    <StSquareButton text={t("Yes")} onClick={() => handleClose()} ></StSquareButton>
                    <StCancelSquareButton text={t("Ok")} onClick={() => handleClose()}></StCancelSquareButton>
                </Modal.Footer> */}
            </Modal>

        </>
    )
}

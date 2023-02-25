import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { StCloseButton } from 'src/components/CloseButton';
import { ButtonSquare } from 'src/components/ButtonSquare';
import { clearProductFormAction } from 'src/redux/slice/productSlice';
import { getEanCodeAction, sendEmailNotificationAction } from 'src/redux/thunks/productThunk';
import { InputTextWithLabelSmall } from 'src/components/InputTextWithLabelSmall';

function FishSuccessModal(props) {
    const { t } = useTranslation('common');
    const { isShowModel, handleClose } = props

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const productState = useSelector(state => state.product)
    const { productFormData, saveFishProductResponse } = productState

    const [loading, setLoading] = useState(false)
    const [fishModalData, setFishModalData] = useState({
        email: "",
    })

    const handleCloseModal = () => {
        dispatch(clearProductFormAction())
        handleClose()
        navigate("/");
    }




    //   // // Formik Hooks----------------------------------------------------------
    //   const formik = useFormik({
    //     // initial value
    //     initialValues: {
    //       username: "",
    //       password: "",
    //     },

    //     // vlidation-----------------------------------------------------------
    //     validationSchema: Yup.object({
    //       username: Yup.string()
    //         .required(t("Required"))
    //         .email(t("Please enter a valid email")),

    //       password: Yup.string()
    //         .required(t("Required")),


    //     }),
    //     // submit function
    //     onSubmit: async (values) => {
    //       try {
    //         setLoader(true);
    //         const res = await dispatch(login(values)).unwrap();
    //         setLoader(false);
    //         navigate("/app");
    //       } catch (error) {
    //         setLoader(false);
    //       }
    //     },
    //   });
    //   // // destructuring variable & function from formik Object 
    //   const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, resetForm } = formik


    const handleSave = async () => {
        try {
            setLoading(true)

            // const actionResponse = await dispatch(getEanCodeAction(`https://upids.io/${saveFishProductResponse.upidsId}`))
            // const model = {
            //     from: "UPIDS PDM <support@secondthought.fi>",
            //     to: fishModalData.email,
            //     subject: `UPIDS tracker for fish batch ${productFormData.batchIdentifier}`,
            //     htmlBody: `<html>
            //                 <body>
            //                     <p>Hi, you are receiving this email as notification of CFP id ${productFormData.batchIdentifier} which has digital twin with UPID id ${saveFishProductResponse.upidsId}.</p>

                                
            //                     <p>  
            //                         <img src='${actionResponse.payload}'  title="Logo" width="200" height="87" alt="image"/>
            //                     </P>
            //                    <p> https://upids.io/${saveFishProductResponse.upidsId} </P>

            //                     <p>If any questions rise, please contact support@secondthought.fi.</P>
            //                 </body>
            //             <html>`,
            // }

            const model={
                recipientEmail: fishModalData.email,
                dynamic_template_data: {
                    cfpBatchId : productFormData.batchIdentifier,
                    upidsId : saveFishProductResponse.upidsId,
                  }
            }

            await dispatch(sendEmailNotificationAction(model)).unwrap()
            setLoading(false)
            handleCloseModal()
        } catch (error) {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setFishModalData({
            ...fishModalData,
            [e.target.name]: e.target.value
        })
    }


    return (
        <Modal size="md" centered={true} backdrop="static" show={isShowModel} onHide={handleCloseModal} >
            <Modal.Header >
                <div style={{ position: 'absolute', right: 10 }}>
                    <StCloseButton text={t("Close")} onClick={() => handleCloseModal()}></StCloseButton>
                </div>
            </Modal.Header>
            <Modal.Body style={{ fontWeight: 'normal' }}>
                <div>
                    <InputTextWithLabelSmall
                        label="upids ID"
                        name="upidsID"
                        type="text"
                        readOnly={true}
                        value={saveFishProductResponse.upidsId}
                    />

                    <InputTextWithLabelSmall
                        label="email"
                        name="email"
                        type="email"
                        value={fishModalData.email}
                        onChange={handleInputChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
                <ButtonSquare
                    text={t("Save")}
                    onClick={() => handleSave()}
                    loading={loading}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default FishSuccessModal
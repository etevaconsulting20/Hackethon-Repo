import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { productFormFieldUpdateAction, formValidationAction } from 'src/redux/slice/productSlice';
import { getFishProductFormBatchIdentifier } from 'src/helpers/productHelper';
import { getFishProductSchemaInReducer, getarticleIdentifierAction, saveProductFishAction } from "src/redux/thunks/productThunk";
import FishSuccessModal from './FishSuccessModal';
import { Spinner } from 'src/components/Spinner';
import FormFieldSchemaRender from 'src/components/FormFieldSchemaRender';


function FishForm() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { auth, product } = state
  const { formSchemaLoading, loading, productFormData, productFormValidation, fishProductSchema } = product

  const [showFishSuccessModal, setShowFishSuccessModal] = useState(false)


  useEffect(() => {
    dispatch(getFishProductSchemaInReducer())
    dispatch(getarticleIdentifierAction())
    handleFormInitChange()
    return () => {
    }
  }, [])


  useEffect(() => {
    const batchIdentifier = getFishProductFormBatchIdentifier(product.productFormData)
    dispatch(productFormFieldUpdateAction({ name: "batchIdentifier", value: batchIdentifier }))
    return () => {

    }
  }, [JSON.stringify(product.productFormData)])


  const handleFormInitChange = () => {
    /** facilityId as cfpId */
    const businessIdentifierList = _.get(auth, "authUserInfo.jwtTokenDecode.businessIdentifiers", [])
    const cfpIdBusinessIdentifier = businessIdentifierList.find(item => item.type === "CFPID")
    if (cfpIdBusinessIdentifier && cfpIdBusinessIdentifier.id) {
      dispatch(productFormFieldUpdateAction({
        name: "facilityId",
        value: cfpIdBusinessIdentifier.id
      }))
    }
  }

  const handleInputChange = (e) => {
    dispatch(productFormFieldUpdateAction({ name: [e.target.name], value: e.target.value }))
  }

  const handleBlurChange = (e) => {
    dispatch(formValidationAction({ name: [e.target.name], value: true }))
  }


  const handleSaveForm = async () => {
    try {
      dispatch(formValidationAction({ isAllTouched: true }))
      if (!_.isEmpty(productFormValidation.error)) {
        return;
      }

      await dispatch(saveProductFishAction()).unwrap()
      setShowFishSuccessModal(true)
    } catch (error) {

    }
  }


  const handleShowCloseFishSuccesModal = () => {
    setShowFishSuccessModal(!showFishSuccessModal)
  }

  const handleValidationObject = (validationError) => {
    dispatch(formValidationAction({ validationError }))
  }

  const handleDefaultValueObject = (defaultValueObject) => {
    Object.entries(defaultValueObject).forEach(([key, value]) => {
      dispatch(productFormFieldUpdateAction({ name: key, value: value }))
    })
  }


  return (
    <div>
      <div className={`p-2 container-fluid d-flex flex-row justify-content-between bg-primary text-white`}  >
        <h4>Fish form</h4>
      </div>
      <div className='container mt-3'>
        {formSchemaLoading && loading && <Spinner />}
        <div className="row m-1">
          <FormFieldSchemaRender
            formFieldList={fishProductSchema}
            formValueObject={productFormData}
            formValidationObject={productFormValidation}
            setValidationErrorObject={handleValidationObject}
            setDefaultValue={handleDefaultValueObject}
            onBlur={handleBlurChange}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-danger" onClick={handleSaveForm} disabled={productFormData.isDisableSaveFishForm}>
            Save
          </button>
        </div>

        <FishSuccessModal
          isShowModel={showFishSuccessModal}
          handleClose={handleShowCloseFishSuccesModal}
        />
      </div>
    </div>
  )
}

export default FishForm
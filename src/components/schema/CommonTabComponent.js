import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { getValidationErrorForFieldForYup } from "src/helpers/validationYupHelper";
import FormFieldSchemaRender from "src/components/inputComponents/FormFieldSchemaRender";
import {
  productFormFieldUpdateAction,
  formFieldValidationAction,
} from "src/redux/slice/homeSlice";
// import { ProductContext } from 'src/pages/products/ProductsContext';
import CustomTooltip from "src/components/inputComponents/CustomTooltip";
import { changeProdEditMode, changeFormObject, formSaveValidationAction } from "src/redux/slice/homeSlice";
import { addSpecificFormDataInfoAction, removeSpecificFormDataInfoAction, updateSpecificFormDataInfoAction } from "src/redux/thunks/homeThunk";
import { useNavigate } from "react-router-dom";
import { getValidationErrorObjectForYup } from "src/helpers/validationYupHelper";
import { toast } from "react-toastify";

const CommonTabComponent = (props) => {
  const { isUpdate } = props;
  const { t } = useTranslation("common");

  const params = useParams()

  const homeState = useSelector((state) => state.home);
  const navigate = useNavigate();

  const formFieldList = _.get(
    homeState,
    "selectedProductSchema.productFlattenSchema",
    []
  );
  //   const formFieldList = _.get(productProfileTabInfo, "fieldList", [])

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.home);
  const {
    formObject: formValueObject,
    productFormValidation,
    isProdEditMode,
    selectedProductSchema,
  } = productState;

  /**
   * @useEffect
   */
  useEffect(() => {
    handleDefaultValueObject();
    return () => { };
  }, [JSON.stringify(formFieldList)]);

  const handleDefaultValueObject = () => {
    const defaultValueObject = {};
    formFieldList &&
      formFieldList[0] &&
      formFieldList.forEach((item) => {
        if (
          !item.defaultValue &&
          !formValueObject[item.name] &&
          item.type === "date"
        ) {
          defaultValueObject[item.name] = new Date().toISOString();
        } else if (item.defaultValue && !formValueObject[item.name]) {
          defaultValueObject[item.name] = item.defaultValue;
        }
      });

    Object.entries(defaultValueObject).forEach(([key, value]) => {
      dispatch(productFormFieldUpdateAction({ name: key, value: value }));
    });
  };

  const handleInputChange = (e) => {
    dispatch(
      productFormFieldUpdateAction({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleBlurChange = async (e, item) => {
    /** field validation */
    const { nameUpdated, errorMessage } =
      await getValidationErrorForFieldForYup(item, e.target.value);
    dispatch(
      formFieldValidationAction({
        nameUpdated: nameUpdated,
        errorMessage: errorMessage,
        touched: true,
      })
    );
  };

  /**
   * @param {*} item
   * @param {*} index
   */
  let sectionObject = {
    isCreated: false,
    sectionName: "",
  };
  const handleShowProductFieldSection = (item, index) => {
    const handleShowSectionLoading = () => {
      const sectionLoading = _.get(
        selectedProductSchema,
        "selectedTabInfo.sectionLoading",
        []
      );
      const getLoadingItem =
        sectionLoading &&
        sectionLoading[0] &&
        sectionLoading.find((element) => element.section === item.section);

      if (getLoadingItem) {
        return true;
      }
      return false;
    };

    if (
      item.section &&
      (item.section !== sectionObject.sectionName || !sectionObject.isCreated)
    ) {
      sectionObject = {
        isCreated: true,
        sectionName: item.section,
      };
      return (
        <>
          <div
            key={`formFieldSection_${item.name}_${index}`}
            className="formFieldSection__start mb-3"
            style={{ marginTop: "1rem" }}
          >
            <span className="tab-section-info">{item.section}</span>
            {item.sectionTooltipText && (
              <CustomTooltip
                tooltipContent={<p>{t(item.sectionTooltipText)}</p>}
              />
            )}
            {handleShowSectionLoading() && (
              <div
                className="spinner-border spinner-border-sm text-danger ml-2"
                role="status"
              ></div>
            )}
          </div>
        </>
      );
    } else if (!item.section && sectionObject.isCreated) {
      sectionObject = {
        isCreated: false,
        sectionName: "",
      };
      return (
        <div
        // style={{ marginBottom: "1rem" }}
        ></div>
      );
    }
  };

  /**
   * @param {*} item
   * @param {*} index
   */
  let subsectionObject = {
    isCreated: false,
    subsectionName: "",
  };
  const handleShowProductFieldSubsection = (item, index) => {
    if (
      item.subsection &&
      (item.subsection !== subsectionObject.subsectionName ||
        !subsectionObject.isCreated)
    ) {
      subsectionObject = {
        isCreated: true,
        subsectionName: item.subsection,
      };
      return (
        <>
          <div
            key={`formFieldSection_${item.name}_${index}`}
            className="formFieldSubsection__start mb-3"
            style={{ marginTop: "1rem" }}
          >
            <span className="tab-subsection-info">{item.subsection}</span>
            {item.subSectionTooltipText && (
              <CustomTooltip
                tooltipContent={<p>{t(item.subSectionTooltipText)}</p>}
              />
            )}
          </div>
        </>
      );
    } else if (!item.subsection && subsectionObject.isCreated) {
      subsectionObject = {
        isCreated: false,
        subsectionName: "",
      };
      return (
        <div
        // style={{ marginBottom: "1rem" }}
        ></div>
      );
    }
  };

  const handleEdit = () => {
    dispatch(changeProdEditMode(!homeState.isFormEditMode))
  }

  const handleSave = async () => {
    debugger
    try {
      // const productFlattenSchema = _.get(homeState, `selectedProductSchema.productFlattenSchema`, [])
      // const { errorMessageObject, errorFieldList } = await getValidationErrorObjectForYup(productFlattenSchema, formValueObject)
      await dispatch(updateSpecificFormDataInfoAction(formValueObject)).unwrap()
      dispatch(changeFormObject({}))
      navigate('/app/home/list')

      // if (!_.isEmpty(errorMessageObject) || !_.isEmpty(errorFieldList)) {
      //   await dispatch(updateSpecificFormDataInfoAction(formValueObject)).unwrap()
      //   dispatch(changeFormObject({}))
      //   navigate('/app/home/list')
      // }
      // else {
      //   dispatch(formSaveValidationAction({ errorMessageObject: errorMessageObject, errorFieldList: errorFieldList, }))
      //   setTimeout(() => {
      //     toast.error("Please validate information.", "Information", 2000);
      //   }, 10);
      // }
    } catch (error) {

    }
  }

  const handleAdd = async () => {
    try {
      const productFlattenSchema = _.get(homeState, `selectedProductSchema.productFlattenSchema`, [])
      const { errorMessageObject, errorFieldList } = await getValidationErrorObjectForYup(productFlattenSchema, formValueObject)


      await dispatch(addSpecificFormDataInfoAction(formValueObject)).unwrap()
      dispatch(changeFormObject({}))
      navigate('/app/home/list')

      // if (!_.isEmpty(errorMessageObject) || !_.isEmpty(errorFieldList)) {
      //   await dispatch(addSpecificFormDataInfoAction()).unwrap()
      //   dispatch(changeFormObject({}))
      //   navigate('/app/home/list')
      // }
      // else {
      //   dispatch(formSaveValidationAction({ errorMessageObject: errorMessageObject, errorFieldList: errorFieldList, }))
      //   setTimeout(() => {
      //     toast.error("Please validate information.", "Information", 2000);
      //   }, 10);
      // }
    } catch (error) {

    }
  }


  const handleDelete = async () => {
    try {
      await dispatch(removeSpecificFormDataInfoAction(params.id)).unwrap()
      dispatch(changeFormObject({}))
      navigate("/app/home/list")
    } catch (error) {

    }
  }


  const handleCancel = async () => {
    navigate('/app/home/list')
  }


  return (
    <>
      <div className="row " >
        {/* <div className="col-9">
            
        </div>*/}
        <div className="buttons-edit">
          {
            !isUpdate && <button className="btn btn-primary m-1" onClick={handleAdd}>Add</button>
          }
          
          {
            isUpdate &&
            <>
              <div style={{
                padding: 10
              }}></div>
              
              <button className="btn btn-primary m-1" onClick={handleSave}>Save</button>
              <button className="btn btn-primary m-1" onClick={handleEdit}>Edit</button>
              <button className="btn btn-primary m-1" onClick={handleDelete}>Delete</button>
            </>
          }
          <button className="btn btn-primary m-1" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      <div className="row">
        {formFieldList &&
          formFieldList[0] &&
          formFieldList.map((item, index) => (
            <React.Fragment
              key={`formFieldSchemaRender_main_${item.name}_${index}`}
            >
              {handleShowProductFieldSection(item, index)}
              {handleShowProductFieldSubsection(item, index)}
              <FormFieldSchemaRender
                key={`formFieldSchemaRender${item.name}_${index}`}
                index={index}
                formItem={item}
                formReadOnly={!isProdEditMode && isUpdate}
                formValueObject={formValueObject}
                formValidationObject={productFormValidation}
                onBlur={(e) => handleBlurChange(e, item)}
                onChange={handleInputChange}
              />
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default CommonTabComponent;

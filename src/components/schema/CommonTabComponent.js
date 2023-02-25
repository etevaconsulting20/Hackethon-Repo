import React, { useContext, useEffect } from "react";
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

const CommonTabComponent = (props) => {
  const { productProfileTabInfo } = props;
  const { t } = useTranslation("common");

  const homeState = useSelector((state) => state.home);
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
    return () => {};
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

  return (
    <>
      <div className="row">
        <div className="col-9">
          {/* <h3 className="text-center">Form</h3> */}
        </div>
        <div className="col-3">
          <button className="btn btn-primary m-1">Save</button>
          <button className="btn btn-primary m-1">Edit</button>
          <button className="btn btn-primary m-1">Cancel</button>
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
                formReadOnly={!isProdEditMode}
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

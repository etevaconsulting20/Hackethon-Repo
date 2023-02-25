import * as yup from "yup";
import _ from 'lodash';



export const validateYupSchemaObject = async (yupSchemaObject, formData) => {
  try {
    await yupSchemaObject.validate(formData, { abortEarly: false })
    return { errorMessageObject: {} }
  }
  catch (error) {
    const errorMessageArray = error.inner;
    const errorMessageObject = {}

    errorMessageArray && errorMessageArray[0] && errorMessageArray.forEach((item) => {
      let itemPath
      try {
        const pathArray = JSON.parse(item.path)
        itemPath = pathArray[0]
      } catch (error) {
        itemPath = item.path
      }
      _.set(errorMessageObject, itemPath, item.message)
    })
    return { errorMessageObject: errorMessageObject, }
  }
}

export function createYupSchema(schema, config) {
  const { nameUpdated, validationType, validations = [] } = config;
  const newValidations = [
    ...validations,
    {
      type: "nullable",
      params: ["Please enter valid information"],
    }
  ]

  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  newValidations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[nameUpdated] = validator;
  return schema;
}

/**
 * get validation error object for yup validation
 * @param {*} formFlattenJsonArray 
 * @param {*} formData 
 * @returns { errorMessageObject, errorFieldList }
 */
export const getValidationErrorObjectForYup = async (formFlattenJsonArray, formData) => {
  const updatedFormFlattenJsonArray = formFlattenJsonArray.map((item) => {
    const newItem = {
      ...item,
      nameUpdated: item.nameUpdated ? item.nameUpdated : item.name
    }
    return newItem
  })

  try {
    formData = formData ? formData : {}
    if (updatedFormFlattenJsonArray && updatedFormFlattenJsonArray[0]) {
      const newFormData = {}
      updatedFormFlattenJsonArray.forEach((item) => {
        const value = _.get(formData, item.nameUpdated)
        newFormData[item.nameUpdated] = value
      })

      const yepSchema = updatedFormFlattenJsonArray.reduce(createYupSchema, {});
      const validateSchema = yup.object().shape(yepSchema);
      await validateSchema.validate(newFormData, { abortEarly: false })
    }
    return { errorMessageObject: {}, errorFieldList: [] }
  } catch (error) {
    const errorMessageArray = error.inner;
    const errorMessageObject = {}
    const errorFieldList = []

    errorMessageArray && errorMessageArray[0] && errorMessageArray.forEach((item) => {
      let itemPath
      try {
        const pathArray = JSON.parse(item.path)
        itemPath = pathArray[0]
      } catch (error) {
        itemPath = item.path
      }
      const errorFieldObject = updatedFormFlattenJsonArray.find((item) => item.nameUpdated === itemPath)
      errorFieldList.push(errorFieldObject)
      _.set(errorMessageObject, itemPath, item.message)
    })
    return { errorMessageObject: errorMessageObject, errorFieldList: errorFieldList }
  }
}

/**
 * @param {*} fieldObject 
 * @param {*} fieldValue 
 * @returns {nameUpdated, errorMessage}
 */
export const getValidationErrorForFieldForYup = async (fieldObject, fieldValue) => {
  const newFieldValue = {}
  const nameUpdated = fieldObject.nameUpdated ? fieldObject.nameUpdated : fieldObject.name;
  _.set(newFieldValue, nameUpdated, fieldValue)
  const { errorMessageObject } = await getValidationErrorObjectForYup([fieldObject], newFieldValue)
  return { nameUpdated: nameUpdated, errorMessage: _.get(errorMessageObject, nameUpdated, "") }
}

export const getErrorTabListWithFields = (errorFormFieldflattenJsonArray) => {
  const tabListWithFields = [
    /**
      {
        parentTab: "",
        tabName: "tabNameTabName",
        fieldList: []
      }
    */
  ]

  errorFormFieldflattenJsonArray && errorFormFieldflattenJsonArray[0] && errorFormFieldflattenJsonArray.forEach((item) => {
    /** add tab */
    if (!_.find(tabListWithFields, (tab) => tab.tabName === item.tabName)) {
      tabListWithFields.push(
        {
          parentTab: item.parentTab,
          tabName: item.tabName,
          fieldList: []
        }
      )
    }


    /** adding field in tabs */
    const tabIndex = _.findIndex(tabListWithFields, (tab) => tab.tabName === item.tabName)
    tabListWithFields[tabIndex].fieldList.push(item)
  })

  return tabListWithFields
}
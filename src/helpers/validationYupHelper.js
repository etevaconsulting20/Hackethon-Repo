import * as yup from "yup";

export function createYupSchema(schema, config) {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    // console.log(type, params);
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
}

/**
 * get validation error object for yup validation
 * @param {*} formJsonArray 
 * @param {*} formData 
 * @returns errorObject
 */
export const getValidationErrorObjectForYup = async (formJsonArray, formData) => {
  try {
    formData = formData ? formData : {}
    if (formJsonArray && formJsonArray[0]) {
      const yepSchema = formJsonArray.reduce(createYupSchema, {});
      const validateSchema = yup.object().shape(yepSchema);
      await validateSchema.validate(formData, { abortEarly: false })
    }
    return {}
  } catch (error) {
    const errorMessageArray = error.inner;
    const errorObject = {}

    errorMessageArray && errorMessageArray[0] && errorMessageArray.forEach((item) => {
      errorObject[item.path] = item.message
    })
    return errorObject
  }

}
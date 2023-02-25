import React, { useEffect, useState } from "react";

const updateCompleteTouchedObj = (valueObject, value) => {
  let result = {};
  for (var key in valueObject) {
    result[key] = value;
  }
  return result;
};

const CustomForm = (props) => {
  const { onSubmit, validate, intialValues } = props;

  const [touched, updateTouched] = useState({
    ...updateCompleteTouchedObj(intialValues, false),
  });
  const [values, updateValues] = useState({ ...intialValues });
  const [errors, updateErrors] = useState({});
  useEffect(()=>{
    updateValues({...intialValues})
  },[intialValues])
  const focusErrorField = (errors) => {
    let errorsArray = Object.keys(errors);
    if (document.getElementsByName(errorsArray[0])[0]) {
      document.getElementsByName(errorsArray[0])[0].scrollIntoView();
    }
  };
  const handleInput = (e) => {
    let fieldName = e.target.name;
    let oldValues = { ...values };
    let oldTouchedValues = { ...touched };
    oldTouchedValues[fieldName] = true;

    oldValues[fieldName] = e.target.value;
    let currentErrors = validate(oldValues);
    updateErrors({ ...currentErrors });
    updateValues(oldValues);
  };
  const seFieldValue = (key, value) => {
    let fieldName = key;
    let oldValues = { ...values };
    let oldTouchedValues = { ...touched };
    oldTouchedValues[fieldName] = true;
    oldValues[fieldName] = value;
    let currentErrors = validate(oldValues);
    updateErrors({ ...currentErrors });
    updateValues(oldValues);
  };
  const customSubmit = () => {
    let currentErrors = validate(values);
    updateTouched(updateCompleteTouchedObj(values, true));
    updateErrors({ ...currentErrors });
    if (Object.keys(currentErrors).length > 0) {
      focusErrorField(currentErrors);
    } else {
      updateTouched(updateCompleteTouchedObj(values, false));
      onSubmit(values);
    }
  };

  return props.children({
    seFieldValue,
    onSubmit: customSubmit,
    handleInput,
    values,
    errors,
    touched,
  });
};

// class Test extends React.Component {
//   render() {
//     return this.props.children();
//   }
// }

export default CustomForm;

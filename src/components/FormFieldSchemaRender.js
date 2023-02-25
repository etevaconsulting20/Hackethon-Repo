import React, { useEffect } from 'react';
import { getValidationErrorObjectForYup } from 'src/helpers/validationYupHelper';
import { InputTextWithLabel } from 'src/components/InputTextWithLabel';
import { InputSelectDropdown } from 'src/components/InputSelectDropdown';
import { InputDateTimePicker } from 'src/components/InputDateTimePicker';


const FormFieldSchemaRender = (props) => {

    const { formFieldList, formValueObject, formValidationObject, onBlur, onChange, setValidationErrorObject, setDefaultValue } = props


    useEffect(() => {
        getDefaultValue()
        return () => {
        }
    }, [JSON.stringify(formFieldList)])



    useEffect(() => {
        handleValidation()
        return () => {
        }
    }, [JSON.stringify(formValueObject), JSON.stringify(formFieldList)])


    const getDefaultValue = () => {
        const defaultValueObj = {}
        formFieldList && formFieldList[0] && formFieldList.forEach((item) => {
            if (!item.defaultValue && !formValueObject[item.name] && item.type === "date") {
                defaultValueObj[item.name] = (new Date()).toISOString()
            }
            else if (item.defaultValue && !formValueObject[item.name]) {
                defaultValueObj[item.name] = item.defaultValue
            }
        })

        setDefaultValue(defaultValueObj)
    }


    const handleValidation = async () => {
        await validateYupSchema()
    }

    const validateYupSchema = async () => {
        if (formFieldList && formFieldList[0]) {
            const validationError = await getValidationErrorObjectForYup(formFieldList, formValueObject)
            setValidationErrorObject(validationError)
            return validationError
        }
    }




    return (
        <>
            {formFieldList && formFieldList[0] && formFieldList.map((item, index) => {
                if (item.type === "text" || item.type === "number") {
                    return (
                        <InputTextWithLabel
                            key={`${item.name}_${index}`}
                            label={item.label}
                            placeholder={item.placeholder}
                            type={item.type}
                            name={item.name}
                            readOnly={item.readOnly}
                            value={formValueObject[item.name]}
                            isAllTouched={formValidationObject.isAllTouched}
                            touched={formValidationObject.touched[item.name]}
                            error={formValidationObject.error[item.name]}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )
                }
                else if (item.type === "select") {
                    return (
                        <InputSelectDropdown
                            key={`${item.name}_${index}`}
                            label={item.label}
                            placeholder={item.placeholder}
                            type={item.type}
                            name={item.name}
                            readOnly={item.readOnly}
                            value={formValueObject[item.name]}
                            selectDropdownOptions={item.options}
                            isAllTouched={formValidationObject.isAllTouched}
                            touched={formValidationObject.touched[item.name]}
                            error={formValidationObject.error[item.name]}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )
                } else if (item.type === "date") {
                    return (
                        <InputDateTimePicker
                            key={`${item.name}_${index}`}
                            label={item.label}
                            name={item.name}
                            value={formValueObject[item.name]}
                            isAllTouched={formValidationObject.isAllTouched}
                            touched={formValidationObject.touched[item.name]}
                            error={formValidationObject.error[item.name]}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )
                }
            })
            }

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
    setDefaultValue: () => { },
    setValidationErrorObject: () => { },
};

export default FormFieldSchemaRender
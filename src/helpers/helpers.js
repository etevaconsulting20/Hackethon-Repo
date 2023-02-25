import _ from 'lodash'


export const getSpecificFlattenSchemaPath_ObjectForItemName = (productFlattenSchema, itemNameUpdated) => {
    let fieldObject = {}
    let fieldPath = ''
  
    productFlattenSchema.forEach((item, index) => {
      if (item.nameUpdated === itemNameUpdated) {
        fieldObject = item
        fieldPath = `[${index}]`
      }
    })
  
    return { fieldObject, fieldPath, }
  }
  
  
  
  export const getSpecificStructuredSchemaPath_ObjectForItemName = (productSchema, itemName) => {
    // const componentItem = {
    //     name: '_2an',
    // }
    let fieldObject = {}
    let schemaPath = ''
  
    let productSchemaIndex = null;
    let childTabIndex = null;
      let fieldIndex = null;
      const commonComponentSchema =[]
  
  
    const objectHandle = (item) => {
      if (item.childTabList && item.childTabList[0]) {
        item.childTabList.some((element, cIndex) => {
          if (fieldIndex !== null) {
            return true
          }
          childTabIndex = cIndex
          objectHandle(element);
        })
      }
      else if (item.fieldList && item.fieldList[0]) {
        item.fieldList.some((fieldItem, fIndex) => {
          if (fieldItem.name === itemName) {
            const componentfieldItem = commonComponentSchema.find((componentItem) => componentItem.name === itemName)
            if (componentfieldItem) {
              fieldObject = { ...fieldItem, ...componentfieldItem }
            }
            else {
              fieldObject = fieldItem
            }
            fieldIndex = fIndex
            return true
          }
        })
      }
    }
  
    if (productSchema && productSchema[0] && itemName) {
      productSchema.some((item, sIndex) => {
        if (fieldIndex !== null) {
          return true
        }
        productSchemaIndex = sIndex;
        childTabIndex = null;
        fieldIndex = null;
  
        objectHandle(item)
      })
    }
    if (productSchemaIndex !== null && childTabIndex !== null && fieldIndex !== null) {
      schemaPath = `[${productSchemaIndex}].childTabList[${childTabIndex}].fieldList[${fieldIndex}]`
    }
    else if (productSchemaIndex !== null && fieldIndex !== null) {
      schemaPath = `[${productSchemaIndex}].fieldList[${fieldIndex}]`
    }
    const fieldListPath = `fieldList[${fieldIndex}]`
  
    return { fieldObject, schemaPath, fieldListPath }
  }
  
  
  /**
   * @param {*} productSchema 
   * @returns updatedNameFlattenSchema
   */
  const getMergedComponent_updatedNameValue_flattenJson = (productSchema) => {
      let updatedFlattenSchema = []
      const commonComponentSchema= []
  
    const objectHandle = (fieldObject, parentName) => {
      if (fieldObject.tabName && fieldObject.type) {
        const nameUpdated = parentName ? `${parentName}.${fieldObject.name}` : `${fieldObject.name}`
        let newItemObject = { ...fieldObject, nameUpdated: nameUpdated }
  
        const componentfieldItem = commonComponentSchema.find((componentItem) => componentItem.name === fieldObject.name)
        if (componentfieldItem) {
          newItemObject = { ...newItemObject, ...componentfieldItem }
        }
  
        updatedFlattenSchema.push(newItemObject)
      }
      else {
        Object.entries(fieldObject).map(([key, value]) => {
          const newParentName = parentName ? `${parentName}.${key}` : `${key}`
          if (value?.length) {
            value.map(itemObject => {
              objectHandle(itemObject, newParentName)
            })
          } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            objectHandle(value, newParentName)
          }
        })
      }
    }
  
    productSchema.map((fieldObject) => {
      return objectHandle(fieldObject, "")
    })
  
    updatedFlattenSchema = updatedFlattenSchema.map((fieldItem) => {
      if (fieldItem.dependsOnName) {
        const dependsOnObject = updatedFlattenSchema.find((item) => item.name === fieldItem.dependsOnName)
        const newFieldItem = { ...fieldItem, dependsOnNameUpdated: dependsOnObject.nameUpdated }
        return newFieldItem
      }
      return fieldItem
    })
  
  
    return updatedFlattenSchema
  }
  
  
  /**
   * @param {*} selectedProductSchema 
   * @returns converted product schema
   */
  export const getProduct_flatten_TabStructured_Schema = (productSchema) => {
    const productFlattenSchema = getMergedComponent_updatedNameValue_flattenJson(productSchema)
  
    const productTabStructuredSchema = [
      /**
      {
        parentTab: "parentTabName",
        childTabList: [
          {
            tabname: "",
            fieldList: []
          }
        ]
      },
      {
        tabName: "tabNameTabName",
        fieldList: []
      }
      */
    ]
  
  
    productFlattenSchema && productFlattenSchema[0] && productFlattenSchema.forEach((item) => {
  
      if (item.parentTab && item.tabName) {
        /** adding ParentTabs (main menu tab) */
        if (!_.find(productTabStructuredSchema, (tab) => tab.tabName === item.parentTab)) {
          productTabStructuredSchema.push(
            {
              tabName: item.parentTab,
              childTabList: [
                // {
                //   tabname: "",
                //   fieldList: []
                // }
              ]
            }
          )
        }
  
        /** adding childTabs (submenu tab) */
        const parentTabIndex = _.findIndex(productTabStructuredSchema, (tab) => tab.tabName === item.parentTab)
        if (!_.find(productTabStructuredSchema[parentTabIndex].childTabList, (tab) => tab.tabName === item.tabName)) {
          productTabStructuredSchema[parentTabIndex].childTabList.push(
            {
              tabName: item.tabName,
              fieldList: []
            }
          )
        }
  
        /** adding field in childTabs */
        const childTabIndex = _.findIndex(productTabStructuredSchema[parentTabIndex].childTabList, (tab) => tab.tabName === item.tabName)
        productTabStructuredSchema[parentTabIndex].childTabList[childTabIndex].fieldList.push(item)
      } else if (item.tabName) {
        /** add tab */
        if (!_.find(productTabStructuredSchema, (tab) => tab.tabName === item.tabName)) {
          productTabStructuredSchema.push(
            {
              tabName: item.tabName,
              fieldList: []
            }
          )
        }
  
  
        /** adding field in tabs */
        const tabIndex = _.findIndex(productTabStructuredSchema, (tab) => tab.tabName === item.tabName)
        productTabStructuredSchema[tabIndex].fieldList.push(item)
      }
    })
  
    return { productFlattenSchema, productTabStructuredSchema }
  }
  
  
//   export const getSelectTabInfoFromProductTabStructuredSchema_tabName = (productTabStructuredSchema, tabName) => {
//     const selectTabInfo = { tabName: "", fieldList: [] }
  
//     if (productTabStructuredSchema && productTabStructuredSchema[0]) {
//       productTabStructuredSchema.forEach((item) => {
//         if (item && item.childTabList && item.childTabList[0]) {
//           item.childTabList.forEach((element) => {
//             if (element && element.tabName === tabName) {
//               selectTabInfo.tabName = tabName
//               selectTabInfo.fieldList = element.fieldList
//             }
//           })
//         }
//         else if (item && item.tabName === tabName) {
//           selectTabInfo.tabName = tabName
//           selectTabInfo.fieldList = item.fieldList
//         }
//       })
//     }
  
//     return selectTabInfo
//   }
  
//   /**
//    * return product Schema based on productType
//    */
//   export const getProductSchemaBaseOnProductType = (productSchemaType) => {
//     if (productSchemaType === FOOD_BEWERAGE) {
//       return foodBewerage;
//     }
//     else if (productSchemaType === TEXTILE) {
//       return textile;
//     }
//     else if (productSchemaType === SOFTWARE) {
//       return software;
//     }
//     else {
//       return [];
//     }
//   }
  
  
//   /**
//    * @param {*} productTabStructuredSchema 
//    * @param {*} productCurrentTabName 
//    * @returns  {productFirstTabName, productLastTabName, productCurrentTabName, productPreviousTabName, productnextTabName,}
//    */
//   export const getProductProfileFirstLastPreviousNextTabName = (productTabStructuredSchema, productCurrentTabName) => {
//     let isproductCurrentTabNameMatch = false
//     const productPreviousNextTabName = {
//       productFirstTabName: "",
//       productLastTabName: "",
//       productCurrentTabName: productCurrentTabName,
//       productPreviousTabName: "",
//       productnextTabName: "",
//     }
  
//     if (productTabStructuredSchema && productCurrentTabName) {
//       productTabStructuredSchema.forEach((item) => {
//         if (item.childTabList) {
//           item.childTabList.forEach((element) => {
//             if (!productPreviousNextTabName.productFirstTabName) {
//               productPreviousNextTabName.productFirstTabName = element.tabName;
//             }
//             productPreviousNextTabName.productLastTabName = element.tabName;
  
  
//             if (isproductCurrentTabNameMatch && !productPreviousNextTabName.productnextTabName) {
//               productPreviousNextTabName.productnextTabName = element.tabName;
//             }
//             if (element.tabName === productCurrentTabName) {
//               isproductCurrentTabNameMatch = true
//             }
//             if (!isproductCurrentTabNameMatch) {
//               productPreviousNextTabName.productPreviousTabName = element.tabName;
//             }
//           })
//         }
//         else {
//           if (!productPreviousNextTabName.productFirstTabName) {
//             productPreviousNextTabName.productFirstTabName = item.tabName;
//           }
//           productPreviousNextTabName.productLastTabName = item.tabName;
  
//           if (isproductCurrentTabNameMatch && !productPreviousNextTabName.productnextTabName) {
//             productPreviousNextTabName.productnextTabName = item.tabName;
//           }
//           if (item.tabName === productCurrentTabName) {
//             isproductCurrentTabNameMatch = true
//           }
//           if (!isproductCurrentTabNameMatch) {
//             productPreviousNextTabName.productPreviousTabName = item.tabName;
//           }
//         }
//       })
//     }
//     return productPreviousNextTabName
//   }
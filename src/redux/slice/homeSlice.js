import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { getNewsfeedAction, getProductTemplateSchemaAction, getSpecificIdInfoAction, getAllDataAction } from "../thunks/homeThunk";

const initialState = {
  isLoading: false,
  newsFeedList: [],
  data: [],

  formListData: [],
  formObject: {},
  isFormEditMode: false,
  productFormValidation: {
    isAllTouched: false,
    touched: {},
    errorMessage: {},
    errorFieldList: [],
  },
  selectedProductSchema: {
    // formType: '', // add/update
    productSchemaType: "",
    productSchema: [],
    productFlattenSchema: [],
    productTabStructuredSchema: [],
    // selectedTabInfo: {
    //   tabName: "",
    //   fieldList: [],
    //   sectionLoading: [
    //     // { name: "primary[0]", section: "Product profile Images" },
    //   ],
    // }
  },

};


const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {

    formSaveValidationAction: (state, action) => {
      const { errorMessageObject, isAllTouched, errorFieldList } = action.payload;
      _.set(state.productFormValidation, `errorMessage`, errorMessageObject);
      _.set(state.productFormValidation, `isAllTouched`, true);

      if (errorFieldList) {
        _.set(state.productFormValidation, `errorFieldList`, errorFieldList);
      }

    },

    changeProdEditMode: (state, action) => {
      state.isConfirmFlag = false;
      state.isProdEditMode = action.payload;
    },


    changeFormObject: (state, action) => {
      state.formObject = action.payload;
    },

    /** form field */
    productFormFieldUpdateAction: (state, action) => {
      const { name, value } = action.payload
      _.set(state.formObject, `${name}`, value);
    },



    formFieldValidationAction: (state, action) => {
      const { nameUpdated, errorMessage, touched } = action.payload;

      _.set(state.productFormValidation.touched, `${nameUpdated}`, touched ? touched : false);

      if (errorMessage) {
        _.set(state.productFormValidation.errorMessage, `${nameUpdated}`, errorMessage);
      }
      else {
        _.set(state.productFormValidation.errorMessage, `${nameUpdated}`, "");
      }
    },

  },
  extraReducers: {
    [getNewsfeedAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewsfeedAction.fulfilled]: (state, action) => {
      const sortedData = _.orderBy(action.payload, ['createdDate._seconds'], ['desc']);
      state.newsFeedList = sortedData;
      state.isLoading = false;
    },
    [getNewsfeedAction.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getProductTemplateSchemaAction.pending]: (state) => {
    },
    [getProductTemplateSchemaAction.fulfilled]: (state, action) => {
      const { productSchema, productFlattenSchema, productTabStructuredSchema } = action.payload
      state.selectedProductSchema.productSchema = productSchema
      state.selectedProductSchema.productFlattenSchema = productFlattenSchema
      state.selectedProductSchema.productTabStructuredSchema = productTabStructuredSchema
    },
    [getProductTemplateSchemaAction.rejected]: (state, action) => {
      state.isLoading = false;
    },




    [getAllDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllDataAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.formListData = action.payload
    },
    [getAllDataAction.rejected]: (state, action) => {
      state.isLoading = false;
    },


    [getSpecificIdInfoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getSpecificIdInfoAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.formObject = action.payload
    },
    [getSpecificIdInfoAction.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },


});

export default homeSlice;


export const {
  changeProdEditMode, changeFormObject, productFormFieldUpdateAction, formFieldValidationAction, formSaveValidationAction
} = homeSlice.actions;

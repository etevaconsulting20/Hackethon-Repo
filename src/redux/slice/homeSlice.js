import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { getNewsfeedAction, getProductTemplateSchemaAction } from "../thunks/homeThunk";

const initialState = {
  isLoading: false,
  newsFeedList: [],
  data: [],

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
      console.log("action.payload", action.payload)
      const { productSchema, productFlattenSchema, productTabStructuredSchema } = action.payload
      state.selectedProductSchema.productSchema = productSchema
      state.selectedProductSchema.productFlattenSchema = productFlattenSchema
      state.selectedProductSchema.productTabStructuredSchema = productTabStructuredSchema
    },
    [getProductTemplateSchemaAction.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },


});

export default homeSlice;


export const {
  productFormFieldUpdateAction, formFieldValidationAction
} = homeSlice.actions;

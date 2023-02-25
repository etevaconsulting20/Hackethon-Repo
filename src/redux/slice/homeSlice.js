import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { getNewsfeedAction } from "../thunks/homeThunk";

const initialState = {
  isLoading: false,
  newsFeedList: [],
  data: [],
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
  },
});

export default homeSlice;


export const {
  productFormFieldUpdateAction, formFieldValidationAction
} = homeSlice.actions;

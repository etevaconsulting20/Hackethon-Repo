import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import I18n from "../locales/index";
import { t } from 'src/locales/localeHelper';


import {
  getFishProductSchemaInReducer, sendEmailNotificationAction, getarticleIdentifierAction, saveProductFishAction,
} from "../thunks/productThunk";


const initialState = {
  formSchemaLoading: false,
  loading: false,
  isLoading: false,
  // --------------------
  customersData: [],
  allDevicesOfCustomerList: [],
  error: null,
  groupsWithDevices: [],
  deletedGroup: "",
  addGroup: "",
  addDeviceToGroup: "",
  deletedDeviceFromGroup: "",
  usernameError: "",
  // -----------------------

  /** fish product */
  fishProductSchema: [],
  productFormValidation: {
    isAllTouched: false,
    touched: {},
    error: {},
  },

  productFormData: {
    isDisableSaveFishForm: true,
  },
  articleIdentifierList: [],

  saveFishProductResponse: {
    id: "",
    message: "",
    upidsId: ""
  },
  scannedCode: "12345",
  latitude: "1",
  longitude: "2",
};


const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    productFormFieldUpdateAction: (state, action) => {
      const { name, value } = action.payload
      state.productFormData[name] = value
    },
    clearProductFormAction: (state) => {
      state.productFormData = initialState.productFormData;
      state.productFormValidation = initialState.productFormValidation;
    },
    formValidationAction: (state, action) => {
      const { name, value, isAllTouched, validationError } = action.payload;
      if (name) {
        state.productFormValidation.touched[name] = value;
      }
      if (isAllTouched !== undefined) {
        state.productFormValidation.isAllTouched = isAllTouched;
      }
      if (validationError !== undefined) {
        state.productFormValidation.error = validationError;
      }
    },
    insertScannedCodeAction: (state, action) => {
      state.scannedCode = action.payload;
    },
    insertLatitudeAction: (state, action) => {
      state.latitude = action.payload;
    },
    insertLongitudeAction: (state, action) => {
      state.longitude = action.payload;
    },
  },
  extraReducers: {
    [getFishProductSchemaInReducer.pending]: (state, action) => {
      state.fishProductSchema = initialState.fishProductSchema;
      state.formSchemaLoading = true;
    },
    [getFishProductSchemaInReducer.fulfilled]: (state, action) => {
      state.formSchemaLoading = false;
      state.fishProductSchema = action.payload;
    },
    [getFishProductSchemaInReducer.rejected]: (state, action) => {
      state.formSchemaLoading = false;
      state.fishProductSchema = initialState.fishProductSchema;
      setTimeout(() => {
        toast.error("Something went wrong while loading form", "Information", 2000);
      }, 10);
    },


    [sendEmailNotificationAction.pending]: (state, action) => {
      state.loading = true;
    },
    [sendEmailNotificationAction.fulfilled]: (state, action) => {
      state.loading = false;
      // state.customersData = action.payload.data;
    },
    [sendEmailNotificationAction.rejected]: (state, action) => {
      state.loading = false;
    },


    [getarticleIdentifierAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getarticleIdentifierAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.articleIdentifierList = action.payload;
      if (action.payload && action.payload[0]) {
        state.productFormData.isDisableSaveFishForm = false;
      } else {
        setTimeout(() => {
          toast.error("No CFP master product found, please contact support", "Information", 2000);
        }, 10);
      }

    },
    [getarticleIdentifierAction.rejected]: (state, action) => {
      state.loading = false;
      setTimeout(() => {
        toast.error("Something went wrong", "Information", 2000);
      }, 10);
    },



    [saveProductFishAction.pending]: (state) => {
      state.isLoading = true;
      state.saveFishProductResponse = initialState.saveFishProductResponse;
    },
    [saveProductFishAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.saveFishProductResponse = action.payload;
    },
    [saveProductFishAction.rejected]: (state, action) => {
      state.saveFishProductResponse = initialState.saveFishProductResponse;
      state.isLoading = false;
    },

  },
});

export const { productFormFieldUpdateAction, clearProductFormAction, formValidationAction, insertScannedCodeAction, insertLatitudeAction, insertLongitudeAction } = productSlice.actions;

export default productSlice;

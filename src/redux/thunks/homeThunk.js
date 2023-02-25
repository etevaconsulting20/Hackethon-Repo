import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "src/helpers/axiosInterceptor";
import I18n from "i18next";
import testSchema1 from "src/helpers/productFormSchema/testSchema1";
import { getProduct_flatten_TabStructured_Schema } from "src/helpers/helpers";

export const getNewsfeedAction = createAsyncThunk(
  "home/getNewsfeedAction",
  async (arg, thunkApi) => {
    try {
      const response = await getAxios().get(
        `/upids/cms/list/all?category=satelliteNewsfeed&language=${I18n.language}`
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue("error");
    }
  }
);





/** get product template */
export const getProductTemplateSchemaAction = createAsyncThunk(
  "product/getProductTemplateSchemaAction",
  async (arg, thunkApi) => {
    try {

      // const response = await getAxios().get(
      //   `services/product/template/filter/use?name=${productType}`
      // );
      // const productSchema = response.data.template;
      // const productSchema = getProductSchemaBaseOnProductType(productType);
      const { productFlattenSchema, productTabStructuredSchema } = getProduct_flatten_TabStructured_Schema(testSchema1)
      const responseData = { productSchema: testSchema1, productFlattenSchema, productTabStructuredSchema, }
      return responseData;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);



const dummyData = [
  {
      id: "1",
      firstName: "Bharat",
      lastName: "Sonwane",
      gender: "male"
  },
  {
      id: "2",
      firstName: "Kavita",
      lastName: "Savant",
      gender: "Female"
  },
  {
      id: "3",
      firstName: "Kunal",
      lastName: "Kamat",
      gender: "Male"
  },
]


export const getAllDataAction = createAsyncThunk(
  "product/getAllDataAction",
  async (arg, thunkApi) => {
    try {


      // const response = await getAxios().get(
      //   `services/product/template/filter/use?name=${productType}`
      // );
      const response = {
        data: dummyData
      }
      return response.data
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getSpecificIdInfoAction = createAsyncThunk(
  "product/getSpecificIdInfoAction",
  async (arg, thunkApi) => {
    try {


      // const response = await getAxios().get(
      //   `services/product/template/filter/use?name=${productType}`
      // );
      const response = {
        data: {

        }
      }
      return response.data
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);




export const addSpecificFormDataInfoAction = createAsyncThunk(
  "product/addSpecificFormDataInfoAction",
  async (arg, thunkApi) => {
    try {


      // const response = await getAxios().get(
      //   `services/product/template/filter/use?name=${productType}`
      // );
      const response = {
        data: {

        }
      }
      await thunkApi.dispatch(getAllDataAction())
      return response.data
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);



export const removeSpecificFormDataInfoAction = createAsyncThunk(
  "product/removeSpecificFormDataInfoAction",
  async (arg, thunkApi) => {
    try {
      // const { id } = arg


      // const response = await getAxios().get(
      //   `services/product/template/filter/use?name=${productType}`
      // );
      const response = {
        data: {

        }
      }
      // await thunkApi.dispatch(getAllDataAction())
      return response.data
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

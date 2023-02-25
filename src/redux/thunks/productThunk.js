import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "src/helpers/axiosInterceptor";
import dayjs from "dayjs";
import { t } from 'src/locales/localeHelper';
import { toast } from "react-toastify";
import { fishSchema } from "src/helpers/productFormSchema/fishSchema";




export const getFishProductSchemaInReducer = createAsyncThunk(
  "product/getFishProductSchemaInReducer",
  async (arg, thunkApi) => {
    try {

      const responseJson = await Promise.all(fishSchema.map(async (item) => {
        if (item.type === "select" && item.optionsFromApi) {
          let response

          if (item.optionsFromApi.specificBaseUrl) {
            response = await getAxios(item.optionsFromApi.url).get();
          } else {
            response = await getAxios().get(`/upids/search/masterdata`);
          }
          let data = response.data

          if (item.optionsFromApi.isUpdateData) {
            data = await item.optionsFromApi.updateData(data)
          }
          return { ...item, options: data }
        }
        return item;
      }));

      return responseJson;
    } catch (error) {
      thunkApi.rejectWithValue("error");
    }
  }
);



export const getEanCodeAction = createAsyncThunk(
  "product/getEanCodeAction",
  async (arg, thunkApi) => {
    try {
      const payload = {
        type: "EAN-128",
        url: arg,
      }
      const response = await getAxios().post(
        `/services/label/`,
        payload
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue("error");
    }
  }
);


export const sendEmailNotificationAction = createAsyncThunk(
  "product/sendEmailNotificationAction",
  async (arg, thunkApi) => {
    try {
      // const response = await getAxios().post(`/services/email/notification`,arg);
    
      const response = await getAxios().post(`services/email/template?id=satellite-new-cfp-batch&lang=en`,arg);
     
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue("error");
    }
  }
);


export const getarticleIdentifierAction = createAsyncThunk(
  "product/getarticleIdentifierAction",
  async (arg, thunkApi) => {
    try {
      const response = await getAxios().get(
        `/upids/search/masterdata?value=CFP&orderby=createdD`
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue("error");
    }
  }
);


export const saveProductFishAction = createAsyncThunk(
  "product/saveProductFishAction",
  async (arg, thunkApi) => {
    try {
      const timeZone = dayjs().format("Z")

      const state = thunkApi.getState()
      const { auth, product } = state
      const { productFormData, articleIdentifierList } = product
      const { batchIdentifier, facilityId, catchDate, species, amount, batchNumber } = productFormData

      const businessIdentifiers = auth.authUserInfo.jwtTokenDecode.businessIdentifiers.find(item => item.type === "VATID")
      const articleIdentifier = articleIdentifierList[0]

      const payload = {
        targetEnvironment: "test",
        batchIds: [
          {
            type: "cfp",
            id: batchIdentifier
          }
        ],
        articleIdentifier: articleIdentifier._2an,
        _2an: articleIdentifier._2an,
        sse: "302",
        timezone: timeZone,
        businessIdentifiers: [
          {
            id: businessIdentifiers.id, //"{{user's business id'}}"
            type: "VATID"
          }
        ],
        associatedDocuments: [
          {
            documentType: "cfp",
            documentData: {
              cfp: {
                species: species,
                amount: amount,
                facilityId: facilityId,
                catchDate: catchDate,
                batchNumber: batchNumber,
              }
            }
          }
        ]
      }

      const response = await getAxios().put(
        `/upids/product`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


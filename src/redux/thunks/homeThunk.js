import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "src/helpers/axiosInterceptor";
import I18n from "i18next";

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

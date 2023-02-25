import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "src/helpers/axiosInterceptor";

export const getAllUsersData = createAsyncThunk(
  "user/getData",
  async (model, thunkApi) => {
    try {
      let res = await getAxios().get("/app/user");
      return res;
    } catch (error) {
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/myProfile",
  async (model, thunkApi) =>{
    try{
      let res = await getAxios().get("/iam/user");
      return res;
    }catch(error){
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const addUserAction = createAsyncThunk(
  "user/postData",
  async (model, thunkApi) => {
    try {
      let res = await getAxios().post(
        `/app/customer/${model.customerId}/users`,
        model
      );
      return res;
    } catch (error) {
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSpecificUserDetailsById = createAsyncThunk(
  "user/getSpecificUserDetails",
  async (model, thunkApi) => {
    try {
      let res = await getAxios().get(`/app/user/${model}`);
      return res;
    } catch (error) {
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateSpecificUserData",
  async (model, thunkApi) => {
    try {
      let res = await getAxios().put(`/app/user/${model.id}`, model);
      return res;
    } catch (error) {
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSpecificUserDevices = createAsyncThunk(
  "user/getSpecificDeviceDetails",
  async (model, thunkApi) => {
    try {
      let res = await getAxios().get(`/app/user/${model}/devices`);
      return res.data;
    } catch (error) {
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteSpecificUserByCustomerId = createAsyncThunk(
  "user/deleteSpecificUserByCustomerId",
  async (model, thunkApi) => {
    try {
      let res = await getAxios().delete(
        `/app/customer/${model.customerId}/users/${model.userId}`
      );
      return res.data;
    } catch (error) {
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

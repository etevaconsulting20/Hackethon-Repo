import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "src/helpers/axiosInterceptor";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { DeviceUUID } from "device-uuid";
import { t } from "src/locales/localeHelper";
import { toast } from "react-toastify";
import { auth } from "src/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseAuthPromise = new Promise((res, rej) => {
  onAuthStateChanged(auth, (currentUser) => {
    // console.log(currentUser);
    if (currentUser) {
      res(currentUser);
    } else {
      rej("user not found");
    }
  });
});

export const getAuthStatusAction = createAsyncThunk(
  "auth/getAuthStatusAction",
  async (arg, thunkApi) => {
    try {
      return firebaseAuthPromise;
      // const payload = {
      //   jwtToken: "",
      //   jwtTokenDecode: {},
      //   isAuthTokenChecked: true,
      // };

      // let jwtToken = Cookies.get("jwtToken");
      // if (!jwtToken) {
      //   const responseData = await thunkApi
      //     .dispatch(getTokenFromRefreshToken())
      //     .unwrap();
      //   jwtToken = responseData.jwtToken;
      // }

      // if (jwtToken) {
      //   const jwtTokenDecode = jwt_decode(jwtToken);
      //   payload.jwtToken = jwtToken;
      //   payload.jwtTokenDecode = jwtTokenDecode;
      // }

      // return payload;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getTokenFromRefreshToken = createAsyncThunk(
  "auth/getTokenFromRefreshToken",
  async (arg, thunkApi) => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        const uuid = new DeviceUUID().get();
        const response = await getAxios().post(`/iam/user/refreshtoken`, {
          deviceId: uuid,
          refreshToken: refreshToken,
        });

        return { jwtToken: response.token };
      }
      return null;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
export const signupAction = createAsyncThunk(
  "auth/signupAction",
  async (arg, thunkApi) => {
    try {
      // const uuid = new DeviceUUID().get();

      // const requestModel = {
      //   email: arg.username,
      //   password: arg.password,
      //   rememberme: arg.isKeepLoggedIn,
      //   deviceId: uuid,
      // };

      const user = await createUserWithEmailAndPassword(
        auth,
        arg.username,
        arg.password,
      );
      return user;
      // console.log({ user });

      // const response = await getAxios().post("iam/user/token", requestModel);
      // const { token, refreshToken } = response.data;

      // const jwtTokenDecode = jwt_decode(token);
      // Cookies.set("jwtToken", token, { expires: 7 });

      // if (refreshToken) {
      //   // const refreshTokenDecode = jwt_decode(refreshToken)
      //   Cookies.set("refreshToken", refreshToken, { expires: 90 });
      // }

      // return { jwtToken: token, jwtTokenDecode, isAuthTokenChecked: true };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const signinAction = createAsyncThunk(
  "auth/signinAction",
  async (arg, thunkApi) => {
    try {
      // const uuid = new DeviceUUID().get();

      // const requestModel = {
      //   email: arg.username,
      //   password: arg.password,
      //   rememberme: arg.isKeepLoggedIn,
      //   deviceId: uuid,
      // };

      const user = await signInWithEmailAndPassword(
        auth,
        arg.username,
        arg.password,
      );
      return user;
      // console.log({ user });

      // const response = await getAxios().post("iam/user/token", requestModel);
      // const { token, refreshToken } = response.data;

      // const jwtTokenDecode = jwt_decode(token);
      // Cookies.set("jwtToken", token, { expires: 7 });

      // if (refreshToken) {
      //   // const refreshTokenDecode = jwt_decode(refreshToken)
      //   Cookies.set("refreshToken", refreshToken, { expires: 90 });
      // }

      // return { jwtToken: token, jwtTokenDecode, isAuthTokenChecked: true };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

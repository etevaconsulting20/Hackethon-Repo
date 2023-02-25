import { createSlice } from "@reduxjs/toolkit";
import { getAuthStatusAction, signinAction } from "../thunks/authThunk";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { t } from "src/locales/localeHelper";
import { auth } from "src/config/firebaseConfig";

const initialState = {
  loading: false,
  isAuthTokenChecked: false,
  isAuth: false,
  authUserInfo: {
    // email: "",
    jwtToken: "",
    jwtTokenDecode: "",
  },
  userFirebaseInfo: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    signOutAction: (state) => {
      auth.signOut();
      state = initialState;
      // state.isAuth = false;
      // state.authUserInfo = initialState.authUserInfo;
      // try {
      //   Cookies.remove("jwtToken");
      //   Cookies.remove("refreshToken");
      // } catch (error) {}
    },
  },

  extraReducers: {
    [getAuthStatusAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAuthStatusAction.fulfilled]: (state, action) => {
      if (action.payload) {
        const { jwtToken, jwtTokenDecode } = action.payload;
        state.isAuth = true;
        state.isAuthTokenChecked = true;
        state.authUserInfo.jwtToken = jwtToken;
        state.authUserInfo.jwtTokenDecode = jwtTokenDecode;
        state.userFirebaseInfo = action.payload;
      } else {
        // state.isAuth = false;
        state.authUserInfo = initialState.authUserInfo;
      }
      state.isLoading = false;
    },
    [getAuthStatusAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthTokenChecked = true;
      // state.isAuth = false;
      state.authUserInfo = initialState.authUserInfo;
    },

    [signinAction.pending]: (state, action) => {
      state.loading = true;
    },
    [signinAction.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { jwtToken, jwtTokenDecode } = action.payload;
        state.isAuth = true;
        state.authUserInfo.jwtToken = jwtToken;
        state.authUserInfo.jwtTokenDecode = jwtTokenDecode;
        toast.success(t("nofn-msg-to-login"), "", 2000);
      } else {
        // state.isAuth = false;
        state.authUserInfo = initialState.authUserInfo;
      }
    },
    [signinAction.rejected]: (state, action) => {
      state.loading = false;
      setTimeout(() => {
        toast.error("Login failed", "Information", 2000);
      }, 10);
    },
  },
});

export const { signOutAction } = authSlice.actions;

export default authSlice;

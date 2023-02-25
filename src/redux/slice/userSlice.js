import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getAllUsersData,
  addUserAction,
  getSpecificUserDetailsById,
  updateUserById,
  getSpecificUserDevices,
  deleteSpecificUserByCustomerId,
  getUserProfile,
} from "src/redux/thunks/userThunk";

const initialState = {
  isLoading: false,
  usersData: [],
  loading: false,
  specificUserData: [],
  error: null,
  usernameError: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // Get All Users Data
    [getAllUsersData.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsersData.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersData = action.payload.data;
    },
    [getAllUsersData.rejected]: (state, action) => {
      state.loading = false;
    },

    //Get user Profile details

    [getUserProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.usersData = action.payload.data;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // add new user action

    [addUserAction.pending]: (state, action) => {
      state.loading = true;
    },
    [addUserAction.fulfilled]: (state, action) => {
      toast.success("User Added Successfully", "Information", 2000);
      state.loading = false;
      state.usersData = action.payload.data;
    },
    [addUserAction.rejected]: (state, action) => {
      state.loading = false;
      state.usernameError = action.payload.response.data;
    },

    // Get Specific user details by id

    [getSpecificUserDetailsById.pending]: (state, action) => {
      state.loading = true;
    },
    [getSpecificUserDetailsById.fulfilled]: (state, action) => {
      state.loading = false;
      state.specificUserData = action.payload.data;
    },
    [getSpecificUserDetailsById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Specific user by id
    [updateUserById.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserById.fulfilled]: (state, action) => {
      setTimeout(() => {
        toast.success("User Updated Successfully", "Information", 2000);
      }, 10);
      state.loading = false;
      state.usersData = action.payload.data;
    },
    [updateUserById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get Specific user devices details by id
    [getSpecificUserDevices.pending]: (state, action) => {
      state.loading = true;
    },
    [getSpecificUserDevices.fulfilled]: (state, action) => {
      state.loading = false;
      // state.data = action.payload;
    },
    [getSpecificUserDevices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete Specific User By Customer-Id
    [deleteSpecificUserByCustomerId.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSpecificUserByCustomerId.fulfilled]: (state, action) => {
      setTimeout(() => {
        toast.success("User Deleted successfully", "Information", 2000);
      }, 10);
      state.loading = false;
      // state.data = action.payload;
    },
    [deleteSpecificUserByCustomerId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice;

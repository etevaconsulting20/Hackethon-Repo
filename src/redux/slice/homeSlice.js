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
  reducers: {},
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

import { configureStore, compose } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";
// import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    auth: authSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  // composeEnhancers: composeEnhancers(),
});
export default store;

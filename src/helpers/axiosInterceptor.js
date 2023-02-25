import axios from "axios";
import Cookies from "js-cookie";
// import store from "src/redux/store";
import { appConfig } from "src/config/appConfig";

/**
 * Interceptors are a feature that allows an application to intercept requests or responses before they are handled by the .then() or the .catch().
 * There are 2 type of interceptor 1) interceptors.request   &&   2) interceptors.response
 * Both types of Axios interceptors accept two functions.
 * The first function of the request interceptor modifies the request if it’s a valid, successful request,
 * the second function handles when the request is invalid and throws an error.
 **/

export const getAxios = (specificBaseUrl) => {
  const instance = axios.create();
  if (specificBaseUrl) {
    instance.defaults.baseURL = specificBaseUrl;
  } else {
    instance.defaults.baseURL = appConfig.SERVER_URL;
  }

  // interceptors Request------------------------------------
  instance.interceptors.request.use(
    async (config) => {
      const token = Cookies.get('jwtToken')

      if (token) {
        config.headers = {
          ...config.headers,
          // token: token,
          authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    async (error) => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  );

  //validating the token expiration scenario --------------------------
  // interceptors Response------------------------------------
  instance.interceptors.response.use(
    async (Response) => {
      return Response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        //dispatch action using store to show token expire popup-----
        Cookies.remove("token")
        // window.location.pathname = "#/login";
        window.location = "#/login";
        return new Promise((resolve, reject) => {
          reject(error);
        });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return instance;
};

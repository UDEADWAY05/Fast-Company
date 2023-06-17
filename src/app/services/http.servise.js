import axios from "axios";
import { toast } from "react-toastify";
import configFiles from "../../config.json";

const http = axios.create({
  baseURL: configFiles.apiEndpoint
});

http.interceptors.request.use(
  function (config) {
    if (configFiles.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    };
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => {
      return ({ ...data[key] });
    })
    : [];
}

http.interceptors.response.use(
  (res) => {
    if (configFiles.isFireBase) {
      res.data = { content: transformData(res.data) };
      console.log(res.data);
    };
    return res;
  },
  function (error) {
    const expectedErrors = error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
    if (!expectedErrors) {
      toast.error("Somithng was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;

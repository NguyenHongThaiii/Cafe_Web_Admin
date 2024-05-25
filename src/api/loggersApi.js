import axiosClient from "./axiosClient";

const loggersAPi = {
  getAll(params) {
    const url = "/loggers";
    return axiosClient.get(url, {
      params,
    });
  },
  getCount(params) {
    const url = "/loggers/count";
    return axiosClient.get(url, {
      params,
    });
  },
};

export default loggersAPi;

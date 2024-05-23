import axiosClient from "./axiosClient";

const rolesApi = {
  getAll(params) {
    const url = "/roles";
    return axiosClient.get(url, { params });
  },
};

export default rolesApi;

import axiosClient from "./axiosClient";

const purposesApi = {
  getAll(params) {
    const url = "/purposes";
    return axiosClient.get(url, { params });
  },
  getCount(params) {
    const url = "/purposes/count";
    return axiosClient.get(url, { params });
  },
  getBySlug(slug) {
    const url = `/purposes/${slug}`;
    return axiosClient.get(url);
  },
  create(body) {
    const url = `/purposes`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id, body) {
    const url = `/purposes/id/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(id) {
    const url = `/purposes/id/${id}`;
    return axiosClient.delete(url);
  },
};

export default purposesApi;

import axiosClient from "./axiosClient";

const kindsApi = {
  getAll(params) {
    const url = "/kinds";
    return axiosClient.get(url, { params });
  },
  getCount(params) {
    const url = "/kinds/count";
    return axiosClient.get(url, { params });
  },
  getBySlug(slug) {
    const url = `/kinds/${slug}`;
    return axiosClient.get(url);
  },
  create(body) {
    const url = `/kinds`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id, body) {
    const url = `/kinds/id/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(id) {
    const url = `/kinds/id/${id}`;
    return axiosClient.delete(url);
  },
};

export default kindsApi;

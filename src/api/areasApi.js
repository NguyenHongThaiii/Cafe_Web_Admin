import axiosClient from "./axiosClient";

const areasApi = {
  getAll(params) {
    const url = "/areas";
    return axiosClient.get(url, { params });
  },
  getBySlug(slug) {
    const url = `/areas/${slug}`;
    return axiosClient.get(url);
  },
  getCount(params) {
    const url = "/areas/count";
    return axiosClient.get(url, { params });
  },
  create(body) {
    const url = `/areas`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id, body) {
    const url = `/areas/id/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(id) {
    const url = `/areas/id/${id}`;
    return axiosClient.delete(url);
  },
};
export default areasApi;

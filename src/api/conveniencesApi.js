import axiosClient from "./axiosClient";

const conveniencesApi = {
  getAll(params) {
    const url = "/conveniences";
    return axiosClient.get(url, { params });
  },
  getCount(params) {
    const url = "/conveniences/count";
    return axiosClient.get(url, { params });
  },
  getBySlug(slug) {
    const url = `/conveniences/${slug}`;
    return axiosClient.get(url);
  },
  create(body) {
    const url = `/conveniences`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id, body) {
    const url = `/conveniences/id/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default conveniencesApi;

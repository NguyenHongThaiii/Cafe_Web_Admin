import axiosClient from "./axiosClient";

const blogsApi = {
  getAll(params) {
    const url = "/products";
    return axiosClient.get(url, {
      params,
    });
  },
  getBySlug(slug) {
    const url = `/products/${slug}`;
    return axiosClient.get(url, {});
  },
  getById(id) {
    const url = `/products/id/${id}`;
    return axiosClient.get(url);
  },
  getCount(params) {
    const url = `/products/count`;
    return axiosClient.get(url, { params });
  },
  createProduct(body) {
    const url = `/products`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateProduct(id, body) {
    const url = `/products/id/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getCountReviewProduct(product) {},
  delete(body) {
    const url = "/products";
    return axiosClient.delete(url, { data: body }, {});
  },
};

export default blogsApi;

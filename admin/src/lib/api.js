import axiosInstance from "./axios";
export const productApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/admin/products");
    console.log(data, "product api data");
    return data;
  },
  getById: async (id) => {
    const response = await axiosInstance.get(`/admin/products/${id}`);
    return response.data;
  },
  create: async (formData) => {
    console.log("Product create api was called");
    console.log(formData);
    // we reach backend successfully but no response returned.
    const response = await axiosInstance.post("/admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "<----------------------");
    return response.data;
  },
  update: async (id, formData) => {
    const response = await axiosInstance.put(
      `/admin/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
  delete: async (id) => {
    const response = await axiosInstance.delete(`/admin/products/${id}`);
    return response.data;
  },
};

export const orderApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/admin/orders");
    console.log("data  for orders ");
    console.log(data);
    return data;
  },
  getById: async (id) => {
    const response = await axiosInstance.get(`/admin/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await axiosInstance.put(`/admin/orders/${id}/status`, {
      status,
    });
    return response.data;
  },
};

export const statsApi = {
  getDashboard: async () => {
    const { data } = await axiosInstance.get("/admin/stats");
    return data;
  },
};
export const customerApi = {
  getAll: async () => {
    const { data } = axiosInstance.get("/admin/customers");
    return data;
  },
};

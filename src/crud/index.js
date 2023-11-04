import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export class CrudFactory {
  constructor() {
    axiosInstance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "auth_token"
      )}`;
      return config;
    });
  }
  async post(url, data) {
    try {
      const responce = await axiosInstance.post(url, data);
      return responce.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
  async get(url, data) {
    try {
      const responce = await axiosInstance.get(url, data);
      return responce.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
  async delete(url, data) {
    try {
      const responce = await axiosInstance.delete(url, data);
      return responce.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
  async put(url, data) {
    try {
      const responce = await axiosInstance.put(url, data);
      return responce.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
}

export const setDataOrError = ({ setData, data, setError }) => {
  if (data?.token) {
    localStorage.setItem("auth_token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.data));
  }
  setError(data);
  setData && setData(data?.data);
};

export const $crud = new CrudFactory();

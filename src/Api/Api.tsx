import axios from "axios";
import { BaseUrl } from "./BaseUrl";

const urlRegex = /^https?:\/\/\S+$/;
const isUrl = (str: string) => urlRegex.test(str);

class Api {
  url: string;
  getAuthToken: () => string | null;
  constructor() {
    this.url = BaseUrl || "";
    this.getAuthToken = () => localStorage.getItem("token");

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          if (!error?.response?.request?.responseURL.includes("/login")) {
            window.location.reload();
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get(
    path: string,
    auth: boolean = false,
    authToken: string | null = null,
    headers: Record<string, string> = {}
  ) {
    let success = false;
    const response = await axios(this.getApiUrl(path), {
      method: "GET",
      timeout: 20000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "37acaeed-a95a-434a-ba3e-e5ac5e3d3fc2",
        ...(auth
          ? { Authorization: `Bearer ${authToken || this.getAuthToken()}` }
          : null),
        ...headers,
      },
    });
    if (response) {
      success = true;
      const data = await response.data;
      const status = response.status;
      return [true, data, status];
    } else {
      return [success, null];
    }
  }
  async post(
    path: string,
    data: object = {},
    auth: boolean = false,
    authToken: string | null = null,
    headers: Record<string, string> = {}
  ) {
    let success = false;
    const response = await axios(this.getApiUrl(path), {
      method: "POST",
      timeout: 20000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "37acaeed-a95a-434a-ba3e-e5ac5e3d3fc2",
        ...(auth
          ? { Authorization: `Bearer ${authToken || this.getAuthToken()}` }
          : null),
        ...headers,
      },
      data: JSON.stringify(data),
    });
    if (response) {
      success = true;
      const data = await response.data;

      const status = response.status;
      return [true, data, status];
    } else {
      return [success, null];
    }
  }
  async delete(
    path: string,
    auth: boolean = false,
    authToken: string | null = null,
    headers: Record<string, string> = {}
  ) {
    let success = false;
    const response = await axios(this.getApiUrl(path), {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "37acaeed-a95a-434a-ba3e-e5ac5e3d3fc2",
        ...(auth
          ? { Authorization: `Bearer ${authToken || this.getAuthToken()}` }
          : null),
        ...headers,
      },
    });
    if (response) {
      success = true;
      const data = await response.data;
      const status = response.status;
      return [true, data, status];
    } else {
      return [success, null];
    }
  }
  async put(
    path: string,
    data: object = {},
    auth: boolean = false,
    authToken: string | null = null,
    headers: Record<string, string> = {}
  ) {
    let success = false;
    const response = await axios(this.getApiUrl(path), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "37acaeed-a95a-434a-ba3e-e5ac5e3d3fc2",
        ...(auth
          ? { Authorization: `Bearer ${authToken || this.getAuthToken()}` }
          : null),
        ...headers,
      },
      data: JSON.stringify(data),
    });
    if (response) {
      success = true;
      const data = await response.data;
      const status = response.status;
      return [true, data, status];
    } else {
      return [success, null];
    }
  }
  async patch(
    path: string,
    data: object = {},
    auth: boolean = false,
    authToken: string | null = null,
    headers: Record<string, string> = {}
  ) {
    let success = false;
    const response = await axios(this.getApiUrl(path), {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        mode: "cors",
        referrerPolicy: "origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-api-key": "37acaeed-a95a-434a-ba3e-e5ac5e3d3fc2",
        ...(auth
          ? { Authorization: `Bearer ${authToken || this.getAuthToken()}` }
          : null),
        ...headers,
      },
      data: JSON.stringify(data),
    });
    if (response) {
      success = true;
      const data = await response.data;
      const status = response.status;
      return [true, data, status];
    } else {
      return [success, null];
    }
  }
  getApiUrl(path: string) {
    return isUrl(path) ? path : this.url + path;
  }
  async postFormData(
    path: string,
    formData: FormData,
    auth: boolean = false,
    authToken: string | null = null,
    headers: Record<string, string> = {}
  ) {
    let success = false;
    try {
      const response = await axios(this.getApiUrl(path), {
        method: "POST",
        headers: {
          mode: "cors",
          referrerPolicy: "origin",
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-api-key": "37acaeed-a95a-434a-ba3e-e5ac5e3d3fc2",
          ...(auth
            ? { Authorization: `Bearer ${authToken || this.getAuthToken()}` }
            : null),
          "X-Requested-With": "XMLHttpRequest",
          ...headers,
        },
        data: formData,
      });

      if (response) {
        success = true;
        const data = await response.data;
        const status = response.status;
        return [true, data, status];
      } else {
        return [success, null];
      }
    } catch (error) {
      console.error("FormData submission error:", error);
      return [success, null];
    }
  }
}
export const api = new Api();

import axios from "axios";

export default class HttpService {
  constructor(token = "", baseURL = process.env.REACT_APP_AUCTIONS_ENDPOINT) {
    this.token = token;
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}, noAuth = false) {
    try {
      const response = await axios.get(`${this.baseURL}/${endpoint}`, {
        ...options,
        ...(noAuth ? {} : this._getAuthHeader()),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async post(endpoint, data = {}, options = {}, noAuth = false) {
    try {
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data, {
        ...options,
        ...(noAuth ? {} : this._getAuthHeader()),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
  async patch(endpoint, data = {}, options = {}, noAuth = false) {
    try {
      const response = await axios.patch(`${this.baseURL}/${endpoint}`, data, {
        ...options,
        ...(noAuth ? {} : this._getAuthHeader()),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  _handleHttpError(error) {
    const { code } = error;

    if (code !== "401") {
      throw error;
    } else {
      return this._handle401();
    }
  }

  _handle401() {
    // redirect to signin
  }

  _getAuthHeader() {
    return {
      headers: {
        Authorization: this.token,
      },
    };
  }
}

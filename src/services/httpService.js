import axios from "axios";

export default class HttpService {
  constructor(token = "", baseURL = process.env.REACT_APP_AUCTIONS_ENDPOINT) {
    this.token = token;
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}, noAuth = false) {
    try {
      return axios.get(`${this.baseURL}/${endpoint}`, {
        ...options,
        ...(noAuth ? {} : this._getAuthHeader()),
      });
    } catch (error) {
      this._handleHttpError(error);
    }
  }

  async post(endpoint, data = {}, options = {}, noAuth = false) {
    try {
      return axios.post(`${this.baseURL}/${endpoint}`, data, {
        ...options,
        ...(noAuth ? {} : this._getAuthHeader()),
      });
    } catch (error) {
      this._handleHttpError(error);
    }
  }
  async patch(endpoint, data = {}, options = {}, noAuth = false) {
    try {
      return axios.patch(`${this.baseURL}/${endpoint}`, data, {
        ...options,
        ...(noAuth ? {} : this._getAuthHeader()),
      });
    } catch (error) {
      this._handleHttpError(error);
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

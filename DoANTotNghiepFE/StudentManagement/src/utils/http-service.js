import axios from 'axios';
import storageService from './storage.service';
import { Api, AuthKeys } from '../constant';
import { toast } from 'react-toastify';

class _HttpService {

  async get(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('GET', uri, options);
    } catch (error) {
      return {
        data: error?.response?.data,
      }
    }
  }

  async post(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('POST', uri, options);
    } catch (error) {
      return {
        data: error?.response?.data,
      }
    }
  }

  async put(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('PUT', uri, options);
    } catch (error) {
      return {
        data: error?.response?.data,
      }
    }
  }

  async patch(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('PATCH', uri, options);
    } catch (error) {
      return {
        data: error?.response?.data,
      }
    }
  }

  async delete(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('DELETE', uri, options);
    } catch (error) {
      return {
        data: error?.response?.data,
      }
    }
  }

  async request(method, uri, options = { headers: {}, params: {}, body: {} }) {
    let whiteList = [];
    // if (whiteList.filter((item) => uri.includes(item)).length > 0 || storageService.get('accessToken')) {
    return await axios.request({
      method: method,
      baseURL: Api.BASE_URL,
      url: uri,
      headers: this.generateHttpHeaders(options.headers),
      params: options.params,
      data: options.body,
    });
    // } else {
    //     window.location = '/login';
    // }
  }

  generateHttpHeaders(headerInfo) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storageService.get('accessToken')}`,
    };

    if (headerInfo) {
      for (const item of Object.keys(headerInfo)) {
        headers[item] = headerInfo[item];
      }
    }
    return headers;
  }

  getAccessToken() {
    return (
      storageService.get(AuthKeys.ACCESS_TOKEN) ||
      storageService.getSession(AuthKeys.ACCESS_TOKEN)
    );
  }

  checkResponseCommon(response, defaultResponse, messageSuccess) {
    if (response?.data?.code !== '200') {
      toast.error(response?.data?.description)
      return defaultResponse;
    }
    if (messageSuccess) {
      toast.success(messageSuccess);
    }

    return response?.data?.data;
  }
}

const HttpService = new _HttpService();

export default HttpService;
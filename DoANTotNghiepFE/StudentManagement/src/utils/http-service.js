import axios from 'axios';
import storageService from './storage.service';
import { AuthKeys } from '../constant';

class _HttpService {

  async get(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('GET', uri, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async post(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('POST', uri, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async patch(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('PATCH', uri, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(uri, options = { headers: {}, params: {}, body: {} }) {
    try {
      return await this.request('DELETE', uri, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async request(method, uri, options = { headers: {}, params: {}, body: {} }) {
    let whiteList = [];
    // if (whiteList.filter((item) => uri.includes(item)).length > 0 || storageService.get('accessToken')) {
    return await axios.request({
      method: method,
      baseURL: 'http://localhost:8081/api/v1/',
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
}

const HttpService = new _HttpService();

export default HttpService;
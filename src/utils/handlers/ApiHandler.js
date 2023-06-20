import Axios from 'axios'
import LocalDataHandler from './LocalDataHandler'

const RESPONSE_TYPES = {
  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_NO_CONTENT: 204,
  STATUS_UNAUTHORIZED: 401
}

const ROUTE_NAMES = Object.freeze({
  LOGOUT: 'Logout',
});

const TOKEN_SAVING_DELAY = 500;

class ApiHandler {
  constructor() {
    /** Create the api instance for APIs **/
    this.api = Axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/api`,
    })
    this.source = null;
    this.store = null;
    this.apiCount = 0;
    this.router = null;
    this.setAuthHandler(LocalDataHandler.getAccessToken());
  }

  setAuthHandler(isAuth) {
    this.handleAuthHeaders = isAuth ? this.refreshAuthHeaders : this.handleAuthHeaders;
  }

  async refreshAuthHeaders(config) {
    if (!LocalDataHandler.getAccessToken()) {
      await this.refreshToken();
      // after new tokens retrieved, don't forget to set it in the headers for following API calls
      config.headers = this.getAuthHeader();
      return config;
    } else {
      // Do something before request is sent
      return config;
    }
  }

  async handleAuthHeaders(config) {
    return new Promise(resolve => resolve(config));
  }

  setInterceptors(store) {
    this.store = store;
    const self = this;
    // Add a request interceptor
    this.api.interceptors.request.use(
      async function (config) {
        self.increaseApiCount();
        /** here update the access token with refresh token with native fetch() **/
        config = await self.handleAuthHeaders(config);
        return config;
      },
      function (error) {
        self.decreaseApiCount();
        // Do something with request error
        return Promise.reject(error)
      }
    );
    // Add a response interceptor
    this.api.interceptors.response.use(
      function (response) {
        self.decreaseApiCount();
        // Do something with response data
        return response
      },
      function (error) {
        self.decreaseApiCount();
        // Do something with response error
        return Promise.reject(error)
      }
    );
  }

  increaseApiCount() {
    this.apiCount++;
    if (this.apiCount > 0) {
      this.store.commit('setLoading', true);
    }
  }

  decreaseApiCount() {
    this.apiCount--;
    if (this.apiCount < 1) {
      this.store.commit('setLoading', false);
    }
  }

  async refreshToken() {
    const refreshToken = LocalDataHandler.getRefreshToken();
    if (!refreshToken) {
      return this.router.push({name: ROUTE_NAMES.LOGOUT});
    }
    let formData = new FormData();
    formData.append('refresh_token', refreshToken);
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', process.env.VUE_APP_AUTH_CLIENT_ID);
    try {
      // use native fetch to get new tokens
      let response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        withCredentials: true,
        body: new URLSearchParams(formData),
      });
      if (this.isSuccess(response.status)) {
        const data = await response.json();
        // set up in your cookies
        LocalDataHandler.setAccessToken(data.access_token, data.expireIn);
        LocalDataHandler.setRefreshToken(data.refresh_token, LocalDataHandler.VALUES.REFRESH_TOKEN_EXPIRE_TIME);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
            /** tiny delay for database token saving **/
          }, TOKEN_SAVING_DELAY);
        })
      }
      console.error(response);
      return this.router.push({name: ROUTE_NAMES.LOGOUT});
    } catch (error) {
      console.error(error);
      return this.router.push({name: ROUTE_NAMES.LOGOUT});
    }
  }

  send(method, url, headers = {}, data = {}, params = {}, arrayBufferResponse = false) {
    return this.sendApi(this.api, method, url, headers, data, params, arrayBufferResponse);
  }

  sendApi(instance, method, url, headers = {}, data = {}, params = {}, arrayBufferResponse = false) {
    this.source = Axios.CancelToken.source();
    // Define the headers if they are undefined
    headers = headers ? headers : {}
    return instance.request({
      method: method,
      url: url,
      headers: headers !== undefined ? headers : {},
      data: data !== undefined ? data : {},
      params: params !== undefined ? params : {},
      responseType: arrayBufferResponse === true ? 'arraybuffer' : undefined,
      cancelToken: this.source.token
    })
  }

  get(url, params = {}, headers = {}, responseType = false) {
    return this.send('GET', url, headers, undefined, params, responseType)
  }

  post(url, data = {}, headers = {}, params = {}, fileResponse = {}) {
    return this.send('POST', url, headers, data, params, fileResponse)
  }

  patch(url, data = {}, headers = {}, params = {}) {
    return this.send('PATCH', url, headers, data, params)
  }

  put(url, data = {}, headers = {}, params = {}) {
    return this.send('PUT', url, headers, data, params)
  }

  delete(url, data = {}, header = {}) {
    return this.send('DELETE', url, header, data)
  }

  cancelRequest() {
    this.source.cancel('Request Cancelled.')
  }

  getAuthHeader() {
    // Check if access token is present
    if (!LocalDataHandler.getAccessToken()) return null
    return {
      Authorization: `Bearer ${LocalDataHandler.getAccessToken()}`,
      'accept-language': 'en'
    }
  }

  isSuccess(statusCode) {
    return (
      statusCode === RESPONSE_TYPES.STATUS_OK ||
      statusCode === RESPONSE_TYPES.STATUS_CREATED ||
      statusCode === RESPONSE_TYPES.STATUS_NO_CONTENT
    )
  }

  parseFormData(data) {
    let formData = new FormData()
    // get the first level of data
    for (const key in data) {
      if (Array.isArray(data[key])) {
        // here data[key] is an array, we need both index and value below
        for (const [index, value] of data[key].entries()) {
          // the value is an object, so loop through each key
          for (const childKey in value) {
            // parse the data to correct format for array of objects
            formData.append(`${key}[${index}].${childKey}`, value[childKey])
          }
        }
      } else {
        formData.append(key, data[key])
      }
    }
    return formData
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ApiHandler()
    }
    return this.instance
  }
}

export default ApiHandler.getInstance()

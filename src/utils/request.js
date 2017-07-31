import axios from 'axios';
import qs from 'qs';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options;

  // console.log('queryOptiongs', options);

  const cloneData = lodash.cloneDeep(data);

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        params: cloneData,
      })
    case 'post':
      return axios.post(url, qs.stringify(cloneData));
    case 'put':
      return axios.put(url, qs.stringify(cloneData));
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
}

export default function request (options) {

  return fetch(options).then((response) => {
    const { statusText, status } = response;
    
    let data = response.data;
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }

    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }
    return { success: false, statusCode, message: msg };
  })
}

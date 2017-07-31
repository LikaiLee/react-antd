import { request, config } from '../utils';
const { api } = config;
const { orderApi, getOrderApi } = api;

export async function query (params) {
  return request({
    // url: 'https://randomuser.me/api?results=40',
    url: orderApi,
    method: 'get',
    data: params,
  })
}

export async function getUser (params) {
  return request({
    url: getOrderApi,
    method: 'get',
    data: params,
  });
}

export async function remove (params) {
  return request({
    url: orderApi,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: orderApi,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: orderApi,
    method: 'put',
    data: params,
  })
}

import { request, config } from '../utils';
const { api } = config;
const { commentApi } = api;

export async function query (params) {
  return request({
    url: commentApi,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: commentApi,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: commentApi,
    method: 'post',
    data: params,
  })
}

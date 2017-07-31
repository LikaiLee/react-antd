import { request, config } from '../utils';
const { api } = config;
const { usersApi, getUserApi } = api;

export async function query (params) {
  return request({
    // url: 'https://randomuser.me/api?results=40',
    url: usersApi,
    method: 'get',
    data: params,
  })
}

export async function getUser (params) {
  return request({
    url: getUserApi,
    method: 'get',
    data: params,
  });
}

export async function remove (params) {
  return request({
    url: usersApi,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: usersApi,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: usersApi,
    method: 'put',
    data: params,
  })
}

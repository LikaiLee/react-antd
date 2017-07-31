import { request, config } from '../utils';
const { api } = config;
const { getLoginedUserInfoAPI, userLoginAPI, userLogoutAPI } = api;

// 用户登录
export async function login (data) {
  return request({
  	url: userLoginAPI,
  	method: 'post',
  	data
  });
}
export async function logout () {
	return request({
		url: userLogoutAPI,
		method: 'post'
	});
}
// 获取已登录用户信息
export async function getLoginedUserInfo (data) {
	return request({
		url: getLoginedUserInfoAPI,
		method: 'post',
		data
	});
}

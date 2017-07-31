import { request, config } from '../utils';

export async function login (data) {
	console.log(data)
	return request({
		url: 'api/userInfo/test',
		type: 'post',
		data
	});
}

export async function getHziee (data) {
	return request({
		url: 'http://jxgl.hziee.edu.cn/default2.aspx',
		type: 'post',
		data
	});
}
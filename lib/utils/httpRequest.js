import axios from 'axios';

const httpRequest = {
	get: ({ baseUrl = process.env.API_URL, url, token, params }) => {
		return axios({
			timeout: process.env.REQUEST.TIMEOUT,
			method: 'get',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			params: params
		});
	},
	post: ({ baseUrl = process.env.API_URL, url, token, data }) => {
		return axios({
			timeout: process.env.REQUEST.TIMEOUT,
			method: 'post',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			data: data
		});
	},
	put: ({ baseUrl = process.env.API_URL, url, token, data }) => {
		return axios({
			timeout: process.env.REQUEST.TIMEOUT,
			method: 'put',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			data: data
		});
	},
	delete: ({ baseUrl = process.env.API_URL, url, token, params }) => {
		return axios({
			timeout: process.env.REQUEST.TIMEOUT,
			method: 'delete',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			params: params
		});
	},
	upload: ({ baseUrl = process.env.API_URL, url, token, data, files }) => {
		const formData = new FormData();
		if (data) {
			for (let field in data) {
				formData.set(field, data[field]);
			}
		}
		if (files) {
			for (let field in files) {
				if (files[field]) {
					formData.append(field, files[field], files[field].name);
				}
			}
		}
		return axios({
			timeout: process.env.REQUEST.TIMEOUT,
			method: 'post',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token || ''
			},
			data: formData
		});
	}
};

export default httpRequest;

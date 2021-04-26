import httpRequest from '../utils/httpRequest';
import { getCookie } from '../utils/session';

const userAPI = {
	current: async () => {
		const { data } = await httpRequest.get({
			url: `${process.env.API_URL}/user`,
			token: getCookie('token')
		});
		return data;
	},
	login: async (user) => {
		const { data } = await httpRequest.post({
			url: `${process.env.API_URL}/users/login`,
			data: user
		});
		return data;
	},
	register: async (user) => {
		const { data } = await httpRequest.post({
			url: `${process.env.API_URL}/users/register`,
			data: user
		});
		return data;
	},
	logout: async () => {
		const { data } = await httpRequest.get({
			url: `${process.env.API_URL}/users/logout`,
			token: getCookie('token')
		});
		return data;
	},
	single: async (user_name) => {
		const { data } = await httpRequest.get({
			url: `${process.env.API_URL}/users/${user_name}`
		});
		return data;
	},
	update: async () => {}
};

export default userAPI;

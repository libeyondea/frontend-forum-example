import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const userAPI = {
	current: async () => {
		const { data } = await httpRequest.get({
			url: `/current_user`,
			token: getCookie('token')
		});
		return data;
	},
	login: async (user) => {
		const { data } = await httpRequest.post({
			url: `/users/login`,
			data: user
		});
		return data;
	},
	register: async (user) => {
		const { data } = await httpRequest.post({
			url: `/users/register`,
			data: user
		});
		return data;
	},
	logout: async () => {
		const { data } = await httpRequest.get({
			url: `/current_user/logout`,
			token: getCookie('token')
		});
		return data;
	},
	single: async (user_name) => {
		const { data } = await httpRequest.get({
			url: `/users/${user_name}`,
			token: getCookie('token')
		});
		return data;
	},
	update: async (user) => {
		const { data } = await httpRequest.put({
			url: `/users`,
			token: getCookie('token'),
			data: user
		});
		return data;
	},
	edit: async (user_name) => {
		const { data } = await httpRequest.get({
			url: `/users/${user_name}/edit`,
			token: getCookie('token')
		});
		return data;
	},
	follow: async (user_name) => {
		const { data } = await httpRequest.post({
			url: `/follows`,
			data: {
				user_name: user_name
			},
			token: getCookie('token')
		});
		return data;
	},
	unFollow: async (user_name) => {
		const { data } = await httpRequest.delete({
			url: `/follows`,
			params: {
				user_name: user_name
			},
			token: getCookie('token')
		});
		return data;
	}
};

export default userAPI;

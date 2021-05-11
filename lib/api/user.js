import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const userAPI = {
	current: async () => {
		try {
			const res = await httpRequest.get({
				url: `/current_user`,
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	login: async (user) => {
		try {
			const res = await httpRequest.post({
				url: `/users/login`,
				data: user
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	register: async (user) => {
		try {
			const res = await httpRequest.post({
				url: `/users/register`,
				data: user
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	logout: async () => {
		try {
			const res = await httpRequest.get({
				url: `/current_user/logout`,
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	single: async (user_name) => {
		try {
			const res = await httpRequest.get({
				url: `/users/${user_name}`,
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	update: async (user_name, user) => {
		try {
			const res = await httpRequest.put({
				url: `/users/${user_name}`,
				token: getCookie('token'),
				data: user
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	edit: async (user_name) => {
		try {
			const res = await httpRequest.get({
				url: `/users/${user_name}/edit`,
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	follow: async (user_name) => {
		try {
			const res = await httpRequest.post({
				url: `/follow_user`,
				data: {
					user_name: user_name
				},
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	unFollow: async (user_name) => {
		try {
			const res = await httpRequest.delete({
				url: `/follow_user`,
				params: {
					user_name: user_name
				},
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	}
};

export default userAPI;

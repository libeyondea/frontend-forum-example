import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const followAPI = {
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

export default followAPI;

import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const categoryAPI = {
	list: async (page = 1, limit = process.env.LIMIT_PAGE.LIST_TAG) => {
		const { data } = await httpRequest.get({
			url: `/tags`,
			token: getCookie('token'),
			params: {
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	single: async (slug) => {
		const { data } = await httpRequest.get({
			url: `/tags/${slug}`,
			token: getCookie('token')
		});
		return data;
	},
	follow: async (slug) => {
		const { data } = await httpRequest.post({
			url: `/follow_tag`,
			data: {
				slug: slug
			},
			token: getCookie('token')
		});
		return data;
	},
	unFollow: async (slug) => {
		const { data } = await httpRequest.delete({
			url: `/follow_tag`,
			params: {
				slug: slug
			},
			token: getCookie('token')
		});
		return data;
	}
};

export default categoryAPI;

import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const categoryAPI = {
	list: async (page = 1, limit = process.env.LIMIT_PAGE.LIST_TAG) => {
		try {
			const res = await httpRequest.get({
				url: `/tags`,
				token: getCookie('token'),
				params: {
					offset: (page - 1) * limit,
					limit: limit
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	single: async (slug) => {
		try {
			const res = await httpRequest.get({
				url: `/tags/${slug}`,
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	follow: async (slug) => {
		try {
			const res = await httpRequest.post({
				url: `/follow_tag`,
				data: {
					slug: slug
				},
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	unFollow: async (slug) => {
		try {
			const res = await httpRequest.delete({
				url: `/follow_tag`,
				params: {
					slug: slug
				},
				token: getCookie('token')
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	}
};

export default categoryAPI;

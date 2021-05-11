import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const commentAPI = {
	list: async (post_slug, page = 1, limit = process.env.LIMIT_PAGE.LIST_COMMENT) => {
		try {
			const res = await httpRequest.get({
				url: `/comments`,
				params: {
					post_slug: post_slug,
					offset: (page - 1) * limit,
					limit: limit
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	create: async (comment) => {
		try {
			const res = await httpRequest.post({
				url: `/comments`,
				token: getCookie('token'),
				data: comment
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	delete: async (id, post_slug) => {
		try {
			const res = await httpRequest.delete({
				url: `/comments/${id}`,
				token: getCookie('token'),
				params: {
					post_slug: post_slug
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	update: async () => {}
};

export default commentAPI;

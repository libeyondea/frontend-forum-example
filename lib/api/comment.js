import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const commentAPI = {
	list: async (post_slug, page = 1, limit = process.env.LIMIT_PAGE.LIST_COMMENT) => {
		const { data } = await httpRequest.get({
			url: `/comments`,
			params: {
				post_slug: post_slug,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	create: async (comment) => {
		const { data } = await httpRequest.post({
			url: `/comments`,
			token: getCookie('token'),
			data: comment
		});
		return data;
	},
	delete: async (id, post_slug) => {
		const { data } = await httpRequest.delete({
			url: `/comments`,
			token: getCookie('token'),
			params: {
				id: id,
				post_slug: post_slug
			}
		});
		return data;
	},
	update: async () => {}
};

export default commentAPI;

import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const commentAPI = {
	list: async (post_slug, page = 1, limit = process.env.LIMIT_PAGE.LIST_COMMENT) => {
		const { data } = await httpRequest.get({
			url: `/comments/${post_slug}`,
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
	delete: async () => {},
	update: async () => {}
};

export default commentAPI;

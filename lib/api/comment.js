import httpRequest from 'lib/utils/httpRequest';

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
	create: async () => {},
	delete: async () => {},
	update: async () => {}
};

export default commentAPI;

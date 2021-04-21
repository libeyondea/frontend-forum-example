import httpRequest from '../utils/httpRequest';

const tagAPI = {
	list: async (page = 0, limit = process.env.LIMIT_PAGE.LIST_TAG) => {
		const { data } = await httpRequest.get({
			url: `/tags`,
			params: {
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	single: async (slug) => {
		const { data } = await httpRequest.get({
			url: `/tags/${slug}`
		});
		return data;
	}
};

export default tagAPI;

import httpRequest from '@/lib/utils/httpRequest';

const categoryAPI = {
	list: async (page = 1, limit = process.env.LIMIT_PAGE.LIST_TAG) => {
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

export default categoryAPI;

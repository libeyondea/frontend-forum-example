import httpRequest from '@/lib/utils/httpRequest';

const categoryAPI = {
	list: async (page = 1, limit = process.env.LIMIT_PAGE.LIST_CATEGORY) => {
		const { data } = await httpRequest.get({
			url: `/categories`,
			params: {
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	single: async (slug) => {
		const { data } = await httpRequest.get({
			url: `/categories/${slug}`
		});
		return data;
	}
};

export default categoryAPI;

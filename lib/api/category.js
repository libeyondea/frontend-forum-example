import httpRequest from '@/lib/utils/httpRequest';

const categoryAPI = {
	list: async (page = 1, limit = process.env.LIMIT_PAGE.LIST_CATEGORY) => {
		try {
			const res = await httpRequest.get({
				url: `/categories`,
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
				url: `/categories/${slug}`
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	}
};

export default categoryAPI;

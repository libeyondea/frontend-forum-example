import httpRequest from '@/lib/utils/httpRequest';

const postAPI = {
	list: async (page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_HOME) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByTag: async (tag_slug, page = 0, limit = process.env.LIMIT_PAGE.LIST_POST_TAG) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				tag: tag_slug,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByCategory: async (category_slug, page = 0, limit = process.env.LIMIT_PAGE.LIST_POST_CATEGORY) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				category: category_slug,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByUser: async (user_name, page = 0, limit = process.env.LIMIT_PAGE.LIST_POST_USER) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				user: user_name,
				offset: page * limit,
				limit: limit
			}
		});
		return data;
	},
	listByFavoritedUser: async (favorited_user_name, page = 0, limit = process.env.LIMIT_PAGE.LIST_POST_FAVORITED) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				favorited: favorited_user_name,
				offset: page * limit,
				limit: limit
			}
		});
		return data;
	},
	single: async (slug) => {
		const { data } = await httpRequest.get({
			url: `/posts/${slug}`
		});
		return data;
	}
};

export default postAPI;

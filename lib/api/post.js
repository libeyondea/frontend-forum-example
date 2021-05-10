import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const postAPI = {
	list: async (tab = 'feed', page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_HOME) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			token: getCookie('token'),
			params: {
				tab: tab,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByTag: async (tag_slug, tab = 'feed', page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_TAG) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			token: getCookie('token'),
			params: {
				tag: tag_slug,
				tab: tab,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByCategory: async (category_slug, tab = 'feed', page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_CATEGORY) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			token: getCookie('token'),
			params: {
				category: category_slug,
				tab: tab,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByUser: async (user_name, page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_USER) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				user: user_name,
				offset: (page - 1) * limit,
				limit: limit
			}
		});
		return data;
	},
	listByFavorited: async (user_name, page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_FAVORITED) => {
		const { data } = await httpRequest.get({
			url: '/posts',
			params: {
				favorited: user_name,
				offset: (page - 1) * limit,
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

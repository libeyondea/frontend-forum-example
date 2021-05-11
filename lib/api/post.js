import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const postAPI = {
	list: async (tab = 'feed', page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_HOME) => {
		try {
			const res = await httpRequest.get({
				url: '/posts',
				token: getCookie('token'),
				params: {
					tab: tab,
					offset: (page - 1) * limit,
					limit: limit
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	listByTag: async (tag_slug, tab = 'feed', page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_TAG) => {
		try {
			const res = await httpRequest.get({
				url: '/posts',
				token: getCookie('token'),
				params: {
					tag: tag_slug,
					tab: tab,
					offset: (page - 1) * limit,
					limit: limit
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	listByCategory: async (category_slug, tab = 'feed', page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_CATEGORY) => {
		try {
			const res = await httpRequest.get({
				url: '/posts',
				token: getCookie('token'),
				params: {
					category: category_slug,
					tab: tab,
					offset: (page - 1) * limit,
					limit: limit
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	listByUser: async (user_name, page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_USER) => {
		try {
			const res = await httpRequest.get({
				url: '/posts',
				params: {
					user: user_name,
					offset: (page - 1) * limit,
					limit: limit
				}
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	listByFavorited: async (user_name, page = 1, limit = process.env.LIMIT_PAGE.LIST_POST_FAVORITED) => {
		try {
			const res = await httpRequest.get({
				url: '/posts',
				params: {
					favorited: user_name,
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
				url: `/posts/${slug}`
			});
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	}
};

export default postAPI;

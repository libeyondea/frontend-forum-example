import {
	LIST_CATEGORY_FAILED,
	LIST_CATEGORY_REQUESTED,
	LIST_CATEGORY_SUCCEED,
	SINGLE_CATEGORY_FAILED,
	SINGLE_CATEGORY_REQUESTED,
	SINGLE_CATEGORY_SUCCEED
} from '@/redux/constants';

export const listCategoryRequestedAction = (page) => ({
	type: LIST_CATEGORY_REQUESTED,
	payload: {
		page: page
	}
});
export const listCategorySucceedAction = (categories) => ({
	type: LIST_CATEGORY_SUCCEED,
	payload: {
		categories: categories
	}
});
export const listCategoryFailedAction = (errors) => ({
	type: LIST_CATEGORY_FAILED,
	payload: {
		errors: errors
	}
});

export const singleCategoryRequestedAction = (slug) => ({
	type: SINGLE_CATEGORY_REQUESTED,
	payload: {
		slug: slug
	}
});
export const singleCategorySucceedAction = (category) => ({
	type: SINGLE_CATEGORY_SUCCEED,
	payload: {
		category: category
	}
});
export const singleCategoryFailedAction = (errors) => ({
	type: SINGLE_CATEGORY_FAILED,
	payload: {
		errors: errors
	}
});

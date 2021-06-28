import * as en from '@/modules/home/languages/en';
import * as vi from '@/modules/home/languages/vi';

const Language = {
	titleListPostPinned: (language) => {
		switch (language) {
			case 'vi':
				return vi.TEXT_TITLE_LIST_POST_PINNED;
			default:
				return en.TEXT_TITLE_LIST_POST_PINNED;
		}
	},
	titleListPost: (language) => {
		switch (language) {
			case 'vi':
				return vi.TEXT_TITLE_LIST_POST;
			default:
				return en.TEXT_TITLE_LIST_POST;
		}
	}
};

export default Language;

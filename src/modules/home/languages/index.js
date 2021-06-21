import * as en from '@/modules/home/languages/en';
import * as vi from '@/modules/home/languages/vi';

const Language = {
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

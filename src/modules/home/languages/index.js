import * as en from '@/modules/home/languages/en';
import * as vn from '@/modules/home/languages/vn';

const Language = {
	titleListPost: (language) => {
		switch (language) {
			case 'vi':
				return vn.TEXT_TITLE_LIST_POST;
			default:
				return en.TEXT_TITLE_LIST_POST;
		}
	}
};

export default Language;

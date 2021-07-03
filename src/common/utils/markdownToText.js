import remark from 'remark';
import strip from 'strip-markdown';

import showToast from '@/common/utils/showToast';

const markdownToText = (markdown, limit = 66) => {
	let content = '';
	remark()
		.use(strip)
		.process(markdown, function (err, file) {
			if (err) {
				showToast.error('Convert error');
			}
			content = String(file)
				.trim()
				.replace(/[\r\n]+/gm, ' ');
		});
	return content.length > limit ? content.slice(0, limit) + '...' : content;
};

export default markdownToText;

import { convert } from 'html-to-text';
import marked from 'marked';

const markdownToText = (markdown, limit) => {
	const tmp = convert(marked(markdown), {
		selectors: [{ selector: 'h2', options: { uppercase: false } }]
	}).replace(/(\r\n|\n|\r)/gm, '');
	return tmp.length > 66 ? tmp.slice(0, limit) + '...' : tmp;
};

export default markdownToText;

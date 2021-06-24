import DOMPurify from 'dompurify';
import marked from 'marked';

const markdown = (text) => {
	const config = {
		USE_PROFILES: { html: true }
	};
	const temp = marked(text);
	//const clean = DOMPurify.sanitize(temp, config);
	return temp;
};

export default markdown;

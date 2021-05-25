import slugify from 'slugify';

const convertTextToSlug = (text) => {
	return slugify(text, {
		replacement: '-',
		remove: undefined,
		lower: true,
		strict: true,
		locale: 'vi'
	});
};

export default convertTextToSlug;

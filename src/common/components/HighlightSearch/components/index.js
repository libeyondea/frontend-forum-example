import { escapeRegExp } from 'lodash';

const HighlightSearch = ({ text = '', highlight = '' }) => {
	if (!highlight.trim()) {
		return <div>{text}</div>;
	}
	const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
	const parts = text.split(regex);
	return (
		<div>
			{parts
				.filter((part) => part)
				.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
		</div>
	);
};

export default HighlightSearch;

import moment from 'moment';

const timeAgo = (value) => {
	return moment(value, 'YYYY-MM-DD HH:mm:ss').fromNow();
};

export default timeAgo;

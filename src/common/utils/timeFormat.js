import moment from 'moment';

const timeFormat = (value) => {
	return moment(value, 'YYYY-MM-DD HH:mm:ss').format('MMM DD YYYY');
};

export default timeFormat;

import { isArray } from 'lodash';

const parseArray = (val) => {
	const temp = isArray(val) ? val : [];
	return temp;
};

export default parseArray;

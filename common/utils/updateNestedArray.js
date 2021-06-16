import _ from 'lodash';

const updateNestedArray = (arr, id, obj) => {
	let temp = arr;
	temp.forEach((i) => {
		if (_.isEqual(i.id, id)) {
			i.children_comment = [obj, ...i.children_comment];
		} else {
			updateNestedArray(i.children_comment, id, obj);
		}
	});
	return temp;
};
export default updateNestedArray;

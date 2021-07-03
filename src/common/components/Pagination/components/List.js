import PropTypes from 'prop-types';
import React from 'react';

const List = ({ children }) => {
	return <ul className={`pagination flex-wrap mb-0`}>{children}</ul>;
};

List.propTypes = {
	children: PropTypes.node.isRequired
};

export default List;

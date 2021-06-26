import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Item = ({ children, disabled, current }) => {
	const cx = classNames(`page-item`, {
		disabled: disabled,
		active: current
	});

	return <li className={cx}>{children}</li>;
};

Item.propTypes = {
	children: PropTypes.node.isRequired,
	current: PropTypes.bool,
	disabled: PropTypes.bool
};

export default Item;

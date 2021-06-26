import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Link = forwardRef(({ children, disabled, current, label, ...props }, ref) => {
	const cx = classNames('page-link');
	return (
		<a className={cx} aria-label={label} aria-current={current} aria-disabled={disabled} ref={ref} {...props}>
			{children}
		</a>
	);
});

Link.displayName = 'Link';

Link.propTypes = {
	children: PropTypes.node.isRequired,
	current: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string.isRequired
};

export default Link;

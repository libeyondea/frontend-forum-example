import React, { Component } from 'react';
import SocialLogin from 'react-social-login';

class SocialButtonComponent extends Component {
	render() {
		const { children, triggerLogin, ...props } = this.props;
		return (
			<button type="button" onClick={triggerLogin} {...props}>
				{children}
			</button>
		);
	}
}

export default SocialLogin(SocialButtonComponent);

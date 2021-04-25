import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ responseFacebook }) => (
	<FacebookLogin
		appId="765638147489641"
		autoLoad={false}
		fields="name,email,picture"
		size="small"
		isMobile={false}
		icon="fa-facebook"
		textButton="Facebook"
		cssClass="kep-login-facebook-custom"
		callback={responseFacebook}
	/>
);

export default FacebookLoginButton;

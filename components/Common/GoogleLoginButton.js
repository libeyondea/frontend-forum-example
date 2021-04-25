import GoogleLogin from 'react-google-login';

const GoogleLoginButton = ({ responseGoogle }) => (
	<GoogleLogin
		clientId="578603881199-gtsdqf67l22llq2mol40bpcmpp66uj18.apps.googleusercontent.com"
		buttonText="Google"
		render={(renderProps) => (
			<span>
				<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="kep-login-google-custom small">
					<i className="fa fa-google" />
					Google
				</button>
			</span>
		)}
		onSuccess={responseGoogle}
		onFailure={responseGoogle}
		cookiePolicy={'single_host_origin'}
	/>
);

export default GoogleLoginButton;

import React from 'react';

import SocialButton from '@/common/components/SocialButtonLogin/components/socialButton';
import style from '@/common/components/SocialButtonLogin/styles/style.module.scss';

const SocialButtonLoginComponent = ({ handleSocialLogin, handleSocialLoginFailure, provider }) => {
	return (
		<>
			{provider === 'facebook' && (
				<SocialButton
					provider="facebook"
					appId="765638147489641"
					onLoginSuccess={handleSocialLogin}
					onLoginFailure={handleSocialLoginFailure}
					className={`${style.facebook_login_button}`}
				>
					<div className={`${style.body_social}`}>
						<div className={`${style.icon_social}`}>
							<svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 90 90">
								<g>
									<path
										d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
										fill="#FFFFFF"
									/>
								</g>
							</svg>
						</div>
						<div className={`${style.text_social}`}>Facebook</div>
					</div>
				</SocialButton>
			)}
			{provider === 'google' && (
				<SocialButton
					provider="google"
					appId="578603881199-gtsdqf67l22llq2mol40bpcmpp66uj18.apps.googleusercontent.com"
					onLoginSuccess={handleSocialLogin}
					onLoginFailure={handleSocialLoginFailure}
					className={`${style.google_login_button}`}
				>
					<div className={`${style.body_social}`}>
						<div className={`${style.icon_social}`}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="26px" height="26px">
								<linearGradient
									id="95yY7w43Oj6n2vH63j6HJb"
									x1="29.401"
									x2="29.401"
									y1="4.064"
									y2="106.734"
									gradientTransform="matrix(1 0 0 -1 0 66)"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset={0} stopColor="#ff5840" />
									<stop offset=".007" stopColor="#ff5840" />
									<stop offset=".989" stopColor="#fa528c" />
									<stop offset={1} stopColor="#fa528c" />
								</linearGradient>
								<path
									fill="url(#95yY7w43Oj6n2vH63j6HJb)"
									d="M47.46,15.5l-1.37,1.48c-1.34,1.44-3.5,1.67-5.15,0.6c-2.71-1.75-6.43-3.13-11-2.37	c-4.94,0.83-9.17,3.85-11.64, 7.97l-8.03-6.08C14.99,9.82,23.2,5,32.5,5c5,0,9.94,1.56,14.27,4.46	C48.81,10.83,49.13,13.71,47.46,15.5z"
								/>
								<linearGradient
									id="95yY7w43Oj6n2vH63j6HJc"
									x1="12.148"
									x2="12.148"
									y1=".872"
									y2="47.812"
									gradientTransform="matrix(1 0 0 -1 0 66)"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset={0} stopColor="#feaa53" />
									<stop offset=".612" stopColor="#ffcd49" />
									<stop offset={1} stopColor="#ffde44" />
								</linearGradient>
								<path
									fill="url(#95yY7w43Oj6n2vH63j6HJc)"
									d="M16.01,30.91c-0.09,2.47,0.37,4.83,1.27,6.96l-8.21,6.05c-1.35-2.51-2.3-5.28-2.75-8.22	c-1.06-6.88,0.54-13.38, 3.95-18.6l8.03,6.08C16.93,25.47,16.1,28.11,16.01,30.91z"
								/>
								<linearGradient
									id="95yY7w43Oj6n2vH63j6HJd"
									x1="29.76"
									x2="29.76"
									y1="32.149"
									y2="-6.939"
									gradientTransform="matrix(1 0 0 -1 0 66)"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset={0} stopColor="#42d778" />
									<stop offset=".428" stopColor="#3dca76" />
									<stop offset={1} stopColor="#34b171" />
								</linearGradient>
								<path
									fill="url(#95yY7w43Oj6n2vH63j6HJd)"
									d="M50.45,51.28c-4.55,4.07-10.61,6.57-17.36,6.71C22.91,58.2,13.66,52.53,9.07,43.92l8.21-6.05	C19.78,43.81, 25.67,48,32.5,48c3.94,0,7.52-1.28,10.33-3.44L50.45,51.28z"
								/>
								<linearGradient
									id="95yY7w43Oj6n2vH63j6HJe"
									x1={46}
									x2={46}
									y1="3.638"
									y2="35.593"
									gradientTransform="matrix(1 0 0 -1 0 66)"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset={0} stopColor="#155cde" />
									<stop offset=".278" stopColor="#1f7fe5" />
									<stop offset=".569" stopColor="#279ceb" />
									<stop offset=".82" stopColor="#2cafef" />
									<stop offset={1} stopColor="#2eb5f0" />
								</linearGradient>
								<path
									fill="url(#95yY7w43Oj6n2vH63j6HJe)"
									d="M59,31.97c0.01,7.73-3.26,14.58-8.55,19.31l-7.62-6.72c2.1-1.61,3.77-3.71,4.84-6.15 c0.29-0.66-0.2-1.41-0.92-1.41H37c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h17C56.75,27,59,29.22,59,31.97z"
								/>
							</svg>
						</div>
						<div className={`${style.text_social}`}>Google</div>
					</div>
				</SocialButton>
			)}
			{provider === 'github' && (
				<SocialButton
					autoCleanUri
					provider="github"
					appId="a44d70073755ab51b128"
					onLoginSuccess={handleSocialLogin}
					onLoginFailure={handleSocialLoginFailure}
					className={`${style.github_login_button}`}
					redirect="http://localhost:999"
					gatekeeper="http://localhost:9999"
				>
					<div className={`${style.body_social}`}>
						<div className={`${style.icon_social}`}>
							<svg
								fill="#FFFFFF"
								role="img"
								viewBox="0 0 24 24"
								width="26px"
								height="26px"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						</div>
						<div className={`${style.text_social}`}>Github</div>
					</div>
				</SocialButton>
			)}
		</>
	);
};

export default SocialButtonLoginComponent;

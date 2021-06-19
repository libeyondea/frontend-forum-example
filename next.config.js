const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	// when `next build` or `npm run build` is used
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	// when `next build` or `npm run build` is used
	const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

	console.log(`isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`);

	const env = {
		WEBSITE_URL: (() => {
			if (isDev) return 'http://localhost:999';
			if (isProd) {
				return 'https://de4thzone.com';
			}
			if (isStaging) return 'https://de4thzone.com';
			return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		API_URL: (() => {
			if (isDev) return 'http://localhost:666/api';
			if (isProd) return 'https://backend-forum-example.herokuapp.com/api';
			if (isStaging) return 'https://backend-forum-example.herokuapp.com/api';
			return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		IMAGES_URL: (() => {
			if (isDev) return 'https://elasticbeanstalk-ap-southeast-1-153036539674.s3-ap-southeast-1.amazonaws.com/images';
			if (isProd) return 'https://de4thzone.s3-ap-southeast-1.amazonaws.com/images';
			if (isStaging) return 'https://de4thzone.s3-ap-southeast-1.amazonaws.com/images';
			return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		LIMIT_PAGE: {
			LIST_POST_HOME: 10,
			LIST_POST_TAG: 10,
			LIST_POST_CATEGORY: 10,
			LIST_POST_USER: 10,
			LIST_POST_FAVORITED: 10,
			LIST_TAG: 20,
			LIST_TAG_FOLLOWED: 20,
			LIST_CATEGORY: 20,
			LIST_COMMENT: 5
		},
		REQUEST: {
			TIMEOUT: 30000
		},
		IMAGES: {
			DEFAULT_IMAGE_AVATAR: 'default_avatar.png'
		},
		META: {
			TITLE: 'De4th Zone',
			DESCRIPTION: 'De4th Zone',
			TWITTER: '@de4th_zone'
		}
	};
	return {
		env,
		reactStrictMode: true,
		images: {
			domains: [
				'backend-forum-example.herokuapp.com',
				'elasticbeanstalk-ap-southeast-1-153036539674.s3-ap-southeast-1.amazonaws.com',
				'de4thzone.s3-ap-southeast-1.amazonaws.com'
			]
		},
		i18n: {
			locales: ['en', 'vi'],
			defaultLocale: 'en'
		}
	};
};

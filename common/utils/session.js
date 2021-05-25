import cookie from 'js-cookie';

export const setCookie = (key, value, sessionCookie = false) => {
	if (process.browser) {
		const options = {
			expires: sessionCookie ? 1 / 4000 : 2,
			domain: process.env.COOKIE_DOMAIN
		};
		if (!process.env.COOKIE_DOMAIN) delete options.domain;
		cookie.set(key, value, options);
	}
};

export const removeCookie = (key, opt) => {
	if (process.browser) cookie.remove(key, opt);
};

export const getCookie = (key, req) => (process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req));

const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (key, req) => {
	if (!req) return undefined;

	if (!req.headers.cookie) return undefined;

	const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));
	if (!rawCookie) return undefined;

	return rawCookie.split('=')[1];
};

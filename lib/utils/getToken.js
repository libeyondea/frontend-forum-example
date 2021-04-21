const getToken = () => {
	if (typeof window === 'undefined') return '';
	const token = window.localStorage.token;
	if (!token) return '';
	if (typeof token !== 'string') return '';
	if (token.trim().length === 0) return '';
	if (!!token) {
		return token;
	}
};

export default getToken;

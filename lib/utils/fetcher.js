import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const fetcher = async (url) => {
	const response = await httpRequest.get({
		url: url,
		token: getCookie('token')
	});
	return response.data;
};

export default fetcher;

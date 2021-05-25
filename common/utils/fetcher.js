import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';

const fetcher = async (url) => {
	const response = await httpRequest.get({
		url: url,
		token: getCookie('token')
	});
	return response.data;
};

export default fetcher;

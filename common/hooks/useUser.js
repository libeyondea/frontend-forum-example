import { useEffect, useState } from 'react';
import useSWR from 'swr';

import fetcher from '@/common/utils/fetcher';
import { getCookie } from '@/common/utils/session';

export default function useUser() {
	const [user, setUser] = useState(null);
	const [isLoadingUser, setIsLoadingUser] = useState(true);
	const { data, mutate: mutateUser } = useSWR(getCookie('token') ? `/current_user` : null, fetcher);

	useEffect(() => {
		if (data) {
			setIsLoadingUser(false);
			if (data.success) {
				setUser(data.data);
			}
		}
	}, [data]);

	return {
		user,
		isLoadingUser,
		mutateUser
	};
}

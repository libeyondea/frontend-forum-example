import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { currentUserRequestedAction } from '@/redux/actions/userAction';

const useAuth = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { asPath } = router;
	useEffect(() => {
		dispatch(currentUserRequestedAction());
	}, [asPath, dispatch]);
};

export default useAuth;

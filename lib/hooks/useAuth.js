import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { currentUserRequestedAction } from '@/redux/actions/userAction';

const useAuth = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(currentUserRequestedAction());
	}, [dispatch]);
};

export default useAuth;

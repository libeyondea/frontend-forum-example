import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { currentUserRequestedAction } from 'redux/actions/userAction';

const withAuth = (WrappedComponent) => {
	const hocComponent = ({ ...props }) => {
		const dispatch = useDispatch();
		const router = useRouter();
		const { asPath } = router;
		useEffect(() => {
			dispatch(currentUserRequestedAction());
		}, [asPath]);
		return <WrappedComponent {...props} />;
	};
	hocComponent.getInitialProps = async (ctx) => {
		const pageProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
		return { ...pageProps };
	};
	return hocComponent;
};

export default withAuth;

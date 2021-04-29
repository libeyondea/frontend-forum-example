import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUserRequestedAction } from 'redux/actions/userAction';

const withAuth = (WrappedComponent) => {
	const HocComponent = ({ ...props }) => {
		const dispatch = useDispatch();
		const router = useRouter();
		const { asPath } = router;
		useEffect(() => {
			dispatch(currentUserRequestedAction());
		}, [asPath, dispatch]);
		return <WrappedComponent {...props} />;
	};
	HocComponent.getInitialProps = async (ctx) => {
		const pageProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
		return { ...pageProps };
	};
	return HocComponent;
};

export default withAuth;

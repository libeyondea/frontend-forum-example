import Router from 'next/router';
import { useEffect, useState } from 'react';

export default function useLoadingServer() {
	const [isLoadingServer, seIsLoadingServer] = useState(false);

	useEffect(() => {
		const start = () => {
			seIsLoadingServer(true);
		};
		const end = () => {
			seIsLoadingServer(false);
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);
	return isLoadingServer;
}

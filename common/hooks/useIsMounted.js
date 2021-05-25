import { useEffect, useRef } from 'react';

const useUpdateEffect = (callback, dependencies) => {
	const isFirstRender = useRef(false);
	useEffect(() => {
		if (!isFirstRender.current) {
			isFirstRender.current = true;
		} else {
			callback();
		}
	}, dependencies);
};

export default useUpdateEffect;

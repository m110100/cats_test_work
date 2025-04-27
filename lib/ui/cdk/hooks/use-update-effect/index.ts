import { useEffect } from 'react';
import { useFirstMount } from '../use-first-mount';

export const useUpdateEffect: typeof useEffect = (callback, deps) => {
	const isFirstMount = useFirstMount();

	useEffect(() => {
		if (!isFirstMount) return callback();
	}, deps);
};

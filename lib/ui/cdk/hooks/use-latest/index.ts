import { useRef } from 'react';

type UseLatestReturn<T> = {
	readonly current: T;
};

export const useLatest = <T>(value: T): UseLatestReturn<T> => {
	const ref = useRef(value);

	ref.current = value;

	return ref;
};

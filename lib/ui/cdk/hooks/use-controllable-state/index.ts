import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { useLatest } from '../use-latest';
import { useUpdateEffect } from '../use-update-effect';

type ChangeHandler<T> = (state: T) => void;
type SetStateFn<T> = Dispatch<SetStateAction<T>>;

type UseControllableState<T> = {
	prop?: T;
	defaultProp: T;
	onChange?: ChangeHandler<T>;
};

const isFunction = (value: unknown): value is (...args: any[]) => any => {
	return typeof value === 'function';
};

export const useControllableState = <T>({
	prop,
	defaultProp,
	onChange,
}: UseControllableState<T>): [T, SetStateFn<T>] => {
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultProp);

	const isControlled = prop !== undefined;
	const value = isControlled ? prop : uncontrolledValue;
	const prevValueRef = useRef(value);

	const onChangeLatest = useLatest(onChange);

	const setValue = useCallback<SetStateFn<T>>(
		(nextValue) => {
			if (isControlled) {
				const newValue = isFunction(nextValue) ? nextValue(prop) : nextValue;

				if (newValue !== prop) onChangeLatest.current?.(newValue);
				else setUncontrolledValue(nextValue);
			}
		},
		[isControlled, onChangeLatest, prop],
	);

	useUpdateEffect(() => {
		if (prevValueRef.current !== value) {
			onChangeLatest.current?.(value);
			prevValueRef.current = value;
		}
	}, [value]);

	return [value, setValue];
};


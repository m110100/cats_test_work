import { useControllableState } from 'lib/ui/cdk/hooks/use-controllable-state';
import { ChangeEvent, forwardRef, InputHTMLAttributes, useId } from 'react';
import styled from 'styled-components';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	label?: string;
	disabled?: boolean;
};

const Container = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
`;
const Label = styled.label`
	user-select: none;
	color: ${({ theme }) => theme.colors.gray[1]};
`;
const Input = styled.input`
	accent-color: ${({ theme }) => theme.colors.blue[1]};
	margin: 0;
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ checked, defaultChecked, disabled, label, onChange, id, ...props }, ref) => {
		const [isChecked, setIsChecked] = useControllableState({
			prop: checked,
			defaultProp: defaultChecked ?? false,
			onChange,
		});
		const identifier = id || `checkbox-${useId()}`;

		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			if (!disabled) setIsChecked(event.target.checked);
		};

		return (
			<Container>
				<Input
					type='checkbox'
					id={identifier}
					checked={isChecked}
					onChange={handleChange}
					disabled={disabled}
					ref={ref}
					{...props}
				/>
				{label && <Label htmlFor={identifier}>{label}</Label>}
			</Container>
		);
	},
);


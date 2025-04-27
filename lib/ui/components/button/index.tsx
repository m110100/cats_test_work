import styled, { css } from 'styled-components';

export type ButtonVariants = 'primary';
export type ButtonSizes = 'md';
export type ButtonProps = {
	variant?: ButtonVariants;
	size?: ButtonSizes;
	disabled?: boolean;
};

export const Button = styled.button<ButtonProps>`
	appearance: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-style: normal;
	user-select: none;
	border-radius: ${({ theme }) => theme.radii[1]};
	border: none;
	box-sizing: border-box;
	transition: background-color ${({ theme }) => theme.transitions.default};
	will-change: background-color;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

	${({ variant = 'primary', theme }) =>
		variant === 'primary' &&
		css`
			background-color: ${theme.colors.blue[1]};
			color: ${theme.colors.blue.contrast};

			&:hover:not(:disabled) {
				background-color: ${theme.colors.blue[2]};
			}
		`}

	${({ size = 'md', theme }) =>
		size === 'md' &&
		css`
			padding: ${theme.spacing[2]};
			font-size: 1rem;
		`}
`;

Button.defaultProps = {
	variant: 'primary',
	size: 'md',
	disabled: false,
};


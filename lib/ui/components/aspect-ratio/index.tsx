import { forwardRef, HTMLAttributes } from 'react';
import styled, { css, DefaultTheme, keyframes } from 'styled-components';

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
	ratio?: number;
	loading?: boolean;
};

const animation = (theme: DefaultTheme) => keyframes`
  0% {
    background-color: ${theme.colors.gray.a2};
  }
  100% {
    background-color: ${theme.colors.gray.a4};
  }
`;

const Wrapper = styled.div<{ $ratio: AspectRatioProps['ratio']; $loading?: boolean }>`
	width: 100%;
	position: relative;
	padding-bottom: ${({ $ratio }) => ($ratio ? `${100 / $ratio}%` : '0')};
	${({ $loading, theme }) =>
		$loading &&
		css`
			animation: ${animation(theme)} 1000ms infinite alternate-reverse;
		`}
`;

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
	({ ratio = 1 / 1, loading = false, children, ...props }, ref) => {
		return (
			<Wrapper $ratio={ratio} $loading={loading}>
				{!loading && (
					<Container ref={ref} {...props}>
						{children}
					</Container>
				)}
			</Wrapper>
		);
	},
);


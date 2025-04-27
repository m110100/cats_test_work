import styled from 'styled-components';

export const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: ${({ theme }) => theme.radii[1]};
	transition: opacity 0.2s ease-in-out;
	will-change: opacity;
`;


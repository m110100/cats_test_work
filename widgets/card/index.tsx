import styled from 'styled-components';

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.375rem;
	border-radius: ${({ theme }) => theme.radii[1]};
	border: 1px solid ${({ theme }) => theme.colors.blue[1]};
	padding: 0.75rem;
`;


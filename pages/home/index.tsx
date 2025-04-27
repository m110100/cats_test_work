import styled from 'styled-components';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCat } from 'entities/cat';
import { Button } from 'lib/ui/components/button';
import { Card } from 'widgets/card';
import { Image } from 'widgets/image';
import { AspectRatio } from 'lib/ui/components/aspect-ratio';
import { Checkbox } from 'lib/ui/components/checkbox';
import { useEffect, useMemo, useState } from 'react';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
`;

const WarningContainer = styled.p<{ $error?: boolean }>`
	max-width: 260px;
	color: ${({ theme, $error }) => ($error ? 'indianred' : theme.colors.gray[1])};
	user-select: none;
	margin: 0;

	> span {
		color: ${({ theme, $error }) => ($error ? 'firebrick' : theme.colors.blue[1])};

		&:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	}
`;

export const HomePage = () => {
	const [isFetchingEnabled, setIsFetchingEnabled] = useState(true);
	const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);

	const autoRefreshInterval = useMemo(() => 5000, []);

	const { data, isLoading, isFetching, isError, refetch } = useQuery({
		queryKey: ['cat'],
		queryFn: () => getCat(),
		enabled: isFetchingEnabled,
		refetchInterval: isAutoRefreshEnabled ? autoRefreshInterval : false,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (!isFetchingEnabled) setIsAutoRefreshEnabled(false);
	}, [isFetchingEnabled]);

	return (
		<Wrapper>
			<Card>
				<Checkbox label='Enabled' checked={isFetchingEnabled} onChange={setIsFetchingEnabled} />
				<Checkbox
					label='Auto-refresh every 5 seconds'
					checked={isAutoRefreshEnabled}
					onChange={setIsAutoRefreshEnabled}
					disabled={!isFetchingEnabled}
				/>
				<Button onClick={() => refetch()} disabled={!isFetchingEnabled || isFetching}>
					{isFetching ? 'Fetching...' : 'Get cat'}
				</Button>
				{!isFetchingEnabled && !data && (
					<WarningContainer>
						{isError ? 'Error occurred.' : "Oops, fetching isn't enabled yet."}{' '}
						<span
							onClick={() => {
								if (!isError) setIsFetchingEnabled(true);
								if (isError) refetch();
							}}
						>
							{isError ? 'Retry' : 'Toggle'}
						</span>{' '}
						{!isError && 'it to see cat images'}
					</WarningContainer>
				)}
				<AspectRatio loading={isLoading || isFetching}>
					{data?.[0]?.url && <Image src={data[0].url} alt='Random cat' />}
				</AspectRatio>
			</Card>
		</Wrapper>
	);
};


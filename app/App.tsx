import styled from 'styled-components';
import { HomePage } from 'pages/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from 'lib/ui/theme/theme';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retryDelay: 10000,
			retry: true,
		},
	},
});

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
`;

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Layout>
					<HomePage />
				</Layout>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;


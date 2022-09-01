import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@terra-money/wallet-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrneProvider } from '~/context/OrneProvider';
import { TxResolverProvider } from '~/context/TxResolverProvider';
import { globalStyles } from '~/components/GlobalStyle';
import type { ReactNode } from 'react';
import type { WalletControllerChainOptions } from '@terra-money/wallet-provider';

const queryClient = new QueryClient();

type AppProvidersProps = {
	children: ReactNode;
} & WalletControllerChainOptions;

export function AppProviders({ children, defaultNetwork, walletConnectChainIds }: AppProvidersProps) {
	globalStyles();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<WalletProvider defaultNetwork={defaultNetwork} walletConnectChainIds={walletConnectChainIds}>
					<OrneProvider>
						<TxResolverProvider>{children}</TxResolverProvider>
					</OrneProvider>
				</WalletProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

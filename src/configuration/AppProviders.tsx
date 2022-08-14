import { WalletProvider } from '@terra-money/wallet-provider';
import { globalStyles } from '~/components/GlobalStyle';
import type { ReactNode } from 'react';
import type { WalletControllerChainOptions } from '@terra-money/wallet-provider';

type AppProvidersProps = {
	children: ReactNode;
} & WalletControllerChainOptions;

export function AppProviders({ children, defaultNetwork, walletConnectChainIds }: AppProvidersProps) {
	globalStyles();

	return (
		<WalletProvider defaultNetwork={defaultNetwork} walletConnectChainIds={walletConnectChainIds}>
			{children}
		</WalletProvider>
	);
}

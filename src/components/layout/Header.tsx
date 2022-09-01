import { Oval } from 'react-loader-spinner';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Wallet } from '~/components/wallet/Wallet';
import { ConnectWalletButton } from '~/components/wallet/ConnectWalletButton';
import { Flex, Text } from '~/components/ui';
import { usePendingTransaction } from '~/hooks/usePendingTransaction';

export function Header() {
	const { status } = useWallet();
	const { pendingTransactions } = usePendingTransaction();

	return (
		<Flex as="header" align={'center'} justify={'end'} gap={4}>
			{pendingTransactions.length > 0 && (
				<Flex
					gap={5}
					align="center"
					css={{ backgroundColor: '$green25', borderRadius: '50px', boxShadow: '$base', padding: '$1 $4' }}
				>
					<Oval
						ariaLabel="loading-indicator"
						height={25}
						width={25}
						strokeWidth={5}
						color="hsl(203,23%,42%)"
						secondaryColor="white"
					/>
					<Text size={1}>Pending Transaction...</Text>
				</Flex>
			)}

			{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
			{status === WalletStatus.WALLET_CONNECTED && <Wallet />}
		</Flex>
	);
}

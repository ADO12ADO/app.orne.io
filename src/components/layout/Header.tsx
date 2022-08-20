import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Wallet } from '~/components/wallet/Wallet';
import { ConnectWalletButton } from '~/components/wallet/ConnectWalletButton';
import { Flex } from '~/components/ui';

export function Header() {
	const { status } = useWallet();

	return (
		<Flex as="header" justify={'end'}>
			{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
			{status === WalletStatus.WALLET_CONNECTED && <Wallet />}
		</Flex>
	);
}

import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Oval, ThreeCircles, ThreeDots } from 'react-loader-spinner';
import { ConnectWalletButton } from '~/components/wallet/ConnectWalletButton';
import { Wallet } from '~/components/wallet/Wallet';

export function Header() {
	const { status } = useWallet();

	// return (
	// 	<Flex as="header" align={'center'} justify={'end'} gap={4}>
	// 		{pendingTransactions.length > 0 && (
	// 			<Flex
	// 				gap={5}
	// 				align="center"
	// 				css={{ backgroundColor: '$green25', borderRadius: '50px', boxShadow: '$base', padding: '$1 $4' }}
	// 			>
	// 				<Oval
	// 					ariaLabel="loading-indicator"
	// 					height={25}
	// 					width={25}
	// 					strokeWidth={5}
	// 					color="hsl(203,23%,42%)"
	// 					secondaryColor="white"
	// 				/>
	// 				<Text size={1}>Pending Transaction...</Text>
	// 			</Flex>
	// 		)}

	// 		{status === WalletStatus.WALLET_CONNECTED && <Wallet />}
	// 	</Flex>
	// );

	return (
		<header className="bg-offWhite fixed bottom-0 left-0 flex w-full items-center justify-center gap-5 p-2 lg:static lg:justify-end lg:bg-transparent">
			{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
			{status === WalletStatus.WALLET_CONNECTED && <Wallet />}
		</header>
	);
}

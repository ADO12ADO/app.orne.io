import { Oval, ThreeCircles, ThreeDots } from 'react-loader-spinner';
import { useConnectedWallet, useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Wallet } from '~/components/wallet/Wallet';
import { ConnectWalletButton } from '~/components/wallet/ConnectWalletButton';
import { usePendingTransaction } from '~/hooks/usePendingTransaction';
import { Icon } from '../ui/Icon';
import { truncate } from '@terra.kitchen/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Popover } from '../ui/Popover';
import { IconToken } from '../ui/IconToken';

export function Header() {
	const { status } = useWallet();
	const { pendingTransactions } = usePendingTransaction();
	const connectedWallet = useConnectedWallet();
	const [isCopy, setIsCopy] = useState<boolean>(false);

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

	// 		{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
	// 		{status === WalletStatus.WALLET_CONNECTED && <Wallet />}
	// 	</Flex>
	// );

	function handleCopyAddress() {
		void navigator.clipboard.writeText(connectedWallet!.terraAddress);
		setIsCopy(true);
		setTimeout(() => {
			setIsCopy(false);
		}, 2000);
	}

	return (
		<header className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-5 bg-offWhite p-2 lg:static lg:justify-end lg:bg-transparent">
			<div className="flex items-center gap-1 text-sm text-mediumGrey">
				<span>112,435.344</span>
				{/* <ThreeDots width={35} color="hsl(230, 21%, 65%)" /> */}
				<span className="hidden rounded-full border border-mediumGrey px-2 py-0.5 leading-none sm:inline">UST</span>
			</div>
			<div className="relative flex items-center gap-2">
				<Icon name="wallet" className="w-7" />
				<AnimatePresence>
					{isCopy && (
						<motion.span
							initial={{ x: 0, y: -8, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -16, opacity: 0 }}
							className="absolute top-7 right-0 rounded-full bg-green px-2 py-1 text-xs text-white"
						>
							Copied!
						</motion.span>
					)}
				</AnimatePresence>
				<span className="cursor-pointer font-semibold" onClick={handleCopyAddress}>
					{/* {truncate(connectedWallet!.terraAddress)} */}
					tx2345...235
				</span>
			</div>
			<Popover title="Your rewards" closable trigger={<Button size="sm">My rewards</Button>}>
				<div className="my-6 flex items-center justify-between border-b border-beige pb-6">
					<span className="text-darkBlue50">Total balance</span>
					<p className="text-2xl font-semibold">
						1490.00 <span className="font-normal">UST</span>
					</p>
				</div>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<IconToken name="orne" size={44} />
							<span className="text-lg font-semibold">ORNE</span>
						</div>
						<div className="flex flex-col text-right">
							<span>0.05343</span>
							<span className="text-mediumGrey">$ 456.23</span>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<IconToken name="astro" size={44} />
							<span className="text-lg font-semibold">ASTRO</span>
						</div>
						<div className="flex flex-col text-right">
							<span>0.05343</span>
							<span className="text-mediumGrey">$ 456.23</span>
						</div>
					</div>
				</div>
				<Button className="mt-6">Claim rewards</Button>
			</Popover>
		</header>
	);
}

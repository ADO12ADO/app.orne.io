import { truncate } from '@terra.kitchen/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import { styled, keyframes } from '~/stitches.config';
import { Text } from '~/components/ui';

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const WalletAddress = styled(Text, {
	color: '$darkBlue',
});

const Trigger = styled(DropdownMenu.Trigger, {
	backgroundColor: '$green25',
	borderRadius: '50px',
	color: '$darkGreen',
	padding: '$2 $4',
});

const Content = styled(DropdownMenu.Content, {
	'backgroundColor': '$offWhite',
	'borderRadius': '$rounded',
	'boxShadow': '$base',
	'marginTop': '$4',
	'padding': '$2 $4',
	'minWidth': '300px',

	'animationDuration': '400ms',
	'animationTimingFunction': 'cubic-bezier(0.16, 1, 0.3, 1)',
	'willChange': 'transform, opacity',
	'&[data-state="open"]': {
		'&[data-side="bottom"]': { animationName: slideUpAndFade },
	},
});

const DisconnectButton = styled('button', {
	backgroundColor: '$green',
	borderRadius: '50px',
	color: '$white',
	padding: '$2 $4',
	width: '100%',
});

export function Wallet() {
	const wallet = useWallet();
	const connectedWallet = useConnectedWallet();

	return (
		<DropdownMenu.Root>
			<Trigger>
				<WalletAddress>{truncate(connectedWallet!.terraAddress)}</WalletAddress>
			</Trigger>

			<Content>
				<DisconnectButton onClick={() => wallet.disconnect()}>Disconnect</DisconnectButton>
			</Content>
		</DropdownMenu.Root>
	);
}

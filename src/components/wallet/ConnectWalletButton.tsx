import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ConnectType, useWallet } from '@terra-money/wallet-provider';
import { styled, keyframes } from '~/stitches.config';

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
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
	'padding': '$1 $4',
	'minWidth': '300px',

	'animationDuration': '400ms',
	'animationTimingFunction': 'cubic-bezier(0.16, 1, 0.3, 1)',
	'willChange': 'transform, opacity',
	'&[data-state="open"]': {
		'&[data-side="bottom"]': { animationName: slideUpAndFade },
	},
});

const Item = styled(DropdownMenu.Item, {
	'unset': 'all',
	'cursor': 'pointer',
	'marginInline': '-$4',
	'paddingInline': '$4',
	'paddingBlock': '$2',
	'position': 'relative',
	'userSelect': 'none',

	'&[data-highlighted]': {
		backgroundColor: '$green',
		color: 'white',
	},
});

export function ConnectWalletButton() {
	const { availableConnections, connect } = useWallet();

	const allowedConnections = availableConnections.filter((connection) =>
		[ConnectType.EXTENSION, ConnectType.WALLETCONNECT].includes(connection.type)
	);

	return (
		<DropdownMenu.Root>
			<Trigger>Connect Wallet</Trigger>

			<Content align={'start'}>
				{allowedConnections.map((connection) => (
					<Item key={connection.type} onClick={() => connect(connection.type)}>
						{connection.name}
					</Item>
				))}
			</Content>
		</DropdownMenu.Root>
	);
}

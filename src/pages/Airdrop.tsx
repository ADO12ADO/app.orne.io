import { ThreeDots } from 'react-loader-spinner';
import { readAmount } from '@terra.kitchen/utils';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { styled } from '~/stitches.config';
import { getAirdropEntry } from '~/data/airdrop';
import { Card, Flex, Text } from '~/components/ui';
import { useAirdropUserInfo } from '~/hooks/useAirdropUserInfo';
import { useClaimAirdrop } from '~/hooks/useClaimAirdrop';
import { useCountdown } from '~/hooks/useCountdown';

export function Airdrop() {
	const connectedWallet = useConnectedWallet();
	const { data: airdropUserInfo, isLoading } = useAirdropUserInfo({ enabled: !!connectedWallet });
	const { mutate: claimAirdrop } = useClaimAirdrop();
	const countdown = useCountdown(new Date('Sept 30, 2022 23:59:59'));
	const airdropEntry = getAirdropEntry(connectedWallet?.walletAddress);

	function executeClaim() {
		claimAirdrop();
	}

	if (!connectedWallet) {
		return <Card>Please, connect your wallet to claim your airdrop.</Card>;
	}

	if (!airdropEntry) {
		return <Card>You are not eligible for the airdrop.</Card>;
	}

	if (isLoading) {
		return (
			<Card>
				<Flex align={'center'} justify={'center'}>
					<ThreeDots color="hsl(203,23%,42%)" height="10" />
				</Flex>
			</Card>
		);
	}

	if (airdropUserInfo!.has_claimed) {
		return <Card>You have already claimed your airdrop.</Card>;
	}

	return (
		<>
			<Card>
				<Flex direction={'column'} align={'center'} justify={'center'} gap={4}>
					<Text>You have an airdrop of</Text>

					<Text size={2} weight={'bold'}>
						{readAmount(airdropEntry.amount, { decimals: 0, comma: true })} $ORNE
					</Text>

					<Flex align={'center'} justify={'between'} gap={4}>
						<Text>
							Claim deadline in {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes.
						</Text>

						<ClaimButton onClick={executeClaim}>Claim</ClaimButton>
					</Flex>
				</Flex>
			</Card>
		</>
	);
}

const ClaimButton = styled('button', {
	backgroundColor: '$green25',
	borderRadius: '50px',
	color: '$darkGreen',
	padding: '$2 $4',
	fontWeight: 'bold',
});

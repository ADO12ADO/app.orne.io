import { readAmount } from '@terra.kitchen/utils';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { getAirdropEntry } from '~/data/airdrop';
import { Card } from '~/components/ui';
import { useAirdropUserInfo } from '~/hooks/useAirdropUserInfo';
import { useClaimAirdrop } from '~/hooks/useClaimAirdrop';

export function Airdrop() {
	const connectedWallet = useConnectedWallet();
	const { data: airdropUserInfo, isLoading } = useAirdropUserInfo({ enabled: !!connectedWallet });
	const { mutate: claimAirdrop } = useClaimAirdrop();

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
		return <Card>Loading...</Card>;
	}

	if (airdropUserInfo!.has_claimed) {
		return <Card>You have already claimed your airdrop.</Card>;
	}

	return (
		<Card>
			{readAmount(airdropEntry.amount)} ORNE <button onClick={executeClaim}>Claim</button>
		</Card>
	);
}

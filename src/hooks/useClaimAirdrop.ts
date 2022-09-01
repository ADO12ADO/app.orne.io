import { MsgExecuteContract } from '@terra-money/terra.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import airdropInfo, { getAirdropEntry } from '~/data/airdrop';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { usePendingTransaction } from '~/hooks/usePendingTransaction';
import { MerkleTree } from '~/utils/merkle';

export function useClaimAirdrop() {
	const app = useApp();
	const queryClient = useQueryClient();
	const connectedWallet = useConnectedWallet();
	const { pushTransaction } = usePendingTransaction();

	return useMutation(
		async () => {
			const account = getAirdropEntry(connectedWallet?.walletAddress);

			if (!account) {
				throw new Error('No airdrop for you');
			}

			const tree = new MerkleTree(airdropInfo);
			const proof = tree.getProof(account);

			const msg = new MsgExecuteContract(connectedWallet!.walletAddress, app.contract.airdrop, {
				claim: {
					claim_amount: account.amount,
					merkle_proof: proof,
				},
			});

			const tx = await connectedWallet!.post({
				msgs: [msg],
			});

			pushTransaction({ tx, customToastMessage: 'Airdrop claimed!' });

			return;
		},
		{
			onSuccess() {
				void queryClient.invalidateQueries(queryKeys.airdropInfo(connectedWallet?.walletAddress));
			},
		}
	);
}

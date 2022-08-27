import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';

export function useAirdropUserInfo({ enabled }: { enabled: boolean }) {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useQuery(
		queryKeys.airdropInfo(connectedWallet?.walletAddress),
		async () => {
			const response = await lcd.wasm.contractQuery(app.contract.airdrop, {
				claim_info: { address: connectedWallet!.walletAddress },
			});

			return AirdropUserInfoSchema.parse(response);
		},
		{ enabled, staleTime: Infinity }
	);
}

const AirdropUserInfoSchema = z.object({
	has_claimed: z.boolean(),
	claimed_amount: z.string(),
});

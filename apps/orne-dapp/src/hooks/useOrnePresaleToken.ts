import { oneMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { z } from 'zod';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { TalisNftInfoSchema, TalisTokensSchema } from '~/schema/tokens';

export function useOrnePresaleToken() {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get presale tokens without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.presaleTokens(connectedWallet.terraAddress),
		queryFn: async () => {
			const response = await lcd.wasm.contractQuery(app.contract.presale, {
				tokens: { owner: connectedWallet.terraAddress, limit: 200 },
			});

			const tokens = TalisTokensSchema.parse(response);

			const response2 = await Promise.all(
				tokens.ids.map((tokenId) => {
					return lcd.wasm.contractQuery(app.contract.presale, {
						nft_info: { token_id: tokenId },
					});
				})
			);

			const tokensWithInfoLink = z.array(TalisNftInfoSchema).parse(response2);

			return Promise.all(
				tokensWithInfoLink.map((tokenInfo) => {
					return fetch(tokenInfo.token_uri).then((r) => r.json());
				})
			);
		},
		staleTime: oneMinute,
	});
}

import { useQuery } from '@tanstack/react-query';
import { useLCDClient, useConnectedWallet } from '@terra-money/wallet-provider';
import * as z from 'zod';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { BalanceSchema } from '~/schema/balance';

export function useOrneBalance() {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get balance without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.balanceOrne(connectedWallet.walletAddress),
		queryFn: async () => {
			const response = await lcd.wasm.contractQuery(app.contract.token, {
				balance: { address: connectedWallet.walletAddress },
			});

			return BalanceSchema.parse(response);
		},
	});
}

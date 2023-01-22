import { useQuery } from '@tanstack/react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { BalanceSchema } from '~/schema/balance';

export function useLPBalance() {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get balance without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.balanceLP(connectedWallet.walletAddress),
		queryFn: async () => {
			const response = await lcd.wasm.contractQuery(app.contract.lp, {
				balance: { address: connectedWallet.walletAddress },
			});

			return BalanceSchema.parse(response);
		},
	});
}

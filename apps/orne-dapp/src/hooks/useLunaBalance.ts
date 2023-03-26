import { oneMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';

export function useLunaBalance() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get balance without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.balanceLuna(connectedWallet.terraAddress),
		queryFn: async () => {
			const [coins] = await lcd.bank.balance(connectedWallet.terraAddress);

			return { balance: coins.get('uluna')?.amount.toString() };
		},
		staleTime: oneMinute,
	});
}

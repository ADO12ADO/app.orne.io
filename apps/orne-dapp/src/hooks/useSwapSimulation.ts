import { useMutation } from '@tanstack/react-query';
import { Dec } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from '~/hooks/useApp';
import { SimulationSchema } from '~/schema/simulation';
import { Token } from '~/utils/constants';

type SwapParams = { amount: string; token: Token };

export function useSwapSimulation() {
	const lcd = useLCDClient();
	const { contract } = useApp();

	return useMutation(async (params: SwapParams) => {
		let query: any;

		if (params.token === Token.Luna) {
			const amount = new Dec(params.amount).times(1_000_000).toString();
			query = {
				simulation: {
					offer_asset: {
						amount,
						info: { native_token: { denom: 'uluna' } },
					},
				},
			};
		} else {
			const amount = new Dec(params.amount).times(1_000_000).toString();
			query = {
				simulation: {
					offer_asset: {
						amount,
						info: { token: { contract_addr: contract.token } },
					},
				},
			};
		}

		const response = await lcd.wasm.contractQuery(contract.orneLunaPair, query);
		return SimulationSchema.parse(response);
	});
}

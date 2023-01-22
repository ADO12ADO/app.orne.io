import { useMutation } from '@tanstack/react-query';
import { Coin, Dec, MsgExecuteContract } from '@terra-money/feather.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from '~/hooks/useApp';
import { usePendingTransaction } from '~/hooks/usePendingTransaction';

type SwapParams = { slippage: string; beliefPrice: string } & (SwapLunaParams | SwapOrneParams);
type SwapLunaParams = { amountLuna: string };
type SwapOrneParams = { amountOrne: string };

export function useSwap() {
	const app = useApp();
	const connectedWallet = useConnectedWallet();
	const { pushTransaction } = usePendingTransaction();

	if (!connectedWallet) {
		throw new Error("Can't swap without connected wallet");
	}

	return useMutation(async (params: SwapParams) => {
		const msg =
			'amountLuna' in params
				? computeSwapLunaToOrneMessage(connectedWallet.walletAddress, app.contract.orneLunaPair, params)
				: computeSwapOrneToLunaMessage(connectedWallet.walletAddress, app.contract.orneLunaPair, params);

		const tx = await connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.156uluna',
			feeDenoms: ['uluna'],
			msgs: [msg],
		});

		pushTransaction({ tx, customToastMessage: 'Swap successful' });
	});
}

function computeSwapLunaToOrneMessage(
	address: string,
	contract: string,
	params: SwapLunaParams & { slippage: string; beliefPrice: string }
) {
	const query = computeSwapLunaToOrneQuery({
		amount: params.amountLuna,
		slippage: params.slippage,
		beliefPrice: params.beliefPrice,
	});

	return new MsgExecuteContract(address, contract, query, [
		new Coin('uluna', new Dec(params.amountLuna).times(1_000_000)),
	]);
}
function computeSwapOrneToLunaMessage(
	address: string,
	contract: string,
	params: SwapOrneParams & { slippage: string; beliefPrice: string }
) {
	const query = computeSwapOrneToLunaQuery({
		contract,
		amount: params.amountOrne,
		slippage: params.slippage,
		beliefPrice: params.beliefPrice,
	});

	return new MsgExecuteContract(address, contract, query);
}

type SwapMessageParams = { amount: string; slippage: string; beliefPrice: string };
function computeSwapLunaToOrneQuery(params: SwapMessageParams) {
	return {
		swap: {
			belief_price: params.beliefPrice,
			max_spread: new Dec(params.slippage).dividedBy(100).toString(),
			offer_asset: {
				amount: new Dec(params.amount).times(1_000_000).toString(),
				info: {
					native_token: {
						denom: 'uluna',
					},
				},
			},
		},
	};
}
function computeSwapOrneToLunaQuery(params: SwapMessageParams & { contract: string }) {
	return {
		send: {
			amount: new Dec(params.amount).times(1_000_000).toString(),
			contract: params.contract,
			msg: btoa(
				JSON.stringify({
					swap: {
						belief_price: params.beliefPrice,
						max_spread: new Dec(params.slippage).dividedBy(100).toString(),
					},
				})
			),
		},
	};
}

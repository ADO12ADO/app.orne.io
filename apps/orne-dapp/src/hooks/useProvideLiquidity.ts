import { useMutation } from '@tanstack/react-query';
import { Coin, Dec, MsgExecuteContract } from '@terra-money/feather.js';
import { ContractAddress } from '~/context/OrneProvider';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';

export function useProvideLiquidity() {
	const app = useApp();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error('No connected wallet found');
	}

	return useMutation({
		mutationFn: async (params: Omit<ProvideLiquidityParams, 'contract' | 'terraAddress'>) => {
			const { increaseAllowanceMsg, provideLiquidityMsg } = computeProvideLiquidityMessage({
				...params,
				contract: app.contract,
				terraAddress: connectedWallet.terraAddress,
			});

			const transaction = await connectedWallet.post({
				chainID: 'pisco-1',
				feeDenoms: ['uluna'],
				gasAdjustment: 1.6,
				gasPrices: { uluna: '0.015' },
				msgs: [increaseAllowanceMsg, provideLiquidityMsg],
			});

			console.log(transaction);
		},
	});
}

interface ProvideLiquidityParams {
	amountOrne: Dec;
	amountLuna: Dec;
	contract: ContractAddress;
	terraAddress: string;
}

function computeProvideLiquidityMessage(params: ProvideLiquidityParams) {
	const amountOrne = params.amountOrne.times(1_000_000).toString();
	const amountLuna = params.amountLuna.times(1_000_000).toString();

	const increaseAllowanceMessage = {
		increase_allowance: {
			amount: amountOrne,
			spender: params.contract.orneLunaPair,
		},
	};

	const provideLiquidityMessage = {
		provide_liquidity: {
			assets: [
				{
					amount: amountOrne,
					info: {
						token: {
							contract_addr: params.contract.token,
						},
					},
				},
				{
					amount: amountLuna,
					info: {
						native_token: {
							denom: 'uluna',
						},
					},
				},
			],
			auto_stake: true,
			slippage_tolerance: '0.02',
		},
	};

	const increaseAllowanceMsg = new MsgExecuteContract(
		params.terraAddress,
		params.contract.token,
		increaseAllowanceMessage
	);

	const provideLiquidityMsg = new MsgExecuteContract(
		params.terraAddress,
		params.contract.orneLunaPair,
		provideLiquidityMessage,
		[new Coin('uluna', amountLuna)]
	);

	return { increaseAllowanceMsg, provideLiquidityMsg };
}

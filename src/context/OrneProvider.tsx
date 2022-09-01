import type { ReactNode } from 'react';
import { createContext, useMemo } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

type Contracts = 'token' | 'airdrop';
type ContractAddress = Record<Contracts, string>;

const kTestnetContract: ContractAddress = {
	token: 'terra1f4mp7uxaq2je5c0mrxe4akd984487lxv4nu2lsyw0gvpr6l63yqsngqu78',
	airdrop: 'terra1rzf2kyujre70v08wuj44s8u2vzjwnn3ev3q835tj89j0ay54q0kqqc6cz9',
};

const kMainnetContract: ContractAddress = {
	token: 'terra19p20mfnvwh9yvyr7aus3a6z6g6uk28fv4jhx9kmnc2m7krg27q2qkfenjw',
	airdrop: 'terra1kgktsdm3j3hw6ces3fxjs58rft5c7cq9dpsrdg2lrqfdgsrs5cjshku3vz',
};

export type OrneContextData = {
	contract: ContractAddress;
};

export const OrneContext = createContext<OrneContextData | null>(null);

export function OrneProvider({ children }: { children: ReactNode }) {
	const { network, status } = useWallet();

	const contract = useMemo(
		() => (network.chainID.startsWith('phoenix') ? kMainnetContract : kTestnetContract),
		[network]
	);

	if (status === WalletStatus.INITIALIZING) {
		return <p>Loading...</p>;
	}

	return <OrneContext.Provider value={{ contract }}>{children}</OrneContext.Provider>;
}

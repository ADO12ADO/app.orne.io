import type { ReactNode } from 'react';
import { createContext, useMemo } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

type Contracts = 'token' | 'airdrop';
type ContractAddress = Record<Contracts, string>;

const kTestnetContract: ContractAddress = {
	token: 'terra1f4mp7uxaq2je5c0mrxe4akd984487lxv4nu2lsyw0gvpr6l63yqsngqu78',
	airdrop: 'terra1h3qxlz5fzl8hht4z8sxc00hzs8mnd34djle5tl0hclwkkxpx8tasa8nh9m',
};

const kMainnetContract: ContractAddress = {
	token: '',
	airdrop: '',
};

export type OrneContextData = {
	contract: ContractAddress;
};

export const OrneContext = createContext<OrneContextData>({} as OrneContextData);

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

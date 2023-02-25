import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { createContext, useMemo } from 'react';
import { Triangle } from 'react-loader-spinner';
import type { ReactNode } from 'react';

type Contracts = 'token' | 'orneLunaPair' | 'lunaUsdcPair' | 'lp' | 'company' | 'astroGenerator';
export type ContractAddress = Record<Contracts, string>;

const kTestnetContract: ContractAddress = {
	token: 'terra17lpau4t55q48g0utuh4cf0mderjkvddv0pdu3lazm6znnp95fq4susnck5',
	orneLunaPair: 'terra1tlscdjfm2rgjf5e8z4rfkspcnu5z4l4g6fh4x5lhmvf62gtxcqjqm5e8f6',
	lunaUsdcPair: 'terra16u6xa76krku3ykxck44x39s62za7qhsh8gr7sk9jwgt8nndwwjnq7c2zr4',
	lp: 'terra1wn5s82w49mnljhs252xtxc3zprxjtz6u0v95pdcjgfac2c87k0gs8semsz',
	company: 'terra102d7hvknwqegydy03kfpapj3zn3m7hschy90qy',
	astroGenerator: 'terra1gc4d4v82vjgkz0ag28lrmlxx3tf6sq69tmaujjpe7jwmnqakkx0qm28j2l',
};

const kMainnetContract: ContractAddress = {
	token: 'terra19p20mfnvwh9yvyr7aus3a6z6g6uk28fv4jhx9kmnc2m7krg27q2qkfenjw',
	orneLunaPair: 'terra1h4cakgms4ju3eryhrmw00xegtjxkgyv88yqllg9ryz9qxek4qz9sz3swn2',
	lunaUsdcPair: 'terra1fd68ah02gr2y8ze7tm9te7m70zlmc7vjyyhs6xlhsdmqqcjud4dql4wpxr',
	lp: 'terra10ht5t5vzpt6lfh8r6lau6mtsha3rqeznhkw5whc65scgrtkqradq0zy9pa',
	company: 'terra102d7hvknwqegydy03kfpapj3zn3m7hschy90qy',
	astroGenerator: 'terra1ksvlfex49desf4c452j6dewdjs6c48nafemetuwjyj6yexd7x3wqvwa7j9',
};

export type OrneContextData = {
	contract: ContractAddress;
};

export const OrneContext = createContext<OrneContextData | null>(null);

export function OrneProvider({ children }: { children: ReactNode }) {
	const { network, status } = useWallet();

	const contract = useMemo(() => {
		const isMainnet = Object.keys(network).some((chainId) => chainId.startsWith('phoenix'));

		return isMainnet ? kMainnetContract : kTestnetContract;
	}, [network]);

	if (status === WalletStatus.INITIALIZING) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: '8px',
				}}
			>
				<Triangle ariaLabel="Loading the dApp" color="hsl(203,23%,42%)" />
				<h1>Orne.io</h1>
			</div>
		);
	}

	return <OrneContext.Provider value={{ contract }}>{children}</OrneContext.Provider>;
}

import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { createContext, useMemo } from 'react';
import { Triangle } from 'react-loader-spinner';
import type { ReactNode } from 'react';

type Contracts = 'token' | 'orneLunaPair' | 'lunaUsdcPair' | 'lp' | 'company' | 'astroGenerator' | 'presale';
export type ContractAddress = Record<Contracts, string>;

const kTestnetContract: ContractAddress = {
	token: 'terra1w8xk6rtu40st6lvl3yv7ynw5urm2n686u9cchvrzltmnktzwdesqcwy0nu',
	orneLunaPair: 'terra170p3ndrfl08eugfds0f7ccpmn7txtfj3awd3se63qwyhuchzkuzqsms430',
	lunaUsdcPair: 'terra16u6xa76krku3ykxck44x39s62za7qhsh8gr7sk9jwgt8nndwwjnq7c2zr4',
	lp: 'terra1h47906nd2gzzszganvr5atgqm73q4rnu5ux80vejcfpu8c3lsursge97qq',
	company: 'terra102d7hvknwqegydy03kfpapj3zn3m7hschy90qy',
	astroGenerator: 'terra1gc4d4v82vjgkz0ag28lrmlxx3tf6sq69tmaujjpe7jwmnqakkx0qm28j2l',
	presale: 'terra17wzrjl43t7wen3fd67t5qg9nzxeqkdffa7wrgr3k4rnv6fz5cv4qyff6c2',
};

const kMainnetContract: ContractAddress = {
	token: 'terra1w8xk6rtu40st6lvl3yv7ynw5urm2n686u9cchvrzltmnktzwdesqcwy0nu',
	orneLunaPair: 'terra170p3ndrfl08eugfds0f7ccpmn7txtfj3awd3se63qwyhuchzkuzqsms430',
	lunaUsdcPair: 'terra1fd68ah02gr2y8ze7tm9te7m70zlmc7vjyyhs6xlhsdmqqcjud4dql4wpxr',
	lp: 'terra1h47906nd2gzzszganvr5atgqm73q4rnu5ux80vejcfpu8c3lsursge97qq',
	company: 'terra102d7hvknwqegydy03kfpapj3zn3m7hschy90qy',
	astroGenerator: 'terra1ksvlfex49desf4c452j6dewdjs6c48nafemetuwjyj6yexd7x3wqvwa7j9',
	presale: 'terra17wzrjl43t7wen3fd67t5qg9nzxeqkdffa7wrgr3k4rnv6fz5cv4qyff6c2',
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
				<h1>ADO</h1>
			</div>
		);
	}

	return <OrneContext.Provider value={{ contract }}>{children}</OrneContext.Provider>;
}

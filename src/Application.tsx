import { useChainOptions } from '@terra-money/wallet-provider';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
		return <span>Loading...</span>;
	}

	return <p>Hello World</p>;
}

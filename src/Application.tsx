import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from '~/configuration/AppProviders';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
		return <span>Loading...</span>;
	}

	return <AppProviders {...chainOptions}>Hello World</AppProviders>;
}

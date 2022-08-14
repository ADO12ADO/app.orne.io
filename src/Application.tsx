import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from '~/configuration/AppProviders';
import { Shell } from '~/components/layout/Shell';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
		return <span>Loading...</span>;
	}

	return (
		<AppProviders {...chainOptions}>
			<Shell>Main</Shell>
		</AppProviders>
	);
}

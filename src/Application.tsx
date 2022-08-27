import { Route, Routes } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from '~/configuration/AppProviders';
import { Shell } from '~/components/layout/Shell';
import { Dashboard } from '~/pages/Dashboard';
import { Airdrop } from '~/pages/Airdrop';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
		return <span>Loading...</span>;
	}

	return (
		<AppProviders {...chainOptions}>
			<Shell>
				<Routes>
					<Route index element={<Dashboard />} />
					<Route path={'/airdrop'} element={<Airdrop />} />
				</Routes>
			</Shell>
		</AppProviders>
	);
}

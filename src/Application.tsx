import { Route, Routes, Navigate } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from '~/configuration/AppProviders';
import { Shell } from '~/components/layout/Shell';
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
					<Route path={'/airdrop'} element={<Airdrop />} />
					<Route path="*" element={<Navigate to="/airdrop" replace />} />
				</Routes>
			</Shell>
		</AppProviders>
	);
}

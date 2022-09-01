import { Triangle } from 'react-loader-spinner';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from '~/configuration/AppProviders';
import { Shell } from '~/components/layout/Shell';
import { Airdrop } from '~/pages/Airdrop';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
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

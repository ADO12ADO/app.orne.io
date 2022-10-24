import { Triangle } from 'react-loader-spinner';
import { Route, Routes } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from '~/configuration/AppProviders';
import { Shell } from '~/components/layout/Shell';
import { Dashboard } from './pages/Dashboard';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import './assets/app.css';
import { Swap } from './pages/Swap';
import { Earn } from './pages/Earn';

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
					<Route path={'/'} element={<Dashboard />} />
					<Route path={'/swap'} element={<Swap />} />
					<Route path={'/earn'} element={<Earn />} />
				</Routes>
			</Shell>
		</AppProviders>
	);
}

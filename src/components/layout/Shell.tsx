import { ToastBar, Toaster } from 'react-hot-toast';
import { keyframes, styled } from '~/stitches.config';
import { Header } from '~/components/layout/Header';
import { Sidebar } from '~/components/layout/Sidebar';
import { Grid } from '~/components/ui';
import { MaxWidthWrapper } from '~/components/MaxWidthWrapper';
import type { ReactNode } from 'react';

const ShellWrapper = styled(Grid, {
	// 'gridTemplateAreas': "'aside header' 'aside main'",
	'gridTemplateAreas': "'header header' 'main main'",
	// 'gridTemplateColumns': '320px 1fr',
	'gridTemplateColumns': '1fr',
	'gridTemplateRows': 'max-content 1fr',
	'height': '100vh',

	'header': {
		gridArea: 'header',
		paddingBottom: '$11',
	},

	'> aside': {
		gridArea: 'aside',
	},

	'main': {
		// 'gridColumnStart': 'aside',
		// 'gridColumnEnd': 'main',
		'gridArea': 'main',

		'@media (min-width: 768px)': {
			gridArea: 'main',
			marginTop: '$11',
		},
	},
});

const slideIn = keyframes({
	'0%': { transform: 'translateX(100%)', opacity: 0 },
	'100%': { transform: 'translateX()', opacity: 1 },
});

const slideOut = keyframes({
	'0%': { transform: 'translateX(0%)', opacity: 1 },
	'100%': { transform: 'translateX(100%)', opacity: 0 },
});

export function Shell({ children }: { children: ReactNode }) {
	return (
		<ShellWrapper>
			{/*<Sidebar />*/}

			<MaxWidthWrapper css={{ paddingBlock: '$11' }}>
				<Header />
				<main>{children}</main>
			</MaxWidthWrapper>

			<Toaster
				toastOptions={{
					className: '',
					style: {
						backgroundColor: 'hsl(168,26%,93%)',
						borderRadius: '5px',
						boxShadow: '$base',
						padding: '8px 16px',
					},
				}}
				containerStyle={{
					right: 50,
					top: 100,
				}}
				position="top-right"
				reverseOrder={false}
			>
				{(t) => (
					<ToastBar
						toast={t}
						style={{
							...t.style,
							animation: t.visible ? `${slideIn} 300ms ease-out forwards` : `${slideOut} 200ms ease-in forwards`,
						}}
					/>
				)}
			</Toaster>
		</ShellWrapper>
	);
}

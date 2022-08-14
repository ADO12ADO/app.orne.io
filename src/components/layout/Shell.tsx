import { styled } from '~/stitches.config';
import { Header } from '~/components/layout/Header';
import { Sidebar } from '~/components/layout/Sidebar';
import { Grid } from '~/components/ui';
import { MaxWidthWrapper } from '~/components/MaxWidthWrapper';
import type { ReactNode } from 'react';

const ShellWrapper = styled(Grid, {
	'gridTemplateAreas': "'aside header' 'aside main'",
	'gridTemplateColumns': '320px 1fr',
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
		'gridColumnStart': 'aside',
		'gridColumnEnd': 'main',

		'@media (min-width: 768px)': {
			gridArea: 'main',
			marginTop: '$11',
		},
	},
});

export function Shell({ children }: { children: ReactNode }) {
	return (
		<ShellWrapper>
			<Sidebar />

			<MaxWidthWrapper css={{ paddingBlock: '$11' }}>
				<Header />
				<main>{children}</main>
			</MaxWidthWrapper>
		</ShellWrapper>
	);
}

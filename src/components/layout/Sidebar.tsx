import { styled } from '~/stitches.config';

const SidebarWrapper = styled('aside', {
	'display': 'none',

	'@media (min-width: 768px)': {
		display: 'block',
		backgroundColor: '$white',
		padding: '$11',
	},
});

export function Sidebar() {
	return <SidebarWrapper>Orne.io</SidebarWrapper>;
}

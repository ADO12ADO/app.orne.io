import { Link } from 'react-router-dom';
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
	return (
		<SidebarWrapper>
			<ul>
				<li>
					<Link to={'/'}>Dashboard</Link>
				</li>
				<li>
					<Link to={'/airdrop'}>Airdrop</Link>
				</li>
			</ul>
		</SidebarWrapper>
	);
}

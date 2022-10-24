import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
import { Icon } from '../ui/Icon';

export function Sidebar() {
	return (
		<div className="fixed flex h-screen w-80 flex-col justify-between bg-white p-10">
			<div>
				<Link to={'/'} className="mb-10 block">
					<img src={logo} alt="Orne.io" width={148} height={50} />
				</Link>
				<ul className="flex flex-col gap-6">
					<li>
						<Link to={'/'} className="flex items-center gap-2 font-semibold transition-colors hover:text-darkBlue50">
							<Icon name="dashboard" />
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							to={'/swap'}
							className="flex items-center gap-2 font-semibold transition-colors hover:text-darkBlue50"
						>
							<Icon name="swap" />
							Swap
						</Link>
					</li>
					<li>
						<Link
							to={'/earn'}
							className="flex items-center gap-2 font-semibold transition-colors hover:text-darkBlue50"
						>
							<Icon name="earn" />
							Earn
						</Link>
					</li>
					{/* <li>
						<Link to={'/'} className="flex items-center gap-2 font-semibold transition-colors hover:text-darkBlue50">
							<Icon name="tree" />
							Trees
						</Link>
					</li> */}
				</ul>
			</div>
			<div>
				<ul className="flex gap-3">
					<li>
						<a href="#" target="_blank" rel="noreferrer nofollow">
							<Icon name="telegram" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="noreferrer nofollow">
							<Icon name="twitter" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="noreferrer nofollow">
							<Icon name="github" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="noreferrer nofollow">
							<Icon name="medium" />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

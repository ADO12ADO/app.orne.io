import plusCurrency from '~/assets/plus-currency.svg';
import { Token } from '~/utils/constants';
import { Button } from '../ui/Button';
import { IconToken } from '../ui/IconToken';

export function ProvideForm() {
	return (
		<>
			<div className="mb-5 flex items-center gap-2">
				<h2 className="text-3xl font-semibold">
					Stake <span className="text-green">ORNE</span> and Luna
				</h2>
				<button className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white">
					Max
				</button>
			</div>
			<div className="mb-10 flex flex-col gap-8 lg:flex-row">
				<div className="flex-1">
					<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="text-darkBlue50 mb-3">Balance</span>
							<span className="text-darkBlue50 mb-3">0.048429</span>
						</div>
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">1490.00</span>
							<div className="flex items-center gap-2">
								<IconToken name={Token.Orne} size={36} />
								<span className="text-mediumGrey">ORNE</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center lg:h-32">
					<button className="block h-[60px] w-[60px] rounded-full shadow-lg">
						<img src={plusCurrency} alt="Swap currency" />
					</button>
				</div>
				<div className="flex-1">
					<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="text-darkBlue50 mb-3">Balance</span>
							<span className="text-darkBlue50 mb-3">0.048429</span>
						</div>
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">30766.618259</span>
							<div className="flex items-center gap-2">
								<IconToken name={Token.Luna} size={36} />
								<span className="text-mediumGrey">LUNA</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Button className="mb-14">Stake tokens</Button>
		</>
	);
}

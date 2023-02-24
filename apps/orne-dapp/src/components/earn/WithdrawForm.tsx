import swapCurrency from '~/assets/swap-currency.svg';
import { Token } from '~/utils/constants';
import { Button } from '../ui/Button';
import { IconToken } from '../ui/IconToken';

export function WithdrawForm() {
	return (
		<>
			<div className="mb-5 flex items-center gap-2">
				<h2 className="text-3xl font-semibold">
					Stake <span className="text-green">ORNE</span> and UST
				</h2>
				<button className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white">
					Max
				</button>
			</div>

			<div className="mb-10 flex flex-col items-center gap-8">
				<div className="w-full flex-1">
					<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="text-darkBlue50 mb-3">Balance</span>
							<div className="-mt-2 flex items-center gap-2">
								<span className="text-darkBlue50">0.048429</span>
								<button className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white">
									Max
								</button>
							</div>
						</div>
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">1490.00</span>
							<div className="flex items-center gap-2">
								<IconToken name={Token.Orne} size={36} />
								<IconToken name={Token.Luna} size={36} />
								<span className="text-mediumGrey">LP</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex h-10 items-center">
					<button className="block h-[60px] w-[60px] rotate-90 rounded-full shadow-lg">
						<img src={swapCurrency} alt="Swap currency" />
					</button>
				</div>
				<div className="w-full flex-1">
					<div className="bg-offWhite flex h-24 flex-1 justify-between rounded-lg p-8 shadow-sm">
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold">0</span>
							<IconToken name={Token.Orne} size={36} />
							<span className="text-mediumGrey text-lg">ORNE</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold">0</span>
							<IconToken name={Token.Luna} size={36} />
							<span className="text-mediumGrey text-lg">LUNA</span>
						</div>
					</div>
				</div>
			</div>

			<Button className="mb-14">Withdraw</Button>
		</>
	);
}

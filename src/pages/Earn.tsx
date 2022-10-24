import { IconToken } from '~/components/ui/IconToken';
import plusCurrency from '~/assets/plus-currency.svg';
import swapCurrency from '~/assets/swap-currency.svg';
import { Button } from '~/components/ui/Button';

export function Earn() {
	return (
		<div className="-mt-6">
			<div className="mb-20">
				<h1 className="mb-5 text-5xl font-bold">
					<span className="earn-underline">Earn</span> tokens
				</h1>
				<h2 className="text-2xl">
					Stake your tokens to earn <span className="text-green">$ORNE</span>
				</h2>
			</div>

			<div className="flex flex-1 items-center justify-between gap-10 rounded-lg bg-offWhite p-8 shadow-sm">
				<div className="flex flex-col">
					<span className="mb-2 text-lg font-semibold">ORNE / LUNA</span>
					<div className="flex gap-2">
						<IconToken name="orne" size={36} />
						<IconToken name="luna" size={36} />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-darkBlue50">APR</span>
					<span className="text-2xl font-semibold">25.36%</span>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-darkBlue50">Liquidity</span>
					<span className="text-2xl font-semibold">
						1,847,487.17 <span className="text-base font-normal">UST</span>
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-darkBlue50">Stacked</span>
					<span className="text-2xl font-semibold">
						~16,965 <span className="text-base font-normal">LP</span>
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-darkBlue50">Rewards</span>
					<div className="relative flex gap-3">
						<div>
							<span className="text-2xl font-semibold">
								145.68 <span className="text-base font-normal">ORNE</span>
							</span>
							<span className="absolute -bottom-5 left-0 text-sm text-green">+ 45.68 ASTRO</span>
						</div>
						<button className="flex h-7 items-center justify-center rounded-lg border border-green px-3 font-semibold transition-colors hover:bg-green hover:text-white">
							Claim
						</button>
					</div>
				</div>
			</div>

			<div className="mb-20 flex w-full justify-end gap-3 p-5">
				<Button className="w-1/5">Provide</Button>
				<Button variant="outline" className="w-1/5">
					Withdraw
				</Button>
			</div>

			{/* PROVIDE */}

			{/* <div className="mb-5 flex items-center gap-2">
				<h2 className="text-3xl font-semibold">
					Stake <span className="text-green">ORNE</span> and UST
				</h2>
				<button className="flex h-7 items-center justify-center rounded-lg border border-green bg-green25 px-3 font-semibold transition-colors hover:bg-green hover:text-white">
					Max
				</button>
			</div>

			<div className="mb-10 flex gap-8">
				<div className="flex-1">
					<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="mb-3 text-darkBlue50">Balance</span>
							<span className="mb-3 text-darkBlue50">0.048429</span>
						</div>
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">1490.00</span>
							<div className="flex items-center gap-2">
								<IconToken name="orne" size={36} />
								<span className="text-mediumGrey">ORNE</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex h-32 items-center">
					<button className="block h-[60px] w-[60px] rounded-full shadow-lg">
						<img src={plusCurrency} alt="Swap currency" />
					</button>
				</div>
				<div className="flex-1">
					<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="mb-3 text-darkBlue50">Balance</span>
							<span className="mb-3 text-darkBlue50">0.048429</span>
						</div>
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">30766.618259</span>
							<div className="flex items-center gap-2">
								<IconToken name="luna" size={36} />
								<span className="text-mediumGrey">LUNA</span>
							</div>
						</div>
					</div>
				</div>
			</div> */}

			{/* WITHDRAW */}

			<div className="mb-5 flex items-center gap-2">
				<h2 className="text-3xl font-semibold">
					Stake <span className="text-green">ORNE</span> and UST
				</h2>
				<button className="flex h-7 items-center justify-center rounded-lg border border-green bg-green25 px-3 font-semibold transition-colors hover:bg-green hover:text-white">
					Max
				</button>
			</div>

			<div className="mb-10 flex flex-col items-center gap-8">
				<div className="w-full flex-1">
					<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="mb-3 text-darkBlue50">Balance</span>
							<div className="flex items-center gap-2">
								<span className="text-darkBlue50">0.048429</span>
								<button className="flex h-7 items-center justify-center rounded-lg border border-green bg-green25 px-3 font-semibold transition-colors hover:bg-green hover:text-white">
									Max
								</button>
							</div>
						</div>
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">1490.00</span>
							<div className="flex items-center gap-2">
								<IconToken name="orne" size={36} />
								<IconToken name="luna" size={36} />
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
					<div className="flex h-24 flex-1 justify-between rounded-lg bg-offWhite p-8 shadow-sm">
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold">0</span>
							<IconToken name="orne" size={36} />
							<span className="text-lg text-mediumGrey">ORNE</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold">0</span>
							<IconToken name="luna" size={36} />
							<span className="text-lg text-mediumGrey">LUNA</span>
						</div>
					</div>
				</div>
			</div>

			<Button>Stake tokens</Button>
		</div>
	);
}

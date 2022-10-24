import { Icon } from '~/components/ui/Icon';
import { IconToken } from '~/components/ui/IconToken';
import Tooltip from '~/components/ui/Tooltip';

export function Dashboard() {
	return (
		<div className="-mt-6">
			<div className="mb-20">
				<h1 className="mb-5 text-5xl font-bold">
					Your <span className="dashboard-underline">dashboard</span>
				</h1>
				<h2 className="text-2xl">
					Instantly trade <span className="text-green">$ORNE</span> and UST
				</h2>
			</div>

			<div className="mb-20 flex gap-10">
				<div className="mt-9">
					<div className="flex items-center gap-2">
						<IconToken name="orne" size={60} />
						<div className="flex flex-col">
							<span className="font-semibold">ORNE</span>
							<span>UST</span>
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-8">
					<div className="flex flex-1 gap-8">
						<div className="flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<div className="flex items-center gap-2">
								<span className="text-darkBlue50">Token price</span>
								<Tooltip
									trigger={
										<div>
											<Icon name="info-min" />
										</div>
									}
								>
									Lorem ipsum
								</Tooltip>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									0.048678 <span className="font-normal">UST</span>
								</span>
								<span className="inline-flex h-8 items-center rounded-lg border border-green bg-green25 px-2 font-semibold text-darkGreen">
									+1.40%
								</span>
								<span className="text-lg font-semibold text-mediumGrey">24h</span>
							</div>
						</div>
						<div className="flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Market Cap</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									2,668,606.16 <span className="font-normal">UST</span>
								</span>
							</div>
						</div>
						<div className="flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Fully Diluted Valuation</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									4,929,707.89 <span className="font-normal">UST</span>
								</span>
							</div>
						</div>
					</div>

					<div className="flex flex-1 gap-8">
						<div className="flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Total Liquidity</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									0.048678 <span className="font-normal">UST</span>
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex flex-col">
									<span className="text-sm font-semibold">Pooled ORNE</span>
									<span className="text-sm text-mediumGrey">18,993,531.88</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-semibold">Pooled LUNA</span>
									<span className="text-sm text-mediumGrey">18,993,531.88</span>
								</div>
							</div>
						</div>
						<div className="flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Volume (24h)</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									0.048678 <span className="font-normal">UST</span>
								</span>
								<span className="inline-flex h-8 items-center rounded-lg border border-red bg-red25 px-2 font-semibold text-darkRed">
									-0.20%
								</span>
								<span className="text-lg font-semibold text-mediumGrey">24h</span>
							</div>
						</div>
						<div className="flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Pool APR</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									4,929,707.89 <span className="font-normal">UST</span>
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex flex-col">
									<span className="text-sm font-semibold">ASTRO APR</span>
									<span className="text-sm text-mediumGrey">0.56%</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-semibold">ORNE APR</span>
									<span className="text-sm text-mediumGrey">0.47%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h2 className="mb-5 text-2xl font-semibold">Your wallet</h2>

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
			</div>
		</div>
	);
}

import { ThreeDots } from 'react-loader-spinner';
import { Icon } from '~/components/ui/Icon';
import { IconToken } from '~/components/ui/IconToken';
import Tooltip from '~/components/ui/Tooltip';
import { useOrnePoolInfo } from '~/hooks/useOrnePoolInfo';
import { useOrneTokenData } from '~/hooks/useOrneTokenData';
import { Token } from '~/utils/constants';
import { readAmount } from '~/utils/readAmount';
import { readPercent } from '~/utils/readPercent';

export function Dashboard() {
	const ornePoolInfo = useOrnePoolInfo();

	const { APR, ornePriceInUSD, totalLiquidity, fullyDilutedValue, marketCap, isLoading } = useOrneTokenData();

	return (
		<div className="mt-5 lg:-mt-6">
			<div className="text-center lg:mb-20 lg:text-left">
				<h1 className="mb-5 text-5xl font-bold">
					Your <span className="dashboard-underline">dashboard</span>
				</h1>
				<h2 className="text-2xl">
					All information about <span className="text-green">$ORNE</span>
				</h2>
			</div>

			{isLoading ? (
				<div className="flex justify-center">
					<ThreeDots color="hsl(203,23%,42%)" height="30" />
				</div>
			) : (
				<>
					<div className="mb-20 flex flex-col gap-10 xl:flex-row">
						<div className="mt-9">
							<div className="flex items-center gap-2">
								<IconToken name={Token.Orne} size={60} />
								<div className="flex flex-col">
									<span className="font-semibold">ORNE</span>
								</div>
							</div>
						</div>

						<div className="flex flex-1 flex-col gap-8">
							<div className="flex flex-1 flex-col gap-8 xl:flex-row">
								{/* Price */}
								<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg p-7 shadow-sm">
									<div className="flex items-center gap-2">
										<span className="text-darkBlue50">Token price</span>
										<Tooltip
											trigger={
												<div>
													<Icon name="info-min" />
												</div>
											}
										>
											The value is computed directly from the pool reserves.
										</Tooltip>
									</div>
									<div className="flex items-center gap-2">
										{ornePoolInfo.isLoading ? (
											<div>
												<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
											</div>
										) : (
											<div className="text-2xl font-semibold">
												{ornePoolInfo.data!.orne_price} <span className="font-normal">Luna</span>{' '}
												<small className="text-sm">($ {ornePriceInUSD?.toFixed(3)})</small>
											</div>
										)}

										{/*<span className="inline-flex h-8 items-center rounded-lg border border-green bg-green25 px-2 font-semibold text-darkGreen">*/}
										{/*	+1.40%*/}
										{/*</span>*/}
										{/*<span className="text-lg font-semibold text-mediumGrey">24h</span>*/}
									</div>
								</div>

								{/* Market Cap */}
								<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg p-7 shadow-sm">
									<span className="text-darkBlue50">Market Cap</span>
									<div className="flex items-center gap-2">
										<span className="text-2xl font-semibold">
											{readAmount(marketCap?.toFixed(2), { micro: false })} <span className="font-normal">$</span>
										</span>
									</div>
								</div>

								{/* FDV */}
								<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg p-7 shadow-sm">
									<span className="text-darkBlue50">Fully Diluted Valuation</span>
									<div className="flex items-center gap-2">
										<span className="text-2xl font-semibold">
											{readAmount(fullyDilutedValue?.toFixed(2), { micro: false })}{' '}
											<span className="font-normal">$</span>
										</span>
									</div>
								</div>
							</div>

							<div className="flex flex-1 flex-col gap-8 xl:flex-row">
								{/* Liquidity */}
								<div className="bg-offWhite flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg p-7 shadow-sm">
									<span className="text-darkBlue50">Total Liquidity</span>
									<div className="flex items-center gap-2">
										{!totalLiquidity ? (
											<div>
												<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
											</div>
										) : (
											<span className="text-2xl font-semibold">
												{readAmount(totalLiquidity)} <span className="font-normal">$</span>
											</span>
										)}
									</div>

									<div className="flex items-center justify-between">
										<div className="flex flex-col">
											<span className="text-sm font-semibold">Pooled ORNE</span>
											<div className="text-mediumGrey text-sm">
												{ornePoolInfo.isLoading ? (
													<div>
														<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
													</div>
												) : (
													<span className="text-mediumGrey text-sm">
														{readAmount(ornePoolInfo.data!.orne, { decimals: 6, comma: true, fixed: 3 })}
													</span>
												)}
											</div>
										</div>
										<div className="flex flex-col">
											<span className="text-sm font-semibold">Pooled LUNA</span>
											<span className="text-mediumGrey text-sm">
												{ornePoolInfo.isLoading ? (
													<div>
														<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
													</div>
												) : (
													<span className="text-mediumGrey text-sm">
														{readAmount(ornePoolInfo.data!.luna, { decimals: 6, comma: true, fixed: 3 })}
													</span>
												)}
											</span>
										</div>
									</div>
								</div>

								{/* Pool APR */}
								<div className="bg-offWhite flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg p-7 shadow-sm">
									<div className="flex items-center gap-2">
										<span className="text-darkBlue50">Pool APR</span>
										<Tooltip
											trigger={
												<div>
													<Icon name="info-min" />
												</div>
											}
										>
											Retrieved for the Orne/Luna pool.
										</Tooltip>
									</div>

									<div className="flex items-center gap-2">
										<span className="text-2xl font-semibold">
											{readPercent(APR)} <span className="font-normal">%</span>
										</span>
									</div>
									{/*<div className="flex items-center justify-between">*/}
									{/*	<div className="flex flex-col">*/}
									{/*		<span className="text-sm font-semibold">ASTRO APR</span>*/}
									{/*		<span className="text-sm text-mediumGrey">0.56%</span>*/}
									{/*	</div>*/}
									{/*	<div className="flex flex-col">*/}
									{/*		<span className="text-sm font-semibold">ORNE APR</span>*/}
									{/*		<span className="text-sm text-mediumGrey">0.47%</span>*/}
									{/*	</div>*/}
									{/*</div>*/}
								</div>
							</div>
						</div>
					</div>

					{/*<h2 className="mb-5 text-2xl font-semibold">Your wallet</h2>*/}

					{/*<div className="mb-10 flex flex-col gap-8 xl:flex-row">*/}
					{/*	<div className="flex-1">*/}
					{/*		<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">*/}
					{/*			<div className="flex w-full justify-between">*/}
					{/*				<span className="mb-3 text-darkBlue50">Balance</span>*/}
					{/*				<span className="mb-3 text-darkBlue50">0.048429</span>*/}
					{/*			</div>*/}
					{/*			<div className="flex justify-between">*/}
					{/*				<span className="text-2xl font-semibold">1490.00</span>*/}
					{/*				<div className="flex items-center gap-2">*/}
					{/*					<IconToken name="orne" size={36} />*/}
					{/*					<span className="text-mediumGrey">ORNE</span>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*	<div className="flex-1">*/}
					{/*		<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">*/}
					{/*			<div className="flex w-full justify-between">*/}
					{/*				<span className="mb-3 text-darkBlue50">Balance</span>*/}
					{/*				<span className="mb-3 text-darkBlue50">0.048429</span>*/}
					{/*			</div>*/}
					{/*			<div className="flex justify-between">*/}
					{/*				<span className="text-2xl font-semibold">30766.618259</span>*/}
					{/*				<div className="flex items-center gap-2">*/}
					{/*					<IconToken name="luna" size={36} />*/}
					{/*					<span className="text-mediumGrey">LUNA</span>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</>
			)}
		</div>
	);
					}

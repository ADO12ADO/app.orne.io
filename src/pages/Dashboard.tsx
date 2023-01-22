import { Dec } from '@terra-money/feather.js';
import { readAmount } from '@terra.kitchen/utils';
import { useMemo } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Icon } from '~/components/ui/Icon';
import { IconToken } from '~/components/ui/IconToken';
import Tooltip from '~/components/ui/Tooltip';
import { useLunaPoolInfo } from '~/hooks/useLunaPoolInfo';
import { useOrnePoolInfo } from '~/hooks/useOrnePoolInfo';

export function Dashboard() {
	const ornePoolInfo = useOrnePoolInfo();
	const lunaPoolInfo = useLunaPoolInfo();

	const totalLiquidity = useMemo(() => {
		if (ornePoolInfo.isLoading || lunaPoolInfo.isLoading) {
			return null;
		}

		const lunaPriceInUSD = lunaPoolInfo.data!.luna_price;
		const ornePriceInUSD = new Dec(ornePoolInfo.data!.orne_price).times(lunaPriceInUSD);
		const orneQuantity = readAmount(ornePoolInfo.data!.orne);
		const lunaQuantity = readAmount(ornePoolInfo.data!.luna);
		const lunaTotalPriceInUSD = new Dec(lunaQuantity).times(lunaPriceInUSD);
		const orneTotalPriceInUSD = new Dec(orneQuantity).times(ornePriceInUSD);

		return lunaTotalPriceInUSD.add(orneTotalPriceInUSD).times(1_000_000).toString();
	}, [ornePoolInfo.data, lunaPoolInfo.data]);

	return (
		<div className="mt-5 lg:-mt-6">
			<div className="text-center lg:mb-20 lg:text-left">
				<h1 className="mb-5 text-5xl font-bold">
					Your <span className="dashboard-underline">dashboard</span>
				</h1>
				<h2 className="text-2xl">
					Instantly trade <span className="text-green">$ORNE</span> and Luna
				</h2>
			</div>

			<div className="mb-20 flex flex-col gap-10 xl:flex-row">
				<div className="mt-9">
					<div className="flex items-center gap-2">
						<IconToken name="orne" size={60} />
						<div className="flex flex-col">
							<span className="font-semibold">ORNE</span>
							<span>Luna</span>
						</div>
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-8">
					<div className="flex flex-1 flex-col gap-8 xl:flex-row">
						{/* Price */}
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
								{ornePoolInfo.isLoading ? (
									<div>
										<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
									</div>
								) : (
									<div className="text-2xl font-semibold">
										{ornePoolInfo.data!.orne_price} <span className="font-normal">Luna</span>
									</div>
								)}

								{/*<span className="inline-flex h-8 items-center rounded-lg border border-green bg-green25 px-2 font-semibold text-darkGreen">*/}
								{/*	+1.40%*/}
								{/*</span>*/}
								{/*<span className="text-lg font-semibold text-mediumGrey">24h</span>*/}
							</div>
						</div>

						{/* Market Cap */}
						<div className="flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Market Cap</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									2,668,606.16 <span className="font-normal">UST</span>
								</span>
							</div>
						</div>

						{/* FDV */}
						<div className="flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Fully Diluted Valuation</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									4,929,707.89 <span className="font-normal">UST</span>
								</span>
							</div>
						</div>
					</div>

					<div className="flex flex-1 flex-col gap-8 xl:flex-row">
						{/* Liquidity */}
						<div className="flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Total Liquidity</span>
							<div className="flex items-center gap-2">
								{!totalLiquidity ? (
									<div>
										<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
									</div>
								) : (
									<span className="text-2xl font-semibold">
										{readAmount(totalLiquidity, { decimals: 6, comma: true, fixed: 3 })}{' '}
										<span className="font-normal">$</span>
									</span>
								)}
							</div>

							<div className="flex items-center justify-between">
								<div className="flex flex-col">
									<span className="text-sm font-semibold">Pooled ORNE</span>
									<div className="text-sm text-mediumGrey">
										{ornePoolInfo.isLoading ? (
											<div>
												<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
											</div>
										) : (
											<span className="text-sm text-mediumGrey">
												{readAmount(ornePoolInfo.data!.orne, { decimals: 6, comma: true, fixed: 3 })}
											</span>
										)}
									</div>
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-semibold">Pooled LUNA</span>
									<span className="text-sm text-mediumGrey">
										{ornePoolInfo.isLoading ? (
											<div>
												<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
											</div>
										) : (
											<span className="text-sm text-mediumGrey">
												{readAmount(ornePoolInfo.data!.luna, { decimals: 6, comma: true, fixed: 3 })}
											</span>
										)}
									</span>
								</div>
							</div>
						</div>

						{/* Volume */}
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

						{/* Pool APR */}
						<div className="flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg bg-offWhite p-7 shadow-sm">
							<span className="text-darkBlue50">Pool APR</span>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold">
									1.0 <span className="font-normal">%</span>
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
		</div>
	);
}

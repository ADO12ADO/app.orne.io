import { useLPBalance } from '~/hooks/useLPBalance';
import { readAmount } from '~/utils/readAmount';

export function PoolStakedToken() {
	const { data: lpBalance, isLoading: isLoadingBalance } = useLPBalance();

	return (
		<div className="flex flex-col gap-2">
			<span className="text-darkBlue50">Stacked</span>
			<span className="text-2xl font-semibold">
				~{readAmount(lpBalance?.balance)} <span className="text-base font-normal">LP</span>
			</span>
		</div>
	);
}

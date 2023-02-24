import { Dec } from '@terra-money/feather.js';

export function readAmount(amount: string | null | undefined) {
	if (!amount) return 0;

	return new Intl.NumberFormat('en-US').format(Number(new Dec(amount).dividedBy(1_000_000).toFixed(2)));
}

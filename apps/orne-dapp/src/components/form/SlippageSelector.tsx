import { useState } from 'react';
import { AmountInput } from '~/components/form/AmountInput';

type SlippageSelectorProps = {
	slippage: number;
	onSlippageChange: (slippage: number) => void;
};

const kSlippageOptions = [0.5, 1, 4];

export function SlippageSelector({ slippage, onSlippageChange }: SlippageSelectorProps) {
	const [isCustomAmount, setIsCustomAmount] = useState(false);

	function handleSlippageChange(slippage: number, isCustomAmount = false) {
		onSlippageChange(slippage);
		setIsCustomAmount(isCustomAmount);
	}

	return (
		<div className="mb-5 flex flex-col gap-2 xl:flex-row xl:gap-8">
			<span className="text-center text-lg font-semibold">Slippage</span>
			<div className="flex w-full gap-2">
				{kSlippageOptions.map((slippageOption) => (
					<button
						className={`flex flex-1 items-center justify-center rounded-lg border border-green font-semibold transition-colors hover:bg-green hover:text-white ${
							!isCustomAmount && slippage === slippageOption ? 'bg-green text-white' : 'bg-transparent text-green'
						}}}`}
						key={slippageOption}
						onClick={() => handleSlippageChange(slippageOption)}
					>
						{slippageOption}%
					</button>
				))}

				<AmountInput
					className="block w-1/5 rounded-lg border border-mediumGrey bg-transparent px-3 font-semibold placeholder-gray-300"
					placeholder="0.5%"
					value={(isCustomAmount && slippage.toString()) || ''}
					onChange={(slippage) => handleSlippageChange(slippage, true)}
				/>
			</div>
		</div>
	);
}

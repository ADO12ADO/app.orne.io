import { string } from '@orne/utils';
import { Dec } from '@terra-money/feather.js';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';
import swapCurrency from '~/assets/swap-currency.svg';
import { AmountInput } from '~/components/form/AmountInput';
import { useLPBalance } from '~/hooks/useLPBalance';
import { useShare } from '~/hooks/useShare';
import { useWithdrawLiquidity } from '~/hooks/useWithdrawLiquidity';
import { Token } from '~/utils/constants';
import { readAmount } from '~/utils/readAmount';
import { Button } from '../ui/Button';
import { IconToken } from '../ui/IconToken';

export function WithdrawForm() {
  const { data: lpBalance, isLoading } = useLPBalance();
  const { data: withdrawing, isLoading: isLoadingShare } = useShare();
  const { mutate: withdraw } = useWithdrawLiquidity();

  const [amount, setAmount] = useState('');
  const [debouncedAmount] = useDebounce(amount, 700);

  function handleMaxClick() {
    if (lpBalance) {
      const maxAmount = readAmount(lpBalance?.stakedLPBalance);
      setAmount(maxAmount);
    }
  }

  function handlePercentageClick(percentage: number) {
    if (lpBalance) {
      const percentageAmount = (percentage / 100) * readAmount(lpBalance?.stakedLPBalance);
      setAmount(percentageAmount.toString());
    }
  }

  function handleSubmit() {
    withdraw(
      { amount: new Dec(string.transformToValidInput(amount)) },
      {
        onSuccess() {
          setAmount('');
        },
      }
    );
  }

return (
  <>
    <div className="mb-5 flex items-center gap-2">
      <h2 className="text-3xl font-semibold">
        Withdraw <span className="text-green">LP</span>
      </h2>
      <button
        type="button"
        className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white"
        onClick={handleMaxClick}
      >
        Max
      </button>
      <button
        type="button"
        className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white"
        onClick={() => handlePercentageClick(25)}
      >
        25%
      </button>
      <button
        type="button"
        className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white"
        onClick={() => handlePercentageClick(50)}
      >
        50%
      </button>
    </div>

    <div className="mb-10 flex flex-col items-center gap-8">
      <div className="w-full flex-1">
        <div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
          <div className="flex w-full justify-between">
            <span className="text-darkBlue50 mb-3">Balance</span>
            <div className="-mt-2 flex items-center gap-2">
              <span className="text-darkBlue50">
                {isLoading ? (
                  <ThreeDots color="hsl(203,23%,42%)" height="10" />
                ) : (
                  readAmount(lpBalance?.stakedLPBalance)
                )}
              </span>
              <button
                type="button"
                className="border-green bg-green25 hover:bg-green flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white"
                onClick={handleMaxClick}
              >
                Max
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <AmountInput className="bg-offWhite text-2xl font-semibold" value={amount} onChange={setAmount} />
            <div className="flex items-center gap-2">
              <IconToken name={Token.Orne} size={36} />
              <IconToken name={Token.Luna} size={36} />
              <span className="text-mediumGrey">LP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-10 items-center">
        <div className="block h-[60px] w-[60px] rotate-90 rounded-full shadow-lg">
          <img src={swapCurrency} alt="Swap currency" />
        </div>
      </div>

      <div className="w-full flex-1">
        <div className="bg-offWhite flex h-24 flex-1 justify-between rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-2">
            {isLoadingShare ? (
              <ThreeDots color="hsl(203,23%,42%)" height="10" />
            ) : (
              <span className="text-2xl font-semibold">{readAmount(withdrawing?.amountOrne, { micro: false })}</span>
            )}
            <IconToken name={Token.Orne} size={36} />
            <span className="text-mediumGrey text-lg">ORNE</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoadingShare ? (
              <ThreeDots color="hsl(203,23%,42%)" height="10" />
            ) : (
              <span className="text-2xl font-semibold">{readAmount(withdrawing?.amountLuna, { micro: false })}</span>
            )}
            <IconToken name={Token.Luna} size={36} />
            <span className="text-mediumGrey text-lg">LUNA</span>
          </div>
        </div>
      </div>
    </div>

    <Button className="mb-14" onClick={handleSubmit}>
      Withdraw
    </Button>
  </>
);
}

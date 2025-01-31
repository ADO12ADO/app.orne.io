import { string } from '@orne/utils';
import { Dec } from '@terra-money/feather.js';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebouncedCallback } from 'use-debounce';
import plusCurrency from '~/assets/plus-currency.svg';
import { AmountInput } from '~/components/form/AmountInput';
import { useLunaBalance } from '~/hooks/useLunaBalance';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { useProvideLiquidity } from '~/hooks/useProvideLiquidity';
import { useSwapSimulation } from '~/hooks/useSwapSimulation';
import { Token } from '~/utils/constants';
import { readAmount } from '~/utils/readAmount';
import { Button } from '../ui/Button';
import { IconToken } from '../ui/IconToken';

export function ProvideForm() {
  const { data: orneBalance, isLoading: isLoadingOrneBalance } = useOrneBalance();
  const { data: lunaBalance, isLoading: isLoadingLunaBalance } = useLunaBalance();

  const { mutate: provide } = useProvideLiquidity();
  const { mutateAsync: simulate } = useSwapSimulation();

  const [amountOrne, setAmountOrne] = useState<string>('');
  const [amountLuna, setAmountLuna] = useState<string>('');

  const [fetchingOrne, setFetchingOrne] = useState(false);

  const handleMaxClick = () => {
    if (lunaBalance) {
      const maxLuna = readAmount(lunaBalance.balance);
      setAmountLuna(maxLuna);
      computeLunaReturns(maxLuna);
      computeOrneReturns(maxLuna);
    }
  };

  const computeOrneReturns = useDebouncedCallback(async (amount: string) => {
    setFetchingOrne(true);
    const estimatedReturn = await simulate({ amount, token: Token.Orne }).then(
      ({ return_amount, spread_amount, commission_amount }) =>
        new Dec(return_amount).plus(spread_amount).plus(commission_amount)
    );

    if (amountLuna) {
      setAmountOrne(readAmount(estimatedReturn));
    }

    setFetchingOrne(false);
  }, 700);

  const [fetchingLuna, setFetchingLuna] = useState(false);

  const computeLunaReturns = useDebouncedCallback(async (amount: string) => {
    setFetchingLuna(true);

    const estimatedReturn = await simulate({ amount, token: Token.Luna }).then(
      ({ return_amount, spread_amount, commission_amount }) =>
        new Dec(return_amount).plus(spread_amount).plus(commission_amount)
    );

    if (amountOrne) {
      setAmountLuna(readAmount(estimatedReturn));
    }
    setFetchingLuna(false);
  }, 700);

  const handlePercentageClick = (percentage: number) => {
    if (lunaBalance) {
      const percentageLuna = (percentage / 100) * readAmount(lunaBalance.balance);
      setAmountLuna(percentageLuna.toString());
      computeLunaReturns(percentageLuna.toString());
      computeOrneReturns(percentageLuna.toString());
    }
  };
  async function handleLunaAmountChange(amount: string) {
    setAmountLuna(amount);

    if (!amount) {
      setAmountOrne('');
      return;
    }

    computeOrneReturns(amount);
  }

  async function handleOrneAmountChange(amount: string) {
    setAmountOrne(amount);

    if (!amount) {
      setAmountLuna('');
      return;
    }

    computeLunaReturns(amount);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!amountOrne || !amountLuna) return;

    provide(
      {
        amountLuna: new Dec(string.transformToValidInput(amountLuna)),
        amountOrne: new Dec(string.transformToValidInput(amountOrne)),
      },
      {
        onSuccess() {
          setAmountOrne('');
          setAmountLuna('');
        },
      }
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex items-center gap-2">
          <h2 className="text-3xl font-semibold">
            A <span className="text-green">D</span> O
          </h2>
          <button
            type="button"
            className="border-sky-500 bg-slate-90025 hover:bg-slate-900 flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-sky-500"
            onClick={handleMaxClick}
          >
            Max
          </button>
          <button
            type="button"
            className="border-sky-500 bg-slate-90025 hover:bg-slate-900 flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-sky-500"
            onClick={() => handlePercentageClick(25)}
          >
            25%
          </button>
          <button
            type="button"
            className="border-sky-500 bg-slate-90025 hover:bg-slate-900 flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-sky-500"
            onClick={() => handlePercentageClick(50)}
          >
            50%
          </button>
        </div>
        <div className="mb-10 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
              <div className="flex w-full justify-between">
                <span className="text-darkBlue50 mb-3">Balance</span>
                <span className="text-darkBlue50 mb-3">
                  {isLoadingOrneBalance ? (
                    <ThreeDots color="hsl(203,23%,42%)" height="10" />
                  ) : (
                    readAmount(orneBalance?.balance)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                {fetchingOrne ? (
                  <div className="flex items-center">
                    <ThreeDots color="hsl(203,23%,42%)" height="10" />
                  </div>
                ) : (
                  <AmountInput
                    className="bg-offWhite text-2xl font-semibold"
                    placeholder="0"
                    value={amountOrne}
                    onChange={handleOrneAmountChange}
                  />
                )}
                <div className="flex items-center gap-2">
                  <IconToken name={Token.Orne} size={36} />
                  <span className="text-mediumGrey">ORNE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:h-32">
            <div className="block h-[60px] w-[60px] rounded-full shadow-lg">
              <img src={plusCurrency} alt="Swap currency" />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
              <div className="flex w-full justify-between">
                <span className="text-darkBlue50 mb-3">Balance</span>
                <span className="text-darkBlue50 mb-3">
                  {isLoadingLunaBalance ? (
                    <ThreeDots color="hsl(203,23%,42%)" height="10" />
                  ) : (
                    readAmount(lunaBalance?.balance)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                {fetchingLuna ? (
                  <div className="flex items-center">
                    <ThreeDots color="hsl(203,23%,42%)" height="10" />
                  </div>
                ) : (
                  <AmountInput
                    className="bg-offWhite text-2xl font-semibold"
                    placeholder="0"
                    value={amountLuna}
                    onChange={handleLunaAmountChange}
                  />
                )}
                <div className="flex items-center gap-2">
                  <IconToken name={Token.Luna} size={36} />
                  <span className="text-mediumGrey">LUNA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className="mb-14" type="submit">
          Stake tokens
        </Button>
      </form>
    </>
  );
			}

import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { useState } from 'react';
import PoolInfo from '~/components/earn/PoolInfo'; // Import your first version of PoolInfo
import PoolInfoV2 from '~/components/earn/PoolInfoV2'; // Import your second version of PoolInfo
import Button from '~/components/ui/Button'; // Import your Button component
import ProvideForm from '~/components/earn/ProvideForm'; // Import your first version of ProvideForm
import ProvideFormV2 from '~/components/earn/ProvideFormV2'; // Import your second version of ProvideForm
import WithdrawForm from '~/components/earn/WithdrawForm'; // Import your first version of WithdrawForm
import WithdrawFormV2 from '~/components/earn/WithdrawFormV2'; // Import your second version of WithdrawForm

export function Earn() {
  const { status } = useWallet();
  const [openForm, setOpenForm] = useState<'provide' | 'withdraw'>('provide');

  return (
    <div className="mt-5 lg:-mt-6">
      <div className="mb-10 text-center lg:mb-20 lg:text-left">
        <h1 className="mb-5 text-5xl font-bold">
          <span className="earn-underline">Earn</span> tokens
        </h1>
        <h2 className="text-2xl">
          Stake your tokens to earn <span className="text-green">$ORNE</span>
        </h2>
      </div>
      {status === WalletStatus.WALLET_CONNECTED && (
        <>
          {(openForm === 'provide' || openForm === 'withdraw') && (
            <>
              <PoolInfo /> {/* Render first version of PoolInfo */}
              <PoolInfoV2 /> {/* Render second version of PoolInfo */}
            </>
          )}

          <div className="mb-20 flex w-full justify-end gap-3 p-5">
            <>
			      <div className="mb-20 flex w-full justify-end gap-3 p-5">
            <Button
              className="w-full lg:w-1/5"
              variant={openForm === 'provide' ? 'fill' : 'outline'}
              onClick={() => setOpenForm('provide')}
            >
              Provide
            </Button>

            <Button
              className="w-full lg:w-1/5"
              variant={openForm === 'withdraw' ? 'fill' : 'outline'}
              onClick={() => setOpenForm('withdraw')}
            >
              Withdraw
            </Button>
          </div>

          {openForm === 'provide' && (
            <>
              <ProvideForm /> {/* Render first version of ProvideForm */}
              <ProvideFormV2 /> {/* Render second version of ProvideForm */}
            </>
          )}
          {openForm === 'withdraw' && (
            <>
              <WithdrawForm /> {/* Render first version of WithdrawForm */}
              <WithdrawFormV2 /> {/* Render second version of WithdrawForm */}
            </>
          )}
        </>
      )}
    </div>
  );
}

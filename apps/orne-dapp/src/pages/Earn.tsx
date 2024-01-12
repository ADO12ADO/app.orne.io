import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { useState } from 'react';
import PoolInfo from './PoolInfo'; // Import your first version of PoolInfo
import PoolInfoV2 from './PoolInfoV2'; // Import your second version of PoolInfo
import Button from './Button'; // Import your Button component
import ProvideForm from './ProvideForm'; // Import your first version of ProvideForm
import ProvideFormV2 from './ProvideFormV2'; // Import your second version of ProvideForm
import WithdrawForm from './WithdrawForm'; // Import your first version of WithdrawForm
import WithdrawFormV2 from './WithdrawFormV2'; // Import your second version of WithdrawForm

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
          <PoolInfo /> {/* Replace with the appropriate version based on your condition */}
          {/* or */}
          <PoolInfoV2 /> {/* Replace with the appropriate version based on your condition */}

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
              <ProvideForm /> {/* Replace with the appropriate version based on your condition */}
              {/* or */}
              <ProvideFormV2 /> {/* Replace with the appropriate version based on your condition */}
            </>
          )}
          {openForm === 'withdraw' && (
            <>
              <WithdrawForm /> {/* Replace with the appropriate version based on your condition */}
              {/* or */}
              <WithdrawFormV2 /> {/* Replace with the appropriate version based on your condition */}
            </>
          )}
        </>
      )}
    </div>
  );
}

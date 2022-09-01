import { toast } from 'react-hot-toast';
import { createContext, useEffect, useState } from 'react';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { Text } from '~/components/ui';
import { sleep } from '~/utils/sleep';
import type { ReactNode } from 'react';
import type { TxResult } from '@terra-money/wallet-provider';

type PendingTransaction = {
	tx: TxResult;
	customToastMessage?: string;
	callback?: () => void;
};

export type TxResolverData = {
	pendingTransactions: PendingTransaction[];
	pushTransaction: (msg: PendingTransaction) => void;
};

export const TxResolverContext = createContext<TxResolverData | null>(null);

export function TxResolverProvider({ children }: { children: ReactNode }) {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();
	const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([]);

	useEffect(() => {
		for (const { tx, customToastMessage, callback } of pendingTransactions) {
			fetchTransactionStatus(connectedWallet?.network.lcd || lcd.config.URL, tx.result.txhash).then(() => {
				setPendingTransactions((txs) => txs.filter((pendingTx) => pendingTx.tx.result.txhash !== tx.result.txhash));

				if (callback) {
					callback();
				}

				toast((t) => <Text css={{ fontSize: '16px' }}>{customToastMessage}</Text>);
			});
		}
	}, [pendingTransactions]);

	function pushTransaction(msg: PendingTransaction) {
		setPendingTransactions((txs) => [...txs, msg]);
	}

	return (
		<TxResolverContext.Provider value={{ pendingTransactions, pushTransaction }}>{children}</TxResolverContext.Provider>
	);
}

async function fetchTransactionStatus(endpoint: string, txHash: string): Promise<any> {
	const url = `${endpoint}/txs/${txHash}`;
	const response = await fetch(url);

	if (!response.ok) {
		await sleep(2);
		return fetchTransactionStatus(endpoint, txHash);
	}

	return response;
}

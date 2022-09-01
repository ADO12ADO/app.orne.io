import { useContext } from 'react';
import { TxResolverContext } from '~/context/TxResolverProvider';

export function usePendingTransaction() {
	const context = useContext(TxResolverContext);

	if (!context) {
		throw new Error('usePendingTransaction must be used within a TxResolverProvider');
	}

	return context;
}

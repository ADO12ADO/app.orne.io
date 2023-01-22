export const queryKeys = {
	balanceRoot: ['balances'] as const,
	balanceOrne: (walletAddress: string) => [...queryKeys.balanceRoot, 'orne', walletAddress] as const,
	balanceLuna: (walletAddress: string) => [...queryKeys.balanceRoot, 'luna', walletAddress] as const,
	balanceLP: (walletAddress: string) => [...queryKeys.balanceRoot, 'lp', walletAddress] as const,
	poolRoot: ['pools'] as const,
	poolInfo: (address: string) => [...queryKeys.poolRoot, 'info', address] as const,
};

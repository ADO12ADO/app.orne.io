export function getAirdropEntry(walletAddress?: string) {
	return airdropInfo.find((airdrop) => airdrop.address === walletAddress);
}

const airdropInfo = [
	{
		address: 'terra100n7d8fd8t38zd6tttc2g838qn0pqef8gqszv9',
		amount: '1000000',
	},
	{
		address: 'terra1zcfxn89amedhu3vw6w72rfrv28czv98tu6whlj',
		amount: '2000000',
	},
	{
		address: 'terra17q2fvryz9auxkvaec98f3xq9zfsgzayhvgkdv5',
		amount: '3000000',
	},
];

export default airdropInfo;

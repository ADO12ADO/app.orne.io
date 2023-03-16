import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useOrnePresaleToken } from '~/hooks/useOrnePresaleToken';

export function PresaleNFTList() {
	const { data: tokens, isLoading } = useOrnePresaleToken();

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<ThreeDots color="hsl(203,23%,42%)" height="30" />
			</div>
		);
	}

	return (
		<div className="grid grid-cols-6 gap-8">
			{tokens?.map((token) => (
				<div key={token.edition} className="bg-offWhite rounded-lg p-7 shadow-sm">
					<div className="mb-6 flex items-center justify-center">
						<img className="h-32" src={token.media} alt="" />
					</div>

					<div className="flex items-center justify-between">
						<dt className="text-mediumGrey">Title</dt>
						<dd className=" inline-flex items-center font-semibold">{token.title}</dd>
					</div>

					<div className="flex items-center justify-between">
						<dt className="text-mediumGrey">Edition</dt>
						<dd className="inline-flex items-center font-semibold">{token.edition}</dd>
					</div>

					<div className="flex items-center justify-between">
						<dt className="text-mediumGrey">Rarity</dt>
						<dd className=" inline-flex items-center font-semibold">{token.rarity}</dd>
					</div>
				</div>
			))}
		</div>
	);
}

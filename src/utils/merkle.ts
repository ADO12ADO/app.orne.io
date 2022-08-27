import { keccak256 } from 'js-sha3';
import { MerkleTree as MerkleTreePrimitive } from 'merkletreejs';
// import { keccak256 } from '~/utils/keccak256';

export class MerkleTree {
	public tree: MerkleTreePrimitive;

	constructor(accounts: Array<{ address: string; amount: string }>) {
		let leaves = accounts.map((account) => keccak256(account.address + account.amount));
		leaves.sort();
		this.tree = new MerkleTreePrimitive(leaves, keccak256, { sort: true });
	}

	public getProof(account: { address: string; amount: string }) {
		const leaf = keccak256(account.address + account.amount);
		console.log(this.tree.getHexRoot());
		return this.tree.getHexProof(leaf).map((proof) => proof.replace('0x', ''));
	}
}

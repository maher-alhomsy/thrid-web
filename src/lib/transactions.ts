import { v4 as uuidv4 } from 'uuid';
import { parseEther } from 'ethers';
import { prepareContractCall } from 'thirdweb';

import type { Chain } from '@/types';
import { getContract } from './thrid-web';

const paymentToken = '0x0000000000000000000000000000000000000000';

export function createFile({ chain }: { chain: Chain }) {
  const fileId = '0x' + uuidv4().replace(/-/g, '');

  console.log(fileId);

  const contract = getContract({ chain });

  const transaction = prepareContractCall({
    contract,
    params: [BigInt(fileId), parseEther('0.015'), paymentToken],
    method:
      'function createFile(uint256 fileId, uint256 price, address paymentToken)',
  });

  return transaction;
}

import { createThirdwebClient, getContract as GetContract } from 'thirdweb';

import type { Chain } from '@/types';

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID,
});

interface Props {
  chain: Chain;
}

export function getContract({ chain }: Props) {
  const contract = GetContract({
    chain,
    client,
    address: '0xB9f34d00f99C274321b387C3bbDA2Fc4fa55d924',
  });

  return contract;
}

import type { ChainOptions } from 'node_modules/thirdweb/dist/types/chains/types';

export type Chain = Readonly<ChainOptions & { rpc: string }>;

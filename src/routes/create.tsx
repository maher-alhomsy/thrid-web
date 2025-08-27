import { ConnectButton } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';
import { abstractTestnet, defineChain } from 'thirdweb/chains';

import { client } from '@/lib/thrid-web';
import CreateForm from '@/components/create/form';

const UNICHAIN_SEPOLIA = defineChain(1301);

const Create = () => {
  return (
    <div className="min-h-screen bg-screen px-4">
      <CreateForm />

      <div className="mt-4">
        <ConnectButton
          client={client}
          chain={UNICHAIN_SEPOLIA}
          switchButton={{ label: 'Switch' }}
          chains={[UNICHAIN_SEPOLIA, abstractTestnet]}
          autoConnect={true}
          showAllWallets={false}
          wallets={[
            createWallet('io.metamask'),
            createWallet('com.trustwallet.app'),
          ]}
        />
      </div>
    </div>
  );
};

export default Create;

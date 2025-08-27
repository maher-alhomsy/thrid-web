import {
  useConnect,
  useSendTransaction,
  useActiveWalletChain,
} from 'thirdweb/react';
import { toast } from 'sonner';
import { createWallet } from 'thirdweb/wallets';
import type { UseFormReturn } from 'react-hook-form';

import { client } from '@/lib/thrid-web';
import { createFile } from '@/lib/transactions';
import type { CreatForm } from '@/lib/validators';
import PrimaryButton from '../common/primary-button';

interface Props {
  form: UseFormReturn<CreatForm>;
}

const CreateButton = ({ form }: Props) => {
  const { connect } = useConnect();
  const chain = useActiveWalletChain();
  const { mutate } = useSendTransaction();

  const { isValid, isSubmitting } = form.formState;

  function handleConnectWallet() {
    connect(async () => {
      const metamask = createWallet('io.metamask');
      await metamask.connect({ client });

      return metamask;
    });
  }

  async function handleSubmit() {
    if (!chain) {
      handleConnectWallet();
      return;
    }

    const transaction = createFile({ chain });
    toast.loading('Waiting transaction to confirm...');
    console.log('transaction | ', transaction);

    mutate(transaction, {
      onSuccess: ({ transactionHash, chain }) => {
        console.log('Success');
        toast.dismiss();
        toast.success('Transaction confirmed');

        console.log(chain.id);
        console.log(transactionHash);
      },
    });
  }

  return (
    <>
      <PrimaryButton
        type="submit"
        disabled={!isValid || isSubmitting}
        onClick={form.handleSubmit(handleSubmit)}
        label={isSubmitting ? 'Loading...' : 'Generate'}
      />
    </>
  );
};

export default CreateButton;

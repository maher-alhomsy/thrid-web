import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface Props extends React.ComponentProps<'button'> {
  label: string;
}

const PrimaryButton = ({ label, className, ...props }: Props) => {
  return (
    <Button
      className={cn(
        'p-3 w-full bg-primary rounded-full text-white flex justify-center mt-5 py-6 text-xl',
        className
      )}
      {...props}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;

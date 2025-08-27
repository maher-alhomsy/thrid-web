import type { Control } from 'react-hook-form';

// import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import type { CreatForm } from '@/lib/validators';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';

interface Props {
  control: Control<CreatForm>;
}

const PriceInput = ({ control }: Props) => {
  return (
    <FormField
      name="price"
      control={control}
      render={({ field }) => (
        <FormItem className="mt-12">
          <FormLabel className="text-[#FCFBFF] text-base">
            Set a price
          </FormLabel>

          <FormControl>
            <div className="relative bg-primary rounded-full">
              <Input
                {...field}
                type="text"
                pattern="[0-9.]*"
                inputMode="decimal"
                placeholder="0.0 ETH"
                className="border-0 w-full h-[61px] py-4 px-6 text-white text-2xl font-bold placeholder:font-bold placeholder:text-white/40 placeholder:text-2xl focus-visible:ring-transparent "
                onChange={(e) => {
                  const inputValue = e.target.value;
                  let value = e.target.value.replace(',', '.');
                  value = inputValue.replace(/[^0-9.]/g, '');
                  field.onChange(value);
                }}
              />

              {/* {field.value.length > 0 && (
                <span
                  style={
                    {
                      // left: calculateLeftPosition(field.value.length),
                    }
                  }
                  className="absolute top-1/2 -translate-y-1/2 font-bold text-2xl text-white"
                >
                  ETH
                </span>
              )} */}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default PriceInput;

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import DragDrop from './drag-drop';
import { Input } from '../ui/input';
import PriceInput from './price-input';
import { Textarea } from '../ui/textarea';
import CreateButton from './create-button';
import { createSchema, type CreatForm } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const CreateForm = () => {
  const form = useForm<CreatForm>({
    resolver: zodResolver(createSchema),
    defaultValues: { title: '', price: '', description: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="h-[191px] flex border-b border-primary">
          {form.watch('file') && (
            <section className="flex flex-col flex-1 gap-y-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Add Title"
                        className="p-0 rounded-none !bg-transparent text-white border-0 placeholder:text-base placeholder:text-white focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0 h-full">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add a description"
                        className="h-full p-0 rounded-none border-0 text-sm text-[#AAB1CE] placeholder:text-[#AAB1CE] placeholder:text-sm focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>
          )}

          <FormField
            name="file"
            control={form.control}
            render={({ field: { value, onChange } }) => (
              <FormItem className="h-full flex-1 space-y-0">
                <FormControl>
                  <div
                    className={cn(
                      'flex items-center gap-x-8 pb-6',
                      value ? 'pt-0' : 'pt-8'
                    )}
                  >
                    <DragDrop file={value} onChange={onChange} />

                    {!value && (
                      <div>
                        <p className="text-2xl font-bold mt-3 text-white">
                          Add media
                        </p>
                        <p className="text-xl mb-8 3 text-white">of any kind</p>
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <PriceInput control={form.control} />

        <CreateButton form={form} />
      </form>
    </Form>
  );
};

export default CreateForm;

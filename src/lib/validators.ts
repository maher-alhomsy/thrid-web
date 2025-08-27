import { z } from 'zod';

export const createSchema = z.object({
  title: z.string(),
  price: z
    .string()
    .nonempty()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: 'Price must be a positive number.',
      }
    ),
  description: z.string().nonempty(),

  file: z.custom<File>((val) => val instanceof File, {
    message: 'A valid file is required',
  }),
});

export type CreatForm = z.infer<typeof createSchema>;

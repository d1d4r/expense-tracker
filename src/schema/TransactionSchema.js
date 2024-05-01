import { z } from "zod";

const typeTransaction = ['EXPENSE','INCOME']
export const transactionSchema = z.object({
  type: z.enum(typeTransaction),
  amount: z.coerce.number(),
  description: z.string().optional(),
  categoryId: z.number(),
  userId: z.number(),
});

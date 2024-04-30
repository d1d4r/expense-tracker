import { z } from "zod";

export const transactionSchema = z.object({

  type: z.string(),
  amount: z.number(),
  description: z.string().max(200, {
    message: "description lenght must be less than 200",
  }),
  categoryId: z.number(),
  userId: z.number(),
});

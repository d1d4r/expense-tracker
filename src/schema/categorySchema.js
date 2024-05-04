import { z } from "zod";

const typeCategorySchema = ["EXPENSE", "INCOME"];
export const categorySchema = z.object({
  type: z.enum(typeCategorySchema),
  name: z.string().trim(),
});

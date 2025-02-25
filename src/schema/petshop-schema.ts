import { z } from "zod";

export const PetshopSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const PetshopsSchema = z.array(PetshopSchema);

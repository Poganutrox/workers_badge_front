import { z } from "zod";
import { PetshopSchema } from "./petshop-schema";

export const AttendanceSchemaResponse = z.object({
  id: z.object({
    employeeId: z.number(),
    petshopId: z.number(),
    date: z.string(),
  }),
  action: z.object({
    id: z.number(),
    description: z.string(),
  }),
  onTime: z.boolean().nullable(),
  petShop: PetshopSchema,
  employee: z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
  }),
});

export const AttendanceSchemaRequest = z.object({
  employeeId: z.string(),
  petshopId: z.string(),
  actionId: z.string(),
});

export const AttendancesSchema = z.array(AttendanceSchemaResponse);
export const AttendancesSchemaResponse = z.object({
  content: z.array(AttendanceSchemaResponse),
  page: z.object({
    size: z.number(),
    number: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  }),
});

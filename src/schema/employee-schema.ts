import { z } from "zod";
import { AttendancesSchemaResponse } from "./attendance-schema";
import { PetshopsSchema } from "./petshop-schema";

export const SimpleEmployeeSchemaResponse = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
});

export const SimpleEmployeesSchemaResponse = z.array(
  SimpleEmployeeSchemaResponse
);

export const EmployeeSchemaResponse = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  attendances: AttendancesSchemaResponse,
  petshops: PetshopsSchema,
});

export const EmmployeeSchemaRequest = EmployeeSchemaResponse.omit({
  id: true,
  attendances: true,
  petshops: true,
});

export const EmployeesSchemaResponse = z.array(EmployeeSchemaResponse);

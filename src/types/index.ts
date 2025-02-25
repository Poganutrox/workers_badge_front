import { SimpleEmployeeSchemaResponse } from "./../schema/employee-schema";
import { z } from "zod";

import {
  AttendanceSchemaRequest,
  AttendanceSchemaResponse,
  AttendancesSchema,
  AttendancesSchemaResponse,
} from "../schema/attendance-schema";
import {
  EmmployeeSchemaRequest,
  EmployeesSchemaResponse,
  SimpleEmployeesSchemaResponse,
} from "../schema/employee-schema";
import { PetshopSchema } from "../schema/petshop-schema";

export type EmployeeRequest = z.infer<typeof EmmployeeSchemaRequest>;
export type IdEmployeeRequest = z.infer<typeof SimpleEmployeeSchemaResponse>;
export type SimpleEmployeesResponse = z.infer<
  typeof SimpleEmployeesSchemaResponse
>;
export type EmployeesResponse = z.infer<typeof EmployeesSchemaResponse>;

export type Attendances = z.infer<typeof AttendancesSchema>;
export type AttendancesResponse = z.infer<typeof AttendancesSchemaResponse>;
export type AttendanceResponse = z.infer<typeof AttendanceSchemaResponse>;
export type AttendanceRequest = z.infer<typeof AttendanceSchemaRequest>;

export type Petshop = z.infer<typeof PetshopSchema>;

export type ErrorType = {
  status: number;
  message: string;
  date: string;
};

export type UserLoginForm = {
  username: string;
  password: string;
};

export type JwtPayload = {
  sub?: string;
  exp?: number;
};

export type Filters = {
  employeeId: number;
  petshopId: number;
  actionId: number;
  date: string;
};

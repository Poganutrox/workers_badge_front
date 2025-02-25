import api from "../api";
import {
  AttendanceSchemaResponse,
  AttendancesSchema,
  AttendancesSchemaResponse,
} from "../schema/attendance-schema";
import { AttendanceResponse, AttendancesResponse, Filters } from "../types";

export const doCheckInOut = async (
  employeeId: number,
  petShopId: number,
  actionId: number
): Promise<AttendanceResponse> => {
  const endpoint = `/attendance?employeeId=${employeeId}&petshopId=${petShopId}&actionId=${actionId}`;

  try {
    const { data } = await api.get(endpoint);
    const result = AttendanceSchemaResponse.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      throw new Error("Error al validar los datos del esquema");
    }
  } catch (error: any) {
    console.log(error);
    if (error?.response?.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw new Error(error.message || "Ocurrió un error inesperado");
  }
};

export const getRegisteredEmployees = async () => {
  const endpoint = "/attendance/registered";
  const { data } = await api(endpoint);
  const result = AttendancesSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }

  console.log(data);
};

export const filterBy = async (
  filters: Filters,
  page: number
): Promise<AttendancesResponse> => {
  const query = Object.entries(filters)
    .filter(([_, value]) => value !== "" && value !== 0)
    .map(([key, value], index) => {
      if (index === 0) {
        return `&${key}=${value}`;
      } else {
        return `${key}=${value}`;
      }
    })
    .join("&");
  const endpoint = `/attendance/filterBy?size=10&page=${page}${query}&sort=id.date,desc`;
  console.log(endpoint);

  try {
    const { data } = await api(endpoint);
    const result = AttendancesSchemaResponse.safeParse(data);
    if (result.success) {
      console.log(result.data);
      return result.data;
    } else {
      throw new Error("Error al validar los datos del esquema");
    }
  } catch (error: any) {
    if (error?.response?.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw new Error(error.message || "Ocurrió un error inesperado");
  }
};
